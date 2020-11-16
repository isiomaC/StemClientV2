import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';

import { useStripe } from "@stripe/react-stripe-js";
import axios from 'axios'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { clearCart } from '../../../redux/actions/shoppingcart'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import QuantityStepper from './QuantityStepper'

import getOrderTotal from '../../../utils/getOrderTotal'
import approximatePrice from '../../../utils/approximatePrice'

//Contents
import SimilarProduct from './SimilarProduct'
import ProductDisplay from './ProductDisplay'

const useStyles = makeStyles(theme => ({
    item: {
        display: 'flex',
        // height: "100px"
    }, 
    divider: {
        marginLeft: '20px',
        [theme.breakpoints.down("sm")]:{
            marginBottom: '10px',
        }
    },
    checkoutBtn: {
        background: 'rgba(9, 0, 59, 0.9)',
        color: 'white',
        '&:hover': {
            background: "rgba(9, 0, 59, 0.9)",
            color: 'red'
         },
    },
    continueShopping: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: 'rgba(9, 0, 59, 0.9)'
        }
    }
}))

const ValidateEmail = (mail) => {
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

const PreBuiltCheckOut = ({user, isAuthenticated, clearCart, shoppingcart}) => {

    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [guest, setGuest] = useState({email: ""});
    const [error, setError] = useState(false)
    const stripe = useStripe();

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isBig = useMediaQuery(theme => theme.breakpoints.up('md'));

    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {

        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        console.log('[QUERY_LOCATION]', window.location.query)

        if (query.get("success")) {
            ( async () =>
                await clearCart()
            )()
            setMessage("Order placed! You will receive an email confirmation.");
        }
        if (query.get("canceled")) {
            setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }

        const getRelatedProducts = async () => {
            try{
                //sample query values = ["Hair", "Accessories","Body"]
                let uniq = a => [...new Set(a)];
                const categoryNames = shoppingcart.map(item => item.category)
                const excludeIds = shoppingcart.map(item => item.product_idx)
                console.log("[EXCLUDE IDS]", excludeIds)
                let query = uniq(categoryNames)
                const res = await axios.get(`/api/products?filter={"category_names": ${JSON.stringify(query)}, "excludeIds": ${JSON.stringify(excludeIds)}}`)
            
                if (res.data){
                    setSimilarProducts(similarProducts => [...res.data])
                }
            }catch(e){
                console.log(e.message)
            }
        }

        (async () =>
            await getRelatedProducts()
        )()

    }, []);

    const Message = ({ message }) => (
        <section>
          <p>{message}</p>
        </section>
    );

    const handleChange = (e) => {
        setError(false)
        setGuest({ ...guest, 
            [e.target.name]: e.target.value 
        })
    }

    const handleClick = async (event) => {
        event.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            let userEmail
            const lineitems = shoppingcart.map(cart => ({ 
                    product: cart.product_idx.toString(), 
                    quantity: cart.quantity.toString()
                })
            )

            if (isAuthenticated && user) {
                userEmail = user.email
            }else{
                if (guest.email === ''){
                    setError(true)
                    return
                }else{
                    if (ValidateEmail(guest.email) === false){
                        setError(true)
                        return
                    }else{
                        userEmail = guest.email
                    }
                }
            }

            const formData = { 
                email: userEmail,
                items: lineitems
            }
    
            let response
            if (isAuthenticated){
                response = await axios.post("/api/create-session", formData, config) 
            }else{
                response = await axios.post("/api/create-session/guest", formData, config)
            }
    
            const session = response.data;
            //When the customer clicks on the button, redirect them to Checkout.
            const result = await stripe.redirectToCheckout({
              sessionId: session.id,
            });
        
            if (result.error) {
                //redirect failed - do something
                console.log(result.error.message)
            }
        }catch(e){
            console.log(e)
        }
    };
    
    return message ? (
        <Message message={message} />
    ) : (
        <>
            { isBig && ( 
                <Grid container >
                    <Grid item xs={8}>

                        {shoppingcart!== [] ? shoppingcart.map((item, index) => 
                            <>
                                <ProductDisplay key={index} cart={item} />
                            </>
                        ) : (<p> Shopping Cart Empty</p>)}
                        <br/>
                        <br/>
                        <br/>
                        <Box style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Link className={classes.continueShopping} to={'/shop'}>
                                <div style={{ display: 'flex', cursor: 'pointer' }}>
                                        <ArrowBackIcon/>
                                        <Typography>Continue Shopping</Typography>
                                </div>
                            </Link>
                            <Typography style={{ marginRight: '10px'}}>Total: {approximatePrice(getOrderTotal(shoppingcart))}</Typography>
                        </Box>
                        <Divider style={{ background: 'black'}}/>
                    </Grid>
                    <Grid style={{ background: 'rgba(255,255,255,0.7)'}} item xs={4}>
                    <Typography variant="body1"> Things you might like...</Typography>
                        {similarProducts.map(item => (

                            <SimilarProduct name={item.name} description={item.description} size={item.size} price={item.price} image={item.base64}/>
                        ) )}
                    </Grid>
                </Grid>
            )}

            { isSmall && (
        
                    <Grid container style={{marginTop: '20px'}}>
                        <Grid item xs={12}>
                            {shoppingcart.map((item, index) => 
                                <ProductDisplay key={index} cart={item} />
                            )}
                            <br/>
                            <br/>
                            <br/>
                            <Divider/>
                        </Grid>
                    </Grid>
                
            )}
           
           <Box style={{ margin: '20px', display: 'flex', justifyContent:'center', alignItems: 'flex-end'}} >
            {!user && isAuthenticated === false &&
                    <TextField
                        error={error && true}
                        id="outlined-textarea"
                        label="email"
                        placeholder="email"
                        type="email"
                        name ="email"
                        style={{ width: '250px'}}
                        value={guest.email}
                        onChange={e => handleChange(e)}
                        helperText={error && "Please Input a Valid Email"}
                />}
                <Button className={classes.checkoutBtn} onClick={handleClick}>
                    Checkout
                </Button>
            </Box>
        </>
    );
}

PreBuiltCheckOut.propTypes = {
    user: PropTypes.object,
    shoppingcart: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    clearCart: PropTypes.func
}

const mapStateToProps = state => ({
    user : state.auth.user,
    shoppingcart : state.shoppingcart,
    isAuthenticated : state.auth.isAuthenticated
})


export default connect(mapStateToProps, {clearCart})(PreBuiltCheckOut);

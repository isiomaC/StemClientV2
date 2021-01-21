import React, {useEffect, useState} from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'
import approximatePrice from '../../../utils/approximatePrice'

//Icons
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

import PropTypes from 'prop-types'
import TableDisplay from '../content/TableDisplay'


const useStyles = makeStyles(theme => ({
    gridItem: {

    },
    typo:{
        textAlign: 'left',
        marginLeft: '10px'
    },  
    checkoutBtn: {
        background: 'rgba(9, 0, 59, 0.9)',
        color: 'white',
        '&:hover': {
            background: "rgba(9, 0, 59, 0.9)",
            color: 'red'
         },
    },
    paper:{
        margin: '15px',
        background: 'transparent'
    }, 
    layer:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '20px 0px'
    },
    deliveryInfo:{
        border:'1px solid rgba(204, 246, 200, 1)',
    }
}))

const ReviewDetailsStep = ({ handleClick, user, cart, checkOutError }) => {

    const classes = useStyles()
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const [shipping, setShipping] = useState(process.env.REACT_APP_SHIPPING_PRICE)
    const [error, setError] = useState(null)

    useEffect(()=> {
        const fetchShipping = async () => {
            const apiRoute = process.env.REACT_APP_API_URL
            try{
                const res = await axios.get(`${apiRoute}/products?filter={"shipping": "yes"}`)
                setShipping(res.data.price)
                setError(null)
            }catch(e){
                setError(e.message)
            }
        }

        fetchShipping()

    }, [])

    return (
        <Container>
            <Grid container>
                <Grid className={classes.gridItem} item xs={isSmall ? 12 : 6}>
                    <Paper className={classes.paper}>
                        <Container className={classes.layer}>
                            <EmailIcon/>
                            <Typography className={classes.typo}>{user.email ? user.email : cart.shippingAddress.email}</Typography>
                        </Container>
                        <Container className={classes.layer}>
                            <PersonIcon/>
                            <Typography className={classes.typo}> {cart.shippingAddress.firstname}</Typography>
                        </Container>
                        <Container className={classes.layer}> 
                            <PersonIcon/>
                            <Typography className={classes.typo}> {cart.shippingAddress.lastname}</Typography>
                        </Container>
                        <Container className={classes.layer}>
                            <PhoneIcon/>
                            <Typography className={classes.typo}> {cart.shippingAddress.phonenumber}</Typography>
                        </Container>
                    </Paper>
                </Grid>
                <Grid className={classes.gridItem} item xs={isSmall ? 12 : 6}>
                    {shipping &&  
                        <Container className={classes.deliveryInfo}>
                            <Typography style={{ fontWeight: 'bold', marginBottom: '8px'}}>Delivery</Typography>

                            {error ?  
                                <Typography>€5.99 for Orders Under €65.</Typography> 
                                :
                                <Typography>€{approximatePrice(shipping)} for Orders Under €65.</Typography>
                            }

                            <Typography>Free shipping on all orders over €65 in Ireland.</Typography>

                            <Typography>Deliveries within Ireland can take between 2 to 5 working days.</Typography>

                            <Typography>Deliveries outside of Ireland can take 7 to 12 working days.</Typography>
                        </Container>
                    }
                   {( cart && cart.items)  && <TableDisplay rows={cart.items}/> }
                   
                   
                {/* //    cart.items.map((item, index) => (
                //        //shows products currently in cart
                //     <SimilarProduct 
                //         key={index}
                //         id={item.product_idx} 
                //         name={item.name} 
                //         description={item.benefits}
                //         size={item.size} 
                //         price={item.price} 
                //         image={item.image} />)
                //     )} */}
                </Grid>
            </Grid>
            <Box style={{ margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            {checkOutError && <Typography style={{ fontStyle: 'italic', color: 'red'}}> Something went wrong with the checkout session!!!! </Typography>}
            <Button 
                className={classes.checkoutBtn} 
                onClick={e => { 
                    handleClick(e)
                }
                }>
                CheckOut
            </Button>
        </Box>
        </Container>
    )
}

ReviewDetailsStep.propTypes = {
    user: PropTypes.object,
    cart: PropTypes.object
}

export default ReviewDetailsStep;
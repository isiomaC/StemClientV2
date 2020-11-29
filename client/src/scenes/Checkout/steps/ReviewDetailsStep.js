import React, {useEffect, useState} from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { useMediaQuery } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import ShoppingCart from '../../../Components/ShoppingCart'
import SimilarProduct from '../content/SimilarProduct'
import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles(theme => ({
    gridItem: {

    },
    typo:{
        textAlign: 'left'
    },  
    checkoutBtn: {
        background: 'rgba(9, 0, 59, 0.9)',
        color: 'white',
        '&:hover': {
            background: "rgba(9, 0, 59, 0.9)",
            color: 'red'
         },
    },
}))

const ReviewDetailsStep = ({ handleClick }) => {

    const classes = useStyles()
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {})

    useEffect(()=> {
        console.log(cart.shippingAddress)
    }, [])

    return (
        <Container>
            <Grid container>
                <Grid className={classes.gridItem} item xs={isSmall ? 12 : 6}>
                    <Typography className={classes.typo}>Email: {cart.shippingAddress.email}</Typography>

                    <Typography className={classes.typo}>Fullname: {cart.shippingAddress.fullname}</Typography>
                    <Typography className={classes.typo}>Address: {cart.shippingAddress.address}</Typography>
                    <Typography className={classes.typo}>City: {cart.shippingAddress.city}</Typography>
                    <Typography className={classes.typo}>Country: {cart.shippingAddress.country}</Typography>
                    <Typography className={classes.typo}>eirCode: {cart.shippingAddress.eirCode}</Typography>
                </Grid>
                <Grid className={classes.gridItem} item xs={isSmall ? 12 : 6}>
                   {cart.items && cart.items.map(item => (
                       //shows products currently in cart
                    <SimilarProduct 
                        id={item.product_idx} 
                        name={item.name} 
                        description={item.benefits}
                        size={item.size} 
                        price={item.price} 
                        image={item.image} />)
                    )}
                </Grid>
            </Grid>
            <Box style={{ margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            {/* { (!user || (user && !user.email)) &&
                <TextField
                    error={error && true}
                    id="outlined-textarea"
                    label="email"
                    placeholder="email"
                    type="email"
                    name="email"
                    style={{ width: '250px' }}
                    value={guest.email}
                    onChange={e => handleChange(e)}
                    helperText={error && "Please Input a Valid Email"} />} */}
            <Button className={classes.checkoutBtn} onClick={e => { 
                    console.log("Click answered ") 
                    handleClick(e)
                }}>
                CheckOut
            </Button>
        </Box>
        </Container>
    )
}


export default ReviewDetailsStep;
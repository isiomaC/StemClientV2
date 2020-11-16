import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'

//Orbit components
import Stepper from "@kiwicom/orbit-components/lib/Stepper";
import { removeFromCart } from '../redux/actions/shoppingcart'

import approximatePrice from '../utils/approximatePrice'

import pro3 from '../img/Pro3.jpg'
import QuantityStepper from '../scenes/Checkout/content/QuantityStepper'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'inherit',
        height: '120px',
        marginBottom: '10px',
    },
    stepper: {
        width: '10%'
    }

}))

const ShoppingCart = ({ cart, removeFromCart }) => {

    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item style={{ }} xs={4}>
                    <img src={cart.image} width="130px" height="120px"/>
                </Grid>
                <Grid item style={{ display: 'block'}} xs={8}>
                    <Box style={{ margin: '10px'}}>
                        <Typography style={{ fontSize: 'medium', fontWeight: 'Bold'}} > {cart.name}</Typography>
                        <Typography style={{ fontSize: 'small'}} > {cart.benefits.split(/\<.*?\>/g)} </Typography>
                    </Box>
                    <Box style={{ display: 'flex', justifyContent:'space-between', margin: '10px'}}>
                        <div style={{ width: '45%', fontSize: 'small'}}>
                            <QuantityStepper 
                                amount={cart.quantity} 
                                product_id={cart.product_idx} 
                                max={parseInt(cart.maxVal)} />
                        </div>
                        <div onClick={() => {removeFromCart(cart.product_idx)}} 
                            style={{ textDecoration:'underline', fontSize: '0.7em', cursor:'pointer'}}>
                                remove
                        </div>
                        <Typography style={{ fontSize: 'small'}}>${approximatePrice(cart.price)}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

ShoppingCart.propTypes = {
    cart: PropTypes.object,
    removeFromCart: PropTypes.func
}

// const mapStateToProps = state => ({
//     shoppingcart : state.shoppingcart
// })

export default connect(null, { removeFromCart })(ShoppingCart);
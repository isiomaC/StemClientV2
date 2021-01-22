import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {connect} from 'react-redux'

import DeleteIcon from '@material-ui/icons/Delete';

//Orbit components
import { removeFromCart } from '../redux/actions/shoppingcart'

import approximatePrice from '../utils/approximatePrice'

import QuantityStepper from '../scenes/Checkout/content/QuantityStepper'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'inherit',
        height: '80px',
        marginBottom: '10px',
        // [theme.breakpoints.up('md')]: {
        //     // maxWidth: 'calc(100% - 50%)'
        // }
    },
    stepper: {
        width: '10%'
    },
    imageStyle: {
        width: 'calc(18vh - 1rem)',
        height: '80px',
        [theme.breakpoints.down("sm")] : {
            width : 'calc(100%)'
        }
    },
    description: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        textAlign: 'left',
        '-webkit-line-clamp': 2,
         /* number of lines to show */
        '-webkit-box-orient': 'vertical',
    }
    
}))

const ShoppingCart = ({ cart, removeFromCart }) => {

    const classes = useStyles()
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item style={{ }} xs={4}>
                    <img src={cart.image} className={classes.imageStyle} alt={`product ${cart.product_idx} display`} />
                </Grid>
                <Grid item style={{ display: 'flex', alignItems: 'center'}} xs={8}>
                    {isXSmall ? (
                        <Box style={{  }}>
                            <Box style={{ display: 'flex', justifyContent: 'space-around'}}>
                                <div style={{ marginLeft: '10px', width: '70%'}}>
                                    <Typography style={{ fontSize:  'small', fontWeight: 'Bold'}} > {cart.name}</Typography>
                                        {/* <Typography style={{ fontSize: 'medium'}} > {cart.name}</Typography> */}
                                    <Typography style={{  fontSize: '10px'}} 
                                                className={classes.description} >
                                            {cart.benefits !== 'undefined' && cart.benefits.split(/<.*?>/g)}
                                    </Typography>
                                </div>
                                <div style={{ width: '30%' }}>
                                    <DeleteIcon 
                                        onClick={() => {removeFromCart(cart.product_idx)}} 
                                        style={{ 
                                            color: 'rgba(255,0,0,0.5)',
                                            cursor:'pointer'}}/>
                                </div>
                            </Box>
                            <Box style={{ display: 'flex', justifyContent:'space-around'}}>
                                <div style={{ fontSize: 'small'}}>
                                    <QuantityStepper 
                                        amount={parseInt(cart.quantity, 10)} 
                                        product_id={cart.product_idx} 
                                        max={parseInt(cart.maxVal)} />
                                </div>
                                <div>
                                    <Typography style={{ fontSize: 'small'}}>€{approximatePrice(cart.price)}</Typography>
                                </div>
                            </Box>
                        </Box>
                    ): (
                        <Container style={{  }}>
                            <Box style={{ display: 'flex', justifyContent: 'space-between',}}>
                                <div style={{ marginLeft: '5px'}}>
                                    <Typography style={{ fontSize:  'medium', fontWeight: 'Bold'}} > {cart.name}</Typography>
                                        {/* <Typography style={{ fontSize: 'medium'}} > {cart.name}</Typography> */}
                                    <Typography style={{ maxWidth: '250px', fontSize: 'small'}} 
                                                className={classes.description} >
                                            {cart.benefits !== 'undefined' && cart.benefits.split(/<.*?>/g)}
                                    </Typography>
                                </div>
                                <DeleteIcon 
                                    onClick={() => {removeFromCart(cart.product_idx)}} 
                                    style={{ 
                                        margin:5, 
                                        color: 'rgba(255,0,0,0.5)',
                                        cursor:'pointer'}}/>
                            </Box>
                            <Box style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{ width: '45%', fontSize: 'small'}}>
                                    <QuantityStepper 
                                        amount={parseInt(cart.quantity, 10)} 
                                        product_id={cart.product_idx} 
                                        max={parseInt(cart.maxVal)} />
                                </div>
                                {/* <div onClick={() => {removeFromCart(cart.product_idx)}} 
                                    style={{ textDecoration:'underline', fontSize: '0.7em', cursor:'pointer'}}>
                                        remove
                                </div> */}
                                <Typography style={{ fontSize: 'small'}}>€{approximatePrice(cart.price)}</Typography>
                            </Box>
                        </Container>
                    )}
                    
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
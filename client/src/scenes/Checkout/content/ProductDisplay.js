import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

//Testing Icons
import DeleteIcon from '@material-ui/icons/Delete';
//
import { connect } from 'react-redux'

import QuantityStepper from './QuantityStepper'
import approximatePrice from '../../../utils/approximatePrice'

import { removeFromCart } from '../../../redux/actions/shoppingcart'


const useStyles = makeStyles(theme => ({
    grid:{ 
        padding: '20px',
        [theme.breakpoints.down("sm")]:{
            marginBottom: '10px',
            padding: 0
        }
    },
    griddescritption:{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
       
    },
    productInfo: {
        textAlign: 'left',
        width: '80%',
        [theme.breakpoints.down("sm")]:{
            width: '70%',
            marginLeft: '5px'
        }
    },
    controls: {
        display: 'block',
        height: 'inherit',
        width: '20%',
        [theme.breakpoints.down("sm")]:{
            width: '30%',
            // marginRight: '5px',
        }
    },
    imageStyle: {
        width: '100px',
        height: '100px',
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
const ProductDisplay = ({ cart, dispatch }) => {

    const classes = useStyles();
    return (
        <>
            <Grid container className={classes.grid}>
                <Grid item xs={3}>
                    <img 
                        className={classes.imageStyle}
                        src={cart.image ? cart.image : "https://i.imgur.com/EHyR2nP.png"}
                        alt={cart.name}
                    />
                </Grid>
                <Grid item className={classes.griddescritption} xs={9}>
                    <div className={ classes.productInfo}>
                        <Typography style={{ fontSize: 'medium', fontWeight: 'Bold'}} variant="body1">{cart.name}</Typography>
                        <Typography style={{ fontSize: 'small'}} className={classes.description} variant="caption">
                            {cart.benefits !== 'undefined' && cart.benefits.split(/<.*?>/g)}
                        </Typography>
                        <Typography variant="body2"><i><b>For: {cart.category}</b></i></Typography>
                    </div>
                    <div className ={ classes.controls} >
                        <DeleteIcon 
                                onClick={() => {dispatch(removeFromCart(cart.product_idx))}} 
                                style={{ 
                                    margin: 5, 
                                    color: 'rgba(255,0,0,0.5)',
                                    cursor:'pointer'
                                }}/>
                        <Typography variant="body2">€{approximatePrice(cart.price)}</Typography>
                        <QuantityStepper 
                            amount={cart.quantity} 
                            product_id={cart.product_idx} 
                            max={parseInt(cart.maxVal)}/>
                    </div>
                </Grid>
            </Grid>
            <Divider className={classes.divider}/>
        </>
    );
}

ProductDisplay.propTypes = {
    cart: PropTypes.object
}

export default connect()(ProductDisplay);

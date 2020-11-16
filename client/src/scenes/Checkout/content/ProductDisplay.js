import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import QuantityStepper from './QuantityStepper'

import approximatePrice from '../../../utils/approximatePrice'


const useStyles = makeStyles(theme => ({
    grid:{ 
        padding: '20px',
        [theme.breakpoints.down("sm")]:{
            marginBottom: '10px',
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
        [theme.breakpoints.down("sm")]:{
            marginLeft: '25px',
        }
    }
}))
const ProductDisplay = ({ cart }) => {

    const classes = useStyles();
    return (
        <>
            <Grid container className={classes.grid}>
                <Grid item style={ {width: 'inherit'} } xs={3}>
                    <img width={"100px"} height="100px"
                        src={cart.image ? cart.image : "https://i.imgur.com/EHyR2nP.png"}
                        alt={cart.name}
                    />
                </Grid>
                <Grid item className={classes.griddescritption} xs={9}>
                    <div className={ classes.productInfo}>
                        <Typography variant="body1">{cart.name}</Typography>
                        <Typography variant="caption">{cart.category}</Typography>
                        <Typography variant="body2">{cart.category}</Typography>
                    </div>
                    <div style={{ display: 'block', height: 'inherit' ,marginRight: '0px'}}>
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


export default ProductDisplay;

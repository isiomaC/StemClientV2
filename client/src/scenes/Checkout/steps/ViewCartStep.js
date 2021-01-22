import React from "react";
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import getOrderTotal from '../../../utils/getOrderTotal';
import approximatePrice from '../../../utils/approximatePrice';
import SimilarProduct from '../content/SimilarProduct';
import ProductDisplay from '../content/ProductDisplay';
import { useMediaQuery } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('md')]:{
            // height: '80vh'
        }
    },

    continueShopping: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: 'rgba(9, 0, 59, 0.9)'
        }
    }
}))

const  ViewCartStep = ({ shoppingcart, similarProducts })=> {

    const isBig = useMediaQuery(theme => theme.breakpoints.up('md'));
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const classes = useStyles()


    return <>
        {isBig && (
            <Grid  container>
                <Grid item xs={8}>

                    {(shoppingcart && shoppingcart.items !== undefined ) ? shoppingcart.items.map((item, index) => 
                        <>
                            <ProductDisplay key={index} cart={item} />
                        </>
                    ) : (
                        <p> Shopping Cart Empty</p>
                    )}
                
                    <br />
                    <br />
                    <br />
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link className={classes.continueShopping} to={'/shop'}>
                            <div style={{ display: 'flex', cursor: 'pointer' }}>
                                <ArrowBackIcon />
                                <Typography>Continue Shopping</Typography>
                            </div>
                        </Link>
                        <Typography style={{ marginRight: '10px' }}>Total: {approximatePrice(getOrderTotal(shoppingcart))}</Typography>
                    </Box>
                    <Divider style={{ background: 'black' }} />
                </Grid>
                <Grid style={{ background: 'rgba(255,255,255,0.7)' }} item xs={4}>
                    <Typography variant="body1"> Things you might like...</Typography>
                    {similarProducts.map((item, index) => (

                        <SimilarProduct key={index} id={item.idx} name={item.name} description={item.benefits} size={item.size} price={item.price} image={item.base64} />
                    ))}
                </Grid>
            </Grid>
        )}

        {isSmall && (
            <Grid container style={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                    {(shoppingcart && shoppingcart.items !== undefined ) ? shoppingcart.items.map((item, index) => 
                        <>
                            <ProductDisplay key={index} cart={item} />
                        </>
                    ) : (
                        <p> Shopping Cart Empty</p>
                    )}
                    <br />
                    <br />
                    <br />
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link className={classes.continueShopping} to={'/shop'}>
                            <div style={{ display: 'flex', cursor: 'pointer' }}>
                                <ArrowBackIcon />
                                <Typography variant="body2">Continue Shopping</Typography>
                            </div>
                        </Link>
                        <Typography style={{ marginRight: '10px' }} variant="body2">Total: {approximatePrice(getOrderTotal(shoppingcart))}</Typography>
                    </Box>
                    <Divider style={{ background: 'black' }} />
                </Grid>
                <Grid style={{ marginTop: '15px'}} item xs={12}>
                    <Typography variant="body2"> Things you might like...</Typography>
                    {similarProducts.map((item, index) => (

                        <SimilarProduct key={index} id={item.idx} name={item.name} description={item.benefits} size={item.size} price={item.price} image={item.base64} />
                    ))}
                </Grid>
            </Grid>
        )}
    </>;
}




export default ViewCartStep
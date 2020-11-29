import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import ProductInfoCarousel from '../../Content/ProductInfoCarousel'
import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import Rating from '@material-ui/lab/Rating';

//Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

//Content
// import Rating from '../Home/content/cRating'
import Spinner from '../../Components/layout/Spinner'

//actions
import { getProduct } from '../../redux/actions/shopactions'
import { addToCart, removeFromCart } from '../../redux/actions/shoppingcart'

import ReviewDialog from './content/ReviewDialog'

import approximatePrice from '../../utils/approximatePrice'


const useStyles = makeStyles(theme => ({
    rows: {
        display: 'flex',
        alignitems: 'flex-start',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    topRows: {
        display: 'flex',
        alignitems: 'flex-start',
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 70,
        marginRight: 10
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 70,
    },
    review: {
        margin: '0px 5px', 
        cursor: 'pointer', 
        '&:hover': { 
            textDecoration: 'underline'
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '1px solid #000',
        // boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 4, 3),
      },
}))

const apiUrl = 'http://localhost:5000/api'

const Product = (props) => {

    const { product, loading, getProduct, match, user, addToCart } = props

    const [open, setOpen] = React.useState(false);

    const [rating, setRating] = React.useState(0);//get product rating from db

    const [quantity, setQuantity] = React.useState(1);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {

        setOpen(false);
    };

    const handleChange = (event) => {
        setQuantity(event.target.value)
    }

    React.useEffect(() => {
       
        (async () => {
            await getProduct(match.params.idx)
        })()

        window.scrollTo(0,0)

    }, []);

    const classes = useStyles()

    return product === null ? (
        <Spinner/>
    ):(
        <Box style={{ flexGrow: 1}}>
            <Grid container style={{ height: ''}} spacing={0}>
                <Grid item style={{ padding: 70 }} xs lg={5}>
                    <ProductInfoCarousel images={product.product.base64Images}/>
                </Grid>
                <Grid item style={{ display: 'inline-block', color: 'black',}} xs lg={7}>
                    <Typography className={classes.topRows} variant='h4'>
                        {product.product.name}
                    </Typography>
                    <Box className={classes.rows}>
                        <Rating rating={rating}/>
                        
                        <Typography style={{ margin: '0px 5px'}}> 55 reviews </Typography>
                        {"|"}
                        <Typography className={classes.review} onClick={handleOpen}> Write a review </Typography>
                        <ReviewDialog open={open} handleClose={handleClose} product_id={product.product.idx}/>
                    </Box>
                    <Box className={classes.rows}>
                        €{approximatePrice(product.product.price)}
                    </Box> 
                    <Box component='div' className={classes.rows}>  
                        <form className={classes.container} noValidate>
                            <TextField
                                variant="filled"   
                                id="quantity"
                                label=""
                                type="number"
                                disabled={parseInt(product.product.stock) === 0}
                                defaultValue={parseInt(product.product.stock) === 0 ? 0 : 1}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps:{
                                        min: 1, max: parseInt(product.product.stock)
                                    }
                                }}
                                onChange={(e) => handleChange(e)}
                            />
                            { parseInt(product.product.stock) === 0 && <p style={{color:'red'}}>No Stock</p>}
                        </form> 
                        <Button 
                            disabled={parseInt(product.product.stock) === 0}
                            variant="contained" 
                            color="secondary" 
                            onClick={() => {
                                // console.log(product.product)
                                const { idx, base64Images, name, price, benefits, stock, category_id } = product.product
                                // if (user === undefined || user.idx === null){
                                addToCart(idx, quantity, base64Images[0], name, price, benefits, stock, category_id)
                            }} >
                            Add To Cart
                        </Button>
                    </Box>
                    <Typography className={classes.rows} variant="body1">
                        {product.product.benefits.split(/\<.*?\>/g)} 
                    </Typography>
                    <Typography className={classes.rows} variant="body1">
                        Ingredients:{" "}{product.product.ingredients} 
                    </Typography>
                    <Typography className={classes.topRows}>
                         {"Share:"} 
                         <FacebookIcon style={{ marginLeft: 20, color: 'Blue'}}/> 
                         <TwitterIcon style={{ marginLeft: 10, color: 'lightBlue'}}/>
                         <YouTubeIcon style={{ marginLeft: 10, color: 'red'}} />
                     </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

Product.propTypes = {
    product: PropTypes.object,
    loading: PropTypes.bool,
    getProduct: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = state => ({
    product: state.shopactions.product,
    loading: state.shopactions.loading,
    user: state.auth.user
})

export default connect(mapStateToProps, { getProduct, addToCart })(Product);
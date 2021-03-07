import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import ProductInfoCarousel from '../../Content/ProductInfoCarousel'
import { Container, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';

// import Rating from '@material-ui/lab/Rating';

//Icons
import ShareIcon from '@material-ui/icons/Share';

//Content
import Rating from '../Home/content/cRating'
import Spinner from '../../Components/layout/Spinner'

//actions
import { getProduct } from '../../redux/actions/shopactions'
import { addToCart } from '../../redux/actions/shoppingcart'
import { setAlert } from '../../redux/actions/alert'

import ReviewDialog from './content/ReviewDialog'

import approximatePrice from '../../utils/approximatePrice'

import parse from 'html-react-parser';


import { getReviewsForProduct } from '../../redux/actions/reviewActions'
import FeaturedReviews from '../Home/sections/FeaturedReviews'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root:{
        width: '100vw',
        // height: '100vh',
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            // height: '100vh'
        }
    },
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
    shareIcon: {
        color: 'red',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    benefits:{
        textAlign: 'left',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    }
}))

const Product = (props) => {

    const { product, getProduct, match, user, addToCart, alert, setAlert, getReviewsForProduct, reviews, error, loading } = props

    const [open, setOpen] = React.useState(false);

    const [snackOpen, setSnackOpen] = React.useState(false);

    const [quantity, setQuantity] = React.useState(1);

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setQuantity(event.target.value)
    }

    const handleSnackbarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false)
    }

    const copyToClipBoard = () => {
        setSnackOpen(true)
        navigator.clipboard.writeText(window.location.href)
        setAlert('Url Copied to ClipBoard', 'info')
    }
   
    React.useEffect(() => {
       
        (async () => {
            await Promise.all([ getProduct(match.params.idx), getReviewsForProduct(match.params.idx)])
        })()

        window.scrollTo(0,0)

    }, [match, getProduct]);

    console.log(reviews)
    // if (alert.length > 0){
    //     setSnackOpen(true)
    // }

    return product === null ? (
        <div style={{ display: 'flex', alignItem: 'center', width: '100vw', height: '80vh'}}>
            <Spinner/>
        </div>
    ):(
        <Box className={classes.root} style={{ }}>

            { (alert.length > 0 && alert[0].msg.success) &&
                <Snackbar open={true} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="success">
                        {alert[0].msg.message}
                    </Alert>
                </Snackbar>
            }

            { (alert.length > 0 && alert[0].msg.success === false) &&
                <Snackbar open={true} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="error">
                        {alert[0].msg.message}
                    </Alert>
                </Snackbar>
            }

            <Grid container style={{ }} spacing={0}>
                <Grid item style={{ padding: 70 }} xs md lg={5} >
                    <ProductInfoCarousel images={product.product.base64Images}/>
                </Grid>
                <Grid item style={{ display: 'inline-block', color: 'black',}}xs md lg={7} >
                    <Typography className={classes.topRows} variant='h4'>
                        {product.product.name}
                    </Typography>
                    <Box className={classes.rows}>
                        <Rating rating={parseInt(product.product.reviewAverage, 10)}/>
                        
                        <Typography style={{ margin: '0px 5px'}}> {product.product.reviewCount} reviews </Typography>
                        {"|"}
                        <Typography className={classes.review} onClick={handleOpen}> Leave a review </Typography>
                        <ReviewDialog open={open} handleClose={handleClose} product_id={product.product.idx} user={user}/>
                    </Box>
                    <Box className={classes.rows}>
                        €{approximatePrice(product.product.price)}
                    </Box> 
                    {(alert.length > 0 && (typeof alert[0].msg === 'string' && alert[0].msg.startsWith('Please'))  ) && <Typography style={{color:'red', textAlign: 'left'}} variant='body2'> <b><i>{alert[0].msg}</i></b></Typography>}
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
                                        min: 1,
                                        max: parseInt(product.product.stock, 10),
                                    }
                                }}
                                onChange={(e) => handleChange(e)}
                            />
                            { parseInt(product.product.stock) === 0 && <p style={{color:'red'}}>Out Of Stock</p>}
                        </form> 
                        <Button 
                            disabled={parseInt(product.product.stock) === 0}
                            variant="contained" 
                            color="secondary" 
                            onClick={() => {
                                const { idx, base64Images, name, price, benefits, stock, category_id } = product.product
                                addToCart(idx, quantity, base64Images[0], name, price, benefits, stock, category_id)
                            }} >
                            Add To Cart
                        </Button>
                    </Box>
                    <div className={classes.benefits}>
                      {product.product.benefits !== "undefined" && parse(product.product.benefits) }   {/* .split(/\<.*?\>/g) */}
                    </div>
                    <Typography className={classes.rows} style={{ textAlign: 'left'}} variant="body1">
                        <i>INGREDIENTS:{" "}{product.product.ingredients.split(/<.*?>/g)} </i>
                    </Typography>
                    <Typography className={classes.topRows}>
                         {"Share:"} 
                          {/* <Hidden><Typography>{window.location.href}</Typography></Hidden> */}
                          <ShareIcon onClick={() => copyToClipBoard() } style={{ marginLeft: 20}} className={classes.shareIcon}/> 
                          { alert.length > 0 &&  <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                                                    <Alert onClose={handleSnackbarClose} >
                                                        {alert[0].msg}
                                                    </Alert>
                                                </Snackbar> }
                        
                     </Typography>
                     <br/>
                     
                </Grid>
            </Grid>
            <Container>
               <FeaturedReviews reviews={reviews} loading={loading}/>
            </Container>
        </Box>
    )
}

Product.propTypes = {
    product: PropTypes.object,
    loading: PropTypes.bool,
    getProduct: PropTypes.func,
    user: PropTypes.object,
    alert: PropTypes.arrayOf(PropTypes.object),
    reviews: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
    product: state.shopactions.product,
    loading: state.shopactions.loading,
    user: state.auth.user,
    alert: state.alert,
    reviews: state.reviewActions.reviews,
    error: state.reviewActions.error,
    loading: state.reviewActions.loading
})

export default connect(mapStateToProps, { getProduct, addToCart, setAlert, getReviewsForProduct })(Product);
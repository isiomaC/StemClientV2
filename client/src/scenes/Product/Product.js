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

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';

// import Rating from '@material-ui/lab/Rating';

//Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ShareIcon from '@material-ui/icons/Share';

//Content
import Rating from '../Home/content/cRating'
import Spinner from '../../Components/layout/Spinner'

//actions
import { getProduct } from '../../redux/actions/shopactions'
import { addToCart, removeFromCart } from '../../redux/actions/shoppingcart'
import { setAlert } from '../../redux/actions/alert'

import ReviewDialog from './content/ReviewDialog'

import approximatePrice from '../../utils/approximatePrice'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root:{
        width: '100vw',
        height: '60vh',
        dispplay: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        [theme.breakpoints.down('xs')]: {
            height: '100vh'
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
      }
}))

const Product = (props) => {

    const { product, loading, getProduct, match, user, addToCart, alert, setAlert } = props

    const [open, setOpen] = React.useState(false);

    const [snackOpen, setSnackOpen] = React.useState(false);

    const [rating, setRating] = React.useState(0);//get product rating from db

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
            await getProduct(match.params.idx)
        })()

        window.scrollTo(0,0)

    }, []);

    // if (alert.length > 0){
    //     setSnackOpen(true)
    // }

    return product === null ? (
        <div style={{ display: 'flex', alignItem: 'center', width: '100vw', height: '80vh'}}>
            <Spinner/>
        </div>
    ):(
        <Box className={classes.root} style={{ flexGrow: 1}}>

            { (alert.length > 0 && alert[0].msg.success) &&
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="success">
                        {alert[0].msg.message}
                    </Alert>
                </Snackbar>
            }

            { (alert.length > 0 && alert[0].msg.success === false) &&
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="error">
                        {alert[0].msg.message}
                    </Alert>
                </Snackbar>
            }

            <Grid container style={{ height: ''}} spacing={0}>
                <Grid item style={{ padding: 70 }} xs lg={5}>
                    <ProductInfoCarousel images={product.product.base64Images}/>
                </Grid>
                <Grid item style={{ display: 'inline-block', color: 'black',}} xs lg={7}>
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
                                const { idx, base64Images, name, price, benefits, stock, category_id } = product.product
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
                         
                          <ShareIcon onClick={() => copyToClipBoard() } style={{ marginLeft: 20}} className={classes.shareIcon}/> 
                          { alert.length > 0 &&  <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                                                    <Alert onClose={handleSnackbarClose} >
                                                        {alert[0].msg}
                                                    </Alert>
                                                </Snackbar> }
                        
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
    user: PropTypes.object,
    alert: PropTypes.object,
}

const mapStateToProps = state => ({
    product: state.shopactions.product,
    loading: state.shopactions.loading,
    user: state.auth.user,
    alert: state.alert
})

export default connect(mapStateToProps, { getProduct, addToCart, setAlert })(Product);
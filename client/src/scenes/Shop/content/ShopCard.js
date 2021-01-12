import React from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

//Components
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import { addToCart } from '../../../redux/actions/shoppingcart'

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import parse from 'html-react-parser';


const useStyles = makeStyles(theme=> ({
    card: {
        marginTop: '20px',
        textAlign:'center',
        width: "calc(100% - 10px)",
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        '&:hover': {
            boxShadow: theme.shadows[3],
            background: 'rgba(255,255,255, 0.9)'
        },
        background: 'inherit',
        color: '#354773'
    },
    cardMedia: {
        display: 'flex', 
        justifyContent:'center', 
        alignItems:'center',
    },
    bigAvatar:{
        width: "100%",
        height: "100%",
        '&:hover': {
            color: 'rgba(255, 255, 255, 0.1)'  
          },
    },
    button: {
        marginTop: 20
    },
    cardContent : {

    },
    div: {
        display: 'flex', 
        justifyContent: 'space-around'
    },
    description:{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        textAlign: 'left',
        '-webkit-line-clamp': 2,
         /* number of lines to show */
        '-webkit-box-orient': 'vertical',
    }
}));

const ShopCard = (props) => {
    const classes = useStyles()
    const id = props.idx

    const product = props.product
    const addToCart = props.addToCart

    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    
    const { push } = useHistory()

    // console.log(props.description)

    return (
        <Card elevation={0} className={classes.card}>
            {/* <CardActionArea > */}
                <CardMedia component="div" 
                        alt="Preview Image"
                        title={props.title}
                        className={classes.cardMedia}
                        onClick={() => {
                            push(`/product/${id}`)
                        }}>
                            <Avatar  variant={props.variant} alt="Remy Sharp" className={classes.bigAvatar} src={props.image} />
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <div className={classes.div} 
                         onClick={() => push(`/product/${id}`)}>

                        <Grid item style={{ display: 'inline'}} xs={12}>
                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                <Typography variant={isXSmall ? 'body2' : 'h6' } align="left">
                                    {props.title}
                                </Typography>
                            </div>
                            <div className={classes.description} style={{ fontSize: isXSmall ? '11px' : '15px'}} >
                                {props.description !== "undefined" && parse(props.description)}
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>€{props.price}</Typography>
                        </Grid>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                 addToCart(product.idx, 1, product.base64, product.name, product.price, product.benefits, parseInt(product.stock, 10), product.category_id )
                            }
                            className={classes.button}
                            startIcon={<ShoppingBasketIcon/>}>
                        </Button>
                    </div>
                </CardContent>
        </Card>
    )
}

ShopCard.prototypes={
    idx: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.any.isRequired,
    description: PropTypes.string,
    price: PropTypes.string,
    variant: PropTypes.string,
    product: PropTypes.object,
    addToCart: PropTypes.func
}

export default connect(null, { addToCart })(ShopCard)
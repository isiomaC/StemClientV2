import React from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

//Components
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


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
        // display: "flex",
        // justifyContent: "space-between"
        // alignItems: "flex-start"
    },
    div: {
        display: 'flex', 
        justifyContent: 'space-around'
    }
}));

const ShopCard = (props) => {
    const classes = useStyles()
    const id = props.idx
    
    const { push } = useHistory()

    return (
        <Card elevation={0} className={classes.card}>
            <CardActionArea >
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
                                <Typography variant="caption" align="left">
                                    {props.title}
                                </Typography>
                            </div>
                            <Typography variant="body2" align="left" component="p">
                                {props.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>€{props.price}</Typography>
                        </Grid>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button
                            variant="outlined"
                            onClick={() => console.log("ADD TO CART HERE")}
                            className={classes.button}
                            startIcon={<ShoppingBasketIcon/>}>
                        </Button>
                    </div>
                </CardContent>

            </CardActionArea>
                {/* <CardActions>
                    <Link style={{ textDecoration: 'none'}} to={'/ProductInfo'}>
                        <Button size='small' color='black'>    
                            Details                   
                        </Button>
                    </Link>
                </CardActions> */}
        </Card>
    )
}

ShopCard.prototypes={
    idx: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.any.isRequired,
    description: PropTypes.string,
    price: PropTypes.string,
    variant: PropTypes.string
}

export default ShopCard
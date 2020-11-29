import React from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router'

import { makeStyles } from '@material-ui/core/styles';

//Components
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme=> ({
    card: {
        textAlign:'center',
        minWidth: "33.3%",
        [theme.breakpoints.down('sm')]: {
            minWidth: '50%',
        },
        '&:hover': {
            boxShadow: theme.shadows[3],
            background: 'rgba(255,255,255, 0.9)'
        },
        maxWidth: "33.3%",
        background: 'inherit',
        color: '#354773'
    },
    cardMedia: {
        display: 'flex', 
        justifyContent:'center', 
        alignItems:'center',
    },
    bigAvatar:{
        width: "calc(100% - 10px)",
        height: "100%",
        '&:hover': {
            color: 'rgba(255, 255, 255, 0.1)'  
        },
    },
    cardContent : {
        display: "flex",
        justifyContent: "space-between"
        // alignItems: "flex-start"
    }
}));

  

const ProductCard = (props) => {
    const classes = useStyles()
    const { push } = useHistory()

    // console.log(props)

    return (
        <Card elevation={0} className={classes.card}>
            <CardActionArea onClick={() => push(`/product/${props.idx}`)} >
                <CardMedia component="div" 
                        alt="Preview Image"
                        title={props.title}
                        className={classes.cardMedia}>
                            <Avatar variant={props.variant} alt="Remy Sharp" className={classes.bigAvatar} src={props.image} />
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <div style={{ display: "block"}}>
                        <Typography variant="h5"  align="left" component="h3" >
                            {props.title}
                        </Typography>
                        <Typography variant="body2"  align="left" component="p"  component="p">
                            {props.description}
                        </Typography>
                    </div>
                    <Typography>€{props.price}</Typography>
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

ProductCard.prototypes={
    title: PropTypes.string,
    image: PropTypes.any.isRequired,
    description: PropTypes.string,
    price: PropTypes.string,
    variant: PropTypes.string,
    idx: PropTypes.number
}

export default ProductCard
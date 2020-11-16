import React from 'react'
//react router
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
//material ui components
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//COmponents
import ProductCard from '../content/ProductCard';

const useStyles = makeStyles(theme=> ({
    root:{
        display: 'grid',
        paddingTop: 30,
        width:'100vw',
        background:'rgba(255, 255, 255, 0.5)',
        gridTemplate: '1fr / 1fr',
        placeItems: 'center',
    },
    arrowLeft: {
        display: 'flex',
        zIndex: 10,
        left: 0,
        background: 'inherit',
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    arrowRight: {
        display: 'flex',
        zIndex: 10,
        right: 0,
        marginRight: 10,
        background: 'inherit',
        justifyContent: 'center',
        alignItems: 'center'
    },
    griditem:{
        gridColumn: '1 / 1',
        gridRow: '1 / 1',
        display:'flex', 
        marginLeft: 0,
        overflowX: "hidden",
        zIndex: 2,
        '&:hover':{
            overflowX: 'scroll'
        },
        '&::-webkit-scrollbar': {
            height:  '6px',
        },
        '&::-webkit-scrollbar-track': {
            // boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            // webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgb(0,0,0,0.5)',
            WebkitBackgroundClip: 'content-box',
            border: '2px solid transparent',
            borderRadius: '10px',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,.8)'
            }
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    typo:{
        margin: 20
    },
    slida: {
        height: '40vh', 
    },
    slid: {
        height: '40vh', 
        marginTop: 40
    },
    landingLinks: {
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        marginLeft: 150,
        marginTop: 50,
        marginBottom: 50,
    }
}));


const easeInOutQuad =(t, b, c, d) =>{
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

const scrollLeft = (element, change, duration) => {
    var start = element.scrollLeft,
        currentTime = 0,
        increment = 20;
        
        
    var animateScroll = () => {        
        currentTime += increment;
        var val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

const FeaturedProducts = ({products, variant}) => {
    const classes = useStyles();
    // const images =  [pro1, pro2, pro3];

    const [show, setShow] = React.useState(false)

    const nextPrevRef = React.createRef(null);

    const subText = "SUBSCRIBE TO OUR NEWSLETTER";
    const tt = "Be One of the Fist to know about new releases";

    const handleNav = (direction) => {
        //add animation
        if (direction === 'left'){
            if (nextPrevRef !== null){
                scrollLeft(nextPrevRef.current, -400, 400)
            }
        }else{
            if (nextPrevRef !== null){
                scrollLeft(nextPrevRef.current, 400, 400)
            }
        }
    }

    const showArrows = (val) => {
        // console.log(e.target.style);
        
        setShow(val =>!val)
    }
    
    return (
        <Box component='div' id='featureddestination'  className={ classes.root } >
                <Box direction="row" ref={nextPrevRef} className={classes.griditem} item>
                    {products.map(product => 
                        (      
                        <ProductCard variant={variant}
                                     title={product.name} 
                                     description={product.benefits.split(/\<.*?\>/g)} 
                                     price={product.price} 
                                     image={product.base64}/>
                        )
                    )}
                </Box>
                <Box style={{ zIndex: 90, 
                              justifyContent: 'space-between', 
                              gridColumn: '1 / 1',
                              gridRow: '1 / 1', 
                              width: '100%',
                              display:'flex', 
                              }}>
                    <Avatar onClick={() => handleNav("left")}
                            onMouseEnter={showArrows} 
                            onMouseLeave={showArrows} 
                            className= {classes.arrowLeft} >
                        {show && <ArrowBackIosIcon  />}
                    </Avatar>
                    <Avatar onClick={() => handleNav("right")}  
                            onMouseEnter={showArrows} 
                            onMouseLeave={showArrows}  
                            className={classes.arrowRight}>
                        {show && <ArrowForwardIosIcon  />}
                    </Avatar>
                </Box>
            </Box>
    )
}

FeaturedProducts.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    variant: PropTypes.string
}

export default FeaturedProducts
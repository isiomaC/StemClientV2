import React from 'react'
import PropTypes from 'prop-types';

//pure react carousel
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

//material ui components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

//Content
import Review from '../content/Review';


const useStyles = makeStyles(theme => ({
    root:{
        // flexGrow:1,
        // paddingTop: 30,
        // width:'100vw',
    },
    slida: {
        height: '30vh', 
        [theme.breakpoints.down('xs')]:{
            height: 'inherit' //"inherit" | "initial" | "revert" | "unset";
        }
    },
    slid: {
        // height: '40vh', 
        marginTop: '80px',
        // marginBottom: '60px'
    },
    container:{
        margin: '10px'
    }

}));
const FeaturedReviews = ({ reviews, loading, error }) => {

    // const isSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    // const isBig = useMediaQuery(theme => theme.breakpoints.up('sm'));

    const classes = useStyles();

    return (
        <div className = {classes.root}>
            <Grid container justify="center"  alignItems="center" style={{  }} >
                {/* {isSmall && (
                    // data.map(d => 
                    <Grid style={{ display: 'flex', alignItems:'center', justifyContent: 'center'}} container>
                        {reviews.map((review, i) => (
                            <Grid key={i} style={{ margin: '20px' }} item xs="12" >
                                 <Review review={review}/>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {isBig && (  */}
                    <CarouselProvider
                    className={classes.container}
                        naturalSlideWidth={20}
                        naturalSlideHeight={20}
                        totalSlides={reviews.length}
                        // style={{ height: '40vh'}} 
                        isPlaying={true}
                        playDirection="forward"
                        currentSlide={0}
                    >
                        <Slider className={classes.slida}>

                            {reviews.map((review, index) => {
                                return (
                                    <Slide key={index} index={index} className={classes.slid}>
                                        <div style={{ display:'flex', justifyContent:'center'}}>
                                            <Review review = {review}/>
                                            {/* <Review review = {reviews[index + 1]}/> */}
                                        </div>
                                    </Slide>
                                )
                            }
                            )}
                        </Slider>

                        {/* <Slide index={0} className={classes.slid}>
                            <div style={{ display:'flex', justifyContent:'center'}}>
                                <Review rev/>
                                <Review/>
                            </div>
                        </Slide>
                        <Slide index={1} className={classes.slid}>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <Review/>
                                <Review/>
                            </div>
                        </Slide>
                        <Slide index={2} className={classes.slid}>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <Review/>
                                <Review/>
                            </div>
                        </Slide> */}
                        {/* <ButtonBack>Back</ButtonBack>
                        <ButtonNext>Next</ButtonNext>  */}
                 </CarouselProvider> 
                {/* )}      */}
            </Grid>
        </div>
    )
}

FeaturedReviews.propTypes = {
    reviews: PropTypes.any,
    error: PropTypes.object,
    loading: PropTypes.bool
}

export default FeaturedReviews;
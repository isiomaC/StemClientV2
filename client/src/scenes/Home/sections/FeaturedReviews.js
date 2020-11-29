import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//pure react carousel
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

//material ui components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';


//Content
import Review from '../content/Review';

// Static Product Images
import pro1 from '../../../img/Pro1.jpg';
import pro2 from '../../../img/Pro2.jpg';
import pro3 from '../../../img/Pro3.jpg';
import Spinner from '../../../Components/layout/Spinner';


const useStyles = makeStyles(theme => ({
    root:{
        flexGrow:1,
        paddingTop: 30,
        width:'100vw',
    },
    slida: {
        height: '40vh', 
    },
    slid: {
        height: '40vh', 
        marginTop: 40
    },

}));
const FeaturedReviews = ({ reviews, loading, error }) => {

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const isBig = useMediaQuery(theme => theme.breakpoints.up('sm'));

    const classes = useStyles();
    const data = [6];

    var slideIndex = 0

    return (
        <div className = {classes.root}>
            <Grid container justify="center" alignItems="center" style={{ }} spacing={24} >
                {isSmall && (
                    // data.map(d => 
                    <Grid style={{ display: 'flex', alignItems:'center', justifyContent: 'center'}} container>
                        {reviews.map(review => (
                            <Grid style={{ margin: '20px' }} item  >
                                 <Review review={review}/>
                            </Grid>
                        ))}
                    </Grid>
                    )}

                {isBig && ( 
                    <CarouselProvider
                        naturalSlideWidth={20}
                        naturalSlideHeight={20}
                        totalSlides={3}
                        // style={{ height: '40vh'}} 
                        isPlaying={true}
                        playDirection="forward"
                        currentSlide={0}
                    >
                    <Slider className={classes.slida}>

                        {
                        reviews.map((review, index) => {
                            if (index >= reviews.length){
                                return (<Spinner/>);
                            }
                            slideIndex++
                            return (
                                <Slide index={slideIndex} className={classes.slid}>
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
                )}     
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
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Rating from './cRating';
import { makeStyles } from '@material-ui/core';

import imag from '../../../img/Carousel/g1.jpeg';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '15vh',
        justifyContent: 'center',
        // width: 'calc(100% - 25px)',
        background: 'rgba(20, 20, 20, 0.1)',
        [theme.breakpoints.up('md')]: {
            // marginLeft: 10,
            // marginRight: 10
            margin: 10
        },
    },
    detailText: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap:"wrap",
        overflow: "hidden"
    },
    content: {
        // flex: '1 0 auto',
    },
    cover: {
        // maxWidth: 250,
        width: 125,
        // minWidth: 150,
    },
}));

const Review = ({review}) => {
    const classes = useStyles();
    
    return (
            <Card elevation={0} className={classes.root}>
                <Box component="div" className={classes.detailText}>
                    <CardContent >
                        <Typography style={{ padding: '0px 0px' }}variant='subtitle1'  color="textSecondary">
                            {review.comment}
                        </Typography>
                        <div style={{display:'flex', marginTop: 10, justifyContent:'center'}}>
                            <Rating rating={review.rating}/>
                            <Typography color="textSecondary" variant='subtitle2'>{review.date}</Typography> 
                        </div>
                    </CardContent>
                </Box>
                <CardMedia
                    className={classes.cover}
                    image={imag}
                />
            </Card>  
    )
}

Review.propTypes = {
    review: PropTypes.object
}

export default Review;
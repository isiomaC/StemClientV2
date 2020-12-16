import React from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router'

import { makeStyles } from '@material-ui/core/styles';

//Components
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import moment from 'moment'

import logo from '../../../img/Logo.png'

const useStyles = makeStyles(theme=> ({
    card: {
        margin: '10px 20px',
        // backgroundImage: `url(${logo})`, //'#A8DDA8',
        // // backgroundColor: 'rgba(255, 255, 255, 0.4)',
        // backgroundSize: 'contain',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        background: 'transparent',
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            width: '100%',
        },
        '&:hover': {
            // boxShadow: theme.shadows[1],
        },
        color: '#354773',
    },
    gridContainer: {
        height:'inherit',
        alignItems:'flex-end', 
        display: 'flex',
        // background: 'rgba(255, 255, 255, 0.8)'
    },
    cardMedia: {
        display: 'flex', 
        justifyContent:'center', 
        alignItems:'center',
    },
    bigAvatar:{
        borderRadius: '10px',
        width: '100%',
        height: '240px'
    },
    button: {},
    details: {
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        // flex: '1 0 auto',
        display: 'block',
        // justifyContent: 'center',
        // aligntItems: 'flex-end',
        marginTop: '40px',
    },
    teaser:{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        textAlign : 'left',
        '-webkit-line-clamp': 2,
         /* number of lines to show */
        '-webkit-box-orient': 'vertical',
    }
}));

const BlogCardRight = (props) => {
    const classes = useStyles()

    const { push }  = useHistory()
    return (
            <Card elevation={0} className={classes.card}>
                <Grid className={classes.gridContainer}  container> 
                    <Grid item style={{ display: 'inline-block'}} sm={4} xs={12}>
                        <img alt="Avatar Sharp" className={classes.bigAvatar} src={props.image} />
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <CardContent className={classes.content}>
                            <div style={{ display: 'block', textAlign:'left', }} >
                                <Typography component="h5" variant="h5">
                                    {props.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {moment(props.date).format('YYYY/MM/DD')}
                                </Typography>
                            </div>
                             <Typography className={classes.teaser}>
                                {props.blogtext}
                            </Typography>
                            <div style={{ textAlign: 'right'}}>
                                <Button
                                    variant="outlined"
                                    className={classes.button}
                                    onClick={() => push(`/blog/${props.id}`)}
                                    // startIcon={<ShoppingBasketIcon/>}>
                                    >
                                        READ MORE
                                </Button>
                            </div>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
    )
}


BlogCardRight.prototypes={
    title: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.any.isRequired,
    blogtext: PropTypes.string,
    variant: PropTypes.string,
    id: PropTypes.number
}

export default BlogCardRight
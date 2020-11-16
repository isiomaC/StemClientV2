import React from 'react'
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

//Components
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme=> ({
    card: {
        // width: "100%",
        // height: '50vh',
        marginLeft: '40px',
        marginRight: '40px',
        marginTop: '20px',
        marginBottom: '20px',
        background: '#d2f5e3', //'#A8DDA8',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        '&:hover': {
            boxShadow: theme.shadows[1],
        },
        // background: 'inherit',
        color: '#354773',
    },
    cardMedia: {
        display: 'flex', 
        justifyContent:'center', 
        alignItems:'center',
    },
    bigAvatar:{},
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
}));

const BlogCard = (props) => {
    const classes = useStyles()

    return (
            <Card elevation={0} className={classes.card}>
                {/* <div className={classes.details}> */}
                <Grid style={{ height:'inherit', alignItems:'flex-end', display: 'flex'}}  container> 
                    <Grid item xs={8}>
                        <CardContent className={classes.content}>
                            <div style={{display: 'block', textAlign:'left', }} >
                                <Typography component="h5" variant="h5">
                                    {props.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {props.date}
                                </Typography>
                            </div>
                            <Typography style={{ textAlign: 'left' }}>
                                {props.blogtext}
                            </Typography>
                            <div style={{ textAlign: 'right'}}>
                                <Button
                                    variant="outlined"
                                    className={classes.button}
                                    // startIcon={<ShoppingBasketIcon/>}>
                                    >
                                        READ MORE
                                </Button>
                            </div>
                        </CardContent>
                    </Grid>
                    <Grid item xs={4}>
                        <img width="" height="300px" variant={props.variant} alt="Avatar Sharp" className={classes.bigAvatar} src={props.image} />
                    </Grid>
                </Grid>
            </Card>
    )
}

BlogCard.prototypes={
    title: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.any.isRequired,
    blogtext: PropTypes.string,
    variant: PropTypes.string
}

export default BlogCard
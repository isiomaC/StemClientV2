import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    innerImage: {
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
       
        }
    },
}))

const CarouselItem = ({bgImage, landingText}) => { 
    const classes = useStyles()

    return (
        
        <img src={bgImage} className={classes.innerImage} alt={landingText}/>
    
        /* <Button variant='outlined' className="CheckButton">
            <Link style={{textDecoration: 'none', color: 'black'}} to={`/projects/${props.item.id}`}>
                Check it out!
            </Link>
        </Button> */
    )
}

CarouselItem.prototypes={
     extras: PropTypes.object,
     bgImage: PropTypes.any,
}

export default CarouselItem

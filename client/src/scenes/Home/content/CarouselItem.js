import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat:'no-repeat',
        height: '100vh',
        width: '100vw',
    },
    root2: {
        width: 'inherit', 
        height:'inherit', 
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        background: 'linear-gradient(to right top, rgba(255,255,255,0), rgba(151,212,136,0.5))'
    }
}))

const CarouselItem = ({bgImage, landingText}) => { 
    const classes = useStyles()

    return (
        <Box style={{ background: `url(${bgImage})` }} className={classes.root}>
            <Box className={classes.root2}>
                <Paper elevation={0} style={{ marginLeft: 30, width: '30%', height: '30%', background: 'transparent'}}>
                    <Typography style={{ color: 'rgba(200,0,0,0.5)'}} variant='h3'> {landingText}</Typography>
                </Paper>
            </Box>
    
                {/* <Button variant='outlined' className="CheckButton">
                    <Link style={{textDecoration: 'none', color: 'black'}} to={`/projects/${props.item.id}`}>
                      Check it out!
                    </Link>
                </Button> */}
        </Box>
    )
}

CarouselItem.prototypes={
     extras: PropTypes.object,
     bgImage: PropTypes.any,
}

export default CarouselItem

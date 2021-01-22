import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'

//Carousel 
import Carousel from 'react-material-ui-carousel'
import CarouselItem from '../content/CarouselItem'

import Spinner from '../../../Components/layout/Spinner'

//Icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    toolbar: {
      ...theme.mixins.toolbar,
      visibility: 'visible'
    },
    carousel: {
      [theme.breakpoints.down("sm")]: {
        marginTop: '25px' ///check nav bar height
      }
    },
    featured:{
      cursor: 'pointer',
      // marginTop: 50,
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
}))

const Landing = ({ extras }) => {
  
      const scrollRef = React.createRef(null)
      
      React.useEffect(() => {

      }, [extras])

      const classes = useStyles();

      const HandleScrolling = (event) =>{
        event.preventDefault();
        const featureddestination = document.querySelector('#featureddestination')
        // const innerText = event.target.innerText

        setTimeout(() => { scrollRef.current.scrollIntoView({
          top: featureddestination.offsetTop,
          left: 0,
          behavior: 'smooth'}) 
        })
      }

      return Object.keys(extras).length === 0 ? (
          <Spinner/>
      ) : (
          <Box className={classes.root}>
            <Box >
              <Carousel className={classes.carousel} emulateTouch={true} stopAutoPlayOnHover={true} showArrows={false} showIndicators={true} animation='fade'>
                {
                    extras[0].base64.map((item, i) => <CarouselItem bgImage={item} landingText={extras.landingText} key={i}/>)
                }
              </Carousel>

              <Box component="div" ref={scrollRef} className={classes.featured} onClick={HandleScrolling}>
                <div>
                  <Typography variant="h6"> Featured Products </Typography>
                  <div style={{ marginBottom: 0}}>
                    <KeyboardArrowDownIcon />
                  </div>
                  <div style={{ marginTop: -15}}>
                    <KeyboardArrowDownIcon />
                  </div>
                </div>
              </Box>
            </Box>
          </Box> 
      )
}

Landing.propTypes = {
  extras: PropTypes.arrayOf(PropTypes.object),
}



export default Landing;



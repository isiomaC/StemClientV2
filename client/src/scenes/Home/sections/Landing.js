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

//carousel Images


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
        //height: '100vh',
        // marginBottom: 50
    },
    toolbar: {
      ...theme.mixins.toolbar,
      visibility: 'visible'
    },
    carousel: {
      height: '80vh'
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

      }, [])

      const classes = useStyles();

      const HandleScrolling = (event) =>{
        event.preventDefault();
        const featureddestination = document.querySelector('#featureddestination')
        const innerText = event.target.innerText

        // if (innerText === "Featured Products"){
          setTimeout(() => { scrollRef.current.scrollIntoView({
            top: featureddestination.offsetTop,
            left: 0,
            behavior: 'smooth'}) })
        // }
      }

      const isExtrasEmpty = () => {
        if (Object.keys(extras).length === 0) {
          return true
        }else{
          return false
        }
      }

      return isExtrasEmpty() === true ? (
          <Spinner/>
      ): (
          <Box className={classes.root}>
            <Box >
                  <Carousel className={classes.carousel} emulateTouch={true} showArrows={false} showIndicators={true} animation='fade'>
                    {
                       extras.map(landing => (landing.base64.map((item, i) => <CarouselItem bgImage={item} landingText={extras.landingText} key={i}/>)))
                    }
                  </Carousel>

                    <Box component="div" ref={scrollRef} className={classes.featured} onClick={HandleScrolling}>
                      <div>
                        <Typography variant="h5"> Featured Products </Typography>
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



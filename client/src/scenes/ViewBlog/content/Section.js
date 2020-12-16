import React from 'react'
import { makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        margin: '20px 0px'
    },
    sectionText: {

    },
    ImgBg : {
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center', 
        width:"240px",
        height:"100px",
        // filter: 'opacity(0.1)  drop-shadow(0 0 0 green)',
        [theme.breakpoints.down('xs')]: {
            width:"134px",
            height:"69px",
        }
    },
}))

const getSide = (side) => {
    switch(side){
        case "left":
            return 'flex-start'
        case "right":
            return 'flex-end'
        default:
            return 'center'
    }
}

const Section = ({ section, side }) => {
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            {/* <img src={section.image} className={classes.sectionImage} alt='sectionImage'/> */}
            <div style={{
                  display: 'flex',
                  justifyContent: `${getSide(side)}`,
                  marginLeft: `${side === "left" ? '30px' : 0 }`,
                  marginRight: `${side === "right" ? '30px' : 0 }`
             }}>
                <div 
                    className={classes.ImgBg} 
                    style={{ 
                        background: `url(${section.image})`,
                    }}
                />
            </div>
            <Container>
               <Typography>{section.text}</Typography>
            </Container>
        </Container>
    )
}

Section.propTypes = {
    section: PropTypes.object,
    side: PropTypes.string
}

export default Section;

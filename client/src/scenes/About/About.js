import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types'
import andrea from '../../img/Carousel/andrea.jpeg'
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../../img/Logo.png'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        paddingBottom: '30px',
        background: 'rgba(255,255,255, 0.9)'
    },
    inner: {
        width: "100vw",
        height: "60vh",
        backgroundSize: 'cover',
        background: `url(${andrea})`
    },
    inner2: {
       display: 'block',
    },
    aboutUsHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImgBg : {
        background: `url(${Logo})`,
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat',  
        width:"200px",
        height:"120px",
    },
    InnerImgBg : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%', 
        backgroundColor: 'rgba(255,255,255, 0.7)'
    }
}))

 const About = () => {
     const classes = useStyles()
    return (
        <Box className={classes.root} >
            <Box className={classes.inner}/>
            <Container className={classes.inner2}>
                <Box className={classes.aboutUsHeader}>
                    <div className={classes.ImgBg} >
                        <div className={classes.InnerImgBg}>
                            <Typography variant="h4" className={classes.about}> About Us</Typography>
                        </div>
                    </div>
                </Box>
                <Box style={{ border:'1px solid rgba(204, 246, 200, 1)', borderRadius: '10px'}}>
                    <Typography>
                        {text}
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}

const text = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney' + 
'College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from' +
'sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,' + 
'"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32' + 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney' + 
'College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from' +
'sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,' + 
'"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32' + 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney' + 
'College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from' +
'sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,' + 
'"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32';

export default About 
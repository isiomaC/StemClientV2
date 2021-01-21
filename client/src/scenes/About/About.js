import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

//static Images
import aboutUs from '../../img/aboutUs.jpeg'
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../../img/Logo.png'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        paddingBottom: '30px',
        background: 'rgba(255,255,255, 0.9)'
    },
    inner: {
        display: "flex",
        justifyContent: "center",
    },
    innerImage: {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
       
    },
    inner2: {
       display: 'block',
    },
    aboutUsHeader: {
        margin: '10px 0',
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
        [theme.breakpoints.down('sm')]: {
            width: "120px",
            height: "80px"
        }
    },
    InnerImgBg : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%', 
        backgroundColor: 'rgba(255,255,255, 0.7)'
    },
    textContainer:{
        margin: 10,
        padding: '0 20px',
        border:'1px solid rgba(204, 246, 200, 1)', 
        borderRadius: '10px'
    },
    ulList: {
        textAlign: 'left',
        listStyle: 'outside'
    }
}))

 const About = () => {
     const classes = useStyles()
    return (
        <Box className={classes.root} >
            <Box className={classes.inner}>
                <img src={aboutUs} className={classes.innerImage} alt="About Us"/>
            </Box>
            <Container className={classes.inner2}>
                <Box className={classes.aboutUsHeader}>
                    <div className={classes.ImgBg} >
                        <div className={classes.InnerImgBg}>
                            <Typography variant="h4" className={classes.about}> About Us</Typography>
                        </div>
                    </div>
                </Box>
                <Box className={classes.textContainer}>
                    {/* <Typography > */}
                       <p>A range of natural hair and skincare, handmade by Phina Echeruwe in Lucan, Dublin. 
                            Our range of products are a constant collaboration with nature.</p>
                        
                        <p >InPhinityX is founded on three main philosophies:</p>

                        <ul className={classes.ulList} >
                            <li>We believe that nature has the power to restore, nourish and heal.  As a result, we desire to collaborate with nature to bring a range of products that are simply bursting with nutrients.</li>
                            <li>Selflove is Selfcare. We believe in loving our hair and skin and wanting nothing but the best for them. This includes using non-toxic products that are filled with synthetics and fillers. 
                                Instead caring for our bodies by reconnecting with nature and all its wonderful goodness. Our products are created with selfcare at its core.</li>
                            <li>We produce our products with you in mind. This means easy to use products that are great for you and the environment. </li>
                        </ul>

                        <p>Though InPhinityX was born in Dublin, its roots are in both African and Irish Holistic Traditions. 
                            All our products are handmade in small batches to ensure that we deliver the most raw, potent, and purest products. 
                            We use the finest organic cold pressed and steam distilled carrier oils, butters, essential oils and botanical Ayurvedic herbs. 
                            All our ingredients are ethically sourced, active, and included for their therapeutic effects. 
                            Our products contain no animal by-products and we only test on humans.</p>

                        <Box className={classes.aboutUsHeader}>
                            <div className={classes.ImgBg} >
                                <div className={classes.InnerImgBg}>
                                    <Typography variant="h4" className={classes.about}> Our Founder </Typography>
                                </div>
                            </div>
                        </Box>

                        <p>Phina created InPhinityX out of her love for all things natural and Afrocentric. 
                            Born in Nigerian, travelling and exploring her country Phina learned about natural healing remedies. 
                            Growing up with her grandmother she heard stories of plants that could restore and heal, this sparked an interest in natural holistic practices at a young age. </p>

                        <p>Her background in pharmaceutical science led to understanding good manufacturing practices and disciplines. 
                            After formulating her own hair and skincare products for many years she enrolled in an organic formulation course to deepen her knowledge and this led her on this journey to creating InPhinityX. </p>

                        <Typography variant='h6'> Our beliefs</Typography>
                        <ul className={classes.ulList} >
                            <li>We are a natural, ethical & environmentally friendly skincare company.</li>
                            <li>We do NOT test on animals, only humans.</li>
                            <li>We only use high quality natural, organic & cold pressed oils.</li>
                            <li>Our products are made fresh & in small batches.</li>
                            <li>All oils are chosen for their therapeutic properties.</li>
                            <li>All our products are scented using pure essential oils or natural fragrance oils.</li>
                            <li>No nasty chemicals are used </li>
                            <li>We source ethically, sustainable ingredients.</li>
                            <li>We use recyclable or biodegradable packaging</li>
                        </ul>

                            
                    {/* </Typography> */}
                </Box>
            </Container>
        </Box>
    )
}


export default About 
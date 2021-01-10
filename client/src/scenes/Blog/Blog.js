import React from 'react'
import { connect } from 'react-redux'


import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import '../../../src/index.css'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, useMediaQuery } from '@material-ui/core'

import PropTypes from 'prop-types'

import BlogCard from './content/BlogCard'
import BlogCardRight from './content/BlogCardRight'
import logo from '../../img/Logo.png'

import { Spring } from 'react-spring/renderprops'
import VisibilitySensor from "react-visibility-sensor";

import { getBlogs } from '../../redux/actions/blogactions'

//Statci Images 
import blog from '../../img/blog.jpeg'
import screen_3x from '../../img/screen_3x.jpeg'
import Spinner from '../../Components/layout/Spinner';

const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: '10px',
        display: 'block',
        width: '100vw',
        // background: 'rgba(255, 255, 255, 0.9)'
    },
    animatedItem: {
        animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut}`
    },
    // animatedItemExiting: {
    //     animation: `$myEffectExit 3000ms ${theme.transitions.easing.easeInOut}`,
    //     opacity: 0,
    //     transform: "translateY(-200%)"
    // },
    "@keyframes myEffect": {
        "0%": {
            opacity: 0,
            transform: "translateY(-200%)"
        },      
        "100%": {
            opacity: 1,
            transform: "translateY(0)"
        }
    },
    innerContainer:{
        width: "100vw",
        height: "60vh",
        display: "inline-block"
    },
    inner: {
        width: "100%",
        height: "100%",
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        background: `url(${screen_3x})`
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    ImgBg : {
        background: `url(${logo})`,
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center', 
        width:"180px",
        height:"100px",
        [theme.breakpoints.down('xs')]: {
            width:"134px",
            height:"69px",
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
    header : {
        margin: '20px auto'
    }
}))

const Blog = ({ blogs, getBlogs, loading, error}) => {
    const classes = useStyles();

    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));

    React.useEffect(()=> {
        const fetchBlogs = async ()=> {
            await getBlogs()
        }

        fetchBlogs()
    }, [])

    if (error){
        return (<div style={{ width: '100vw', 
                              height: '100vh', 
                              display: 'flex', 
                              justifyContent:'center',
                              alignItems: 'center'}}>
                    Something went wrong!!! Please Refresh the page 
                </div>)
    }

    return loading === true  ? (
        <div style={{ display: 'flex', alignItem: 'center', width: '100vw', height: '80vh'}}>
            <Spinner/>
        </div>
    ) : blogs && (
            isXSmall ? (
                <Box className={classes.root}>
                    <div className={classes.innerContainer}>
                        <Box className={classes.inner}/>
                    </div>
                    <Container >
                        {/* <img src={logo} width='134px' height='69px'></img> */}
                        {/* <div className={classes.ImgBg} >
                            <div className={classes.InnerImgBg}> */}
                            <Typography className={classes.header} variant="h4">Inphinity Blogs</Typography>
                            {/* </div>
                        </div> */}
                    </Container>
                    <Container>
                        {blogs.map((blog, i) => 
                        (<BlogCardRight 
                            key={i}
                            id={blog.idx}
                            image={blog.image_chunk}
                            title={blog.title} 
                            date={blog.date} 
                            blogtext={blog.text} />)
                        )}
                    </Container>
                </Box>
        ) : (
            <Box className={classes.root}>
                <div className={classes.innerContainer}>
                    <Box className={classes.inner}/>
                </div>
                <Container >
                    {/* <img src={logo} width='134px' height='69px'></img> */}
                    {/* <div className={classes.ImgBg} >
                        <div className={classes.InnerImgBg}> */}
                            <Typography className={classes.header} variant="h4">Inphinity Blogs</Typography>
                        {/* </div>
                    </div> */}
                </Container>
                {blogs.map((blog, i) => (
                    i % 2 ===  0 ?
                    //even
                    (
                        <VisibilitySensor key={i}> 
                            {({ isVisible }) => (
                            <Spring
                                config={{ delay: 300 }}
                                from={{ opacity: 0, marginRight: -10000}}
                                to={{ opacity: 1, marginRight: 0}}
                            >
                                {props => 
                                    (
                                        <div style={props}>
                                            <BlogCardRight 
                                                id={blog.idx}
                                                image={blog.image_chunk}
                                                title={blog.title} 
                                                date={blog.date} 
                                                blogtext={blog.text} />
                                        </div>
                                    )
                                }
                            </Spring>
                        )}
                        </VisibilitySensor>
                    )
                    :
                    //odd
                    (
                        <VisibilitySensor key={i}>
                             {({ isVisible }) => (
                                <Spring
                                    config={{ delay: 300 }}
                                    from={{ opacity: 0, marginLeft: -10000}}
                                    to={{ opacity: 1, marginLeft: 0}}
                                    >
                                    {props => (
                                            <div style={props}>
                                                <BlogCard 
                                                    id={blog.idx}
                                                    image={blog.image_chunk}
                                                    title={blog.title}
                                                    date={blog.date} 
                                                    blogtext={blog.text} />
                                            </div>
                                        )
                                    }
                                </Spring>
                            )}
                        </VisibilitySensor>
                    )
                ))}
            </Box>
        )
    )
}

Blog.propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.object),
    getBlogs: PropTypes.func,
    error: PropTypes.object,
    loading: PropTypes.bool
}


const mapStateToProps = state => ({
    blogs: state.blogactions.blogs,
    loading: state.blogactions.loading,
    error: state.blogactions.error
})

export default connect(mapStateToProps, { getBlogs })(Blog)




// const stub = [
//     {
//         image: andrea,
//         title: 'Title',
//         blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
//         date: '34/09/2020'
//     },
//     {
//         image: andrea,
//         title: 'Title 90',
//         blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
//         date: '34/09/2020'
//     },
//     {
//         image: andrea,
//         title: 'title 4',
//         blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
//         date: '34/09/2020'
//     },
//     {
//         image: andrea,
//         title: 'this is the title',
//         blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
//         date: '34/09/2020'
//     },
//     {
//         image: andrea,
//         title: 'this is the title',
//         blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
//         date: '34/09/2020'
//     },
// ]
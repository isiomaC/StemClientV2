import React, { useEffect} from 'react'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import PropTypes from 'prop-types'
import { getBlog } from '../../redux/actions/blogactions'
import Spinner from '../../Components/layout/Spinner'
import { Divider, makeStyles } from '@material-ui/core'

import Section from './content/Section'

const useStyles = makeStyles(theme => ({
    inner: {
        width: "100vw",
        height: "60vh",
        // backgroundSize:'cover',
        // backgroundRepeat: 'no-repeat'
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    ImgBg : {
        // background: `url(${logo})`,
        // backgroundSize: 'contain', 
        // backgroundRepeat: 'no-repeat', 
        // backgroundPosition: 'center', 
        // width:"180px",
        // // color: 'rgb(0,0,0)',
        // height:"100px",
        // filter: 'opacity(0.1)  drop-shadow(0 0 0 green)',
        // [theme.breakpoints.down('xs')]: {
        //     width:"134px",
        //     height:"69px",
        // }
    },
    InnerImgBg : {
        // margin: '10px 0px',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '100%',
        // height: '100%', 
        // // backgroundColor: 'rgba(255,255,255, 0.7)'
    },
    title:{
        color: 'rgb(0,0,0)',
        alignItem: 'center'
    }
}))

const ViewBlog = (props) => {

    const { blog, loading, getBlog, error, match } = props
    const classes = useStyles()

    useEffect(() => {
        window.scrollTo(0,0)
        const fetchBlog = async () => {
            await getBlog(match.params.idx)
        }
        fetchBlog()
    }, [getBlog, match])

    if ( error ){
        return (<div style={{

        }}>
            Blog not found 
        </div>)
    }

    return loading === true ? (
        <div style={{ display: 'flex', alignItem: 'center', width: '100vw', height: '80vh'}}>
            <Spinner/>
        </div>
    ) : blog && (
        <Box className={classes.root}>
            {/* <Box className={classes.inner} style={{  background: `url(${blog.images_chunk})` }}/> */}
            <img src={blog.images_chunk} alt="alt text" className={classes.inner}/>
            <Container>
                {/* <img src={logo} width='134px' height='69px'></img> */}
                {/* <div className={classes.ImgBg} >
                    <div className={classes.InnerImgBg}> */}
                        <Typography className={classes.title} variant="h4">{blog.title}</Typography>
                    {/* </div>
                </div> */}
            </Container>
            <Container>
                <Typography variant='body1'> {blog.text}</Typography>
            </Container>
            <Divider/>
            {blog.sections.map((section, i) => (
                i % 2 !== 0 ?
                    <Section section={section} key={i} side="right"/>
                :
                    <Section section={section} key={i} side="left"/>
            ))}
        </Box>
    )
}

ViewBlog.propTypes = {
    blog: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
    getBlog: PropTypes.func
}


const mapStateToProps = state => ({
    blog: state.blogactions.blog,
    loading: state.blogactions.loading,
    error: state.blogactions.error
})

export default connect(mapStateToProps, { getBlog })(ViewBlog);

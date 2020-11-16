import React from 'react'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import '../../../src/index.css'
///styles.css';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';

import BlogCard from './content/BlogCard'
import logo from '../../img/Logo.png'

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import andrea from '../../img/Carousel/andrea.jpeg'

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: '30px',
        display: 'block',
        width: '100vw',
        background: 'rgba(255, 255, 255, 0.9)'
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
}))

const stub = [
    {
        image: andrea,
        title: 'Title',
        blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
        date: '34/09/2020'
    },
    {
        image: andrea,
        title: 'Title 90',
        blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
        date: '34/09/2020'
    },
    {
        image: andrea,
        title: 'title 4',
        blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
        date: '34/09/2020'
    },
    {
        image: andrea,
        title: 'this is the title',
        blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
        date: '34/09/2020'
    },
    {
        image: andrea,
        title: 'this is the title',
        blogtext: 'this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description, this is the description,this is the description, this is the description, this is the description,this is the description',
        date: '34/09/2020'
    },
]

const Blog = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <div style={{ }}>
                <Container style={{ marginTop: '30px'}}>
                    <img src={logo} width='134px' height='69px'></img>
                </Container>
            </div>
        
            <Box >
                <TransitionGroup>
                    {stub.map((blog, i) => (
                        i % 2 ===  0 ?
                        //even
                        (
                            <CSSTransition
                                key={i}
                                timeout={500}
                                classNames="item"
                            >
                                <BlogCard image={blog.image} title={blog.title} date={blog.date} blogtext={blog.blogtext} />
                            </CSSTransition>
                        )
                        :
                        //odd
                        (
                            <CSSTransition
                                key={i}
                                timeout={500}
                                classNames="item"
                            >
                                <BlogCard image={blog.image} title={blog.title} date={blog.date} blogtext={blog.blogtext} />

                            </CSSTransition>
                        )
                    ))}
                </TransitionGroup>
            </Box>
        </Box>
    )
}

export default Blog


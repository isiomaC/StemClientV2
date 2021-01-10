import React, { useState, useEffect, useRef } from 'react'
import { Redirect, Link } from 'react-router-dom'

//UI Components
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import approximatePrice  from '../../../utils/approximatePrice'
import TableDisplay from '../content/TableDisplay'


import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'


//Icons
import Spinner from '../../../Components/layout/Spinner'
import StorefrontIcon from '@material-ui/icons/Storefront';


const useStyles =  makeStyles(theme => ({
    root: {
        display: 'block',
        minHeight: '70vh',
    },
    box: {
        textAlign: "left"
    },
    bold: {
        fontWeight: 'bold',
        marginBottom: 20
        
    },
    orderSummary:{
        display: 'block',
        // justifyContent: 'center'
    },
    orderedRoot: {
        display: 'flex',
        justifyContent:'space-between',
        margin: '15px',
        background:'transparent',
    },
    orderedCover: {
        width: 151
    },
    orderedDetails:{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
    },
    orderedContent: {
        flex: '1 0 auto',
    }
}))

const OrderedItems = ({preview, name, price, quantity}) => {
    const classes = useStyles()
    return (
        <Card className={classes.orderedRoot} >
            <CardMedia
                className={classes.orderedCover}
                image={preview}
                title={name}/>
            <div className={classes.orderedDetails}>
                <CardContent className={classes.orderedContent}>
                    <Typography variant="body1">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {quantity} x  €{approximatePrice(price)} 
                    </Typography>
                </CardContent>
            </div>
        </Card>
    )
}

//remove - shoppingcart, clearCart, 
const ConfirmationPage = ({  auth, outcome, message, activeUser}) => {

    const classes = useStyles()

    const [reply, setReply] = useState(null)

    const [loading, setLoading] = useState(false)

    const apiUrl =  process.env.REACT_APP_API_URL 

    const latestProps = useRef({auth, activeUser});

    useEffect(() => {
      latestProps.current = {auth, activeUser};
    });
   
    useEffect(() => {

        const confirmOrder = async () => {

            const newSession = localStorage.getItem('sId')

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            //GET SESSSIOM TOKEN< STORE IN PREBUILT CHECKOUT
            let res, formData

            const { current } = latestProps
            if (current.auth === null || current.activeUser === null){
                res = "empty"

            }else if (current.auth && current.activeUser){
                formData = {
                    sessionId : newSession
                }

                setLoading(true)
                res = await axios.post(`${apiUrl}/confirm-session`, formData, config) 
                if (res.data){
                    setReply(res.data)
                    setLoading(false)
                    // localStorage.removeItem('sId')
                    localStorage.removeItem('email')
                }
                
            }else if (!current.auth && current.activeUser.msg){
                formData = {
                    sessionId : newSession,
                    email: localStorage.getItem('email')
                }      

                setLoading(true)
                res = await axios.post(`${apiUrl}/confirm-session/guest`, formData, config)
                if (res.data){
                    setReply(res.data)
                    setLoading(false)
                }
            }
        }

        if (outcome && outcome.success){
            confirmOrder()
            setTimeout(() => {
                localStorage.removeItem('sId')
                localStorage.removeItem('email')
            }, 200000) //2min
        }

    }, [auth, activeUser])

    if (!localStorage.getItem('sId')){
        return <Redirect to='/shop'/>
    }

    if (outcome && outcome.cancelled){
        setTimeout(() => {
            localStorage.removeItem('sId')
            localStorage.removeItem('email')
        }, 20000) //20secs

        return (
            <Container style= {{ height: '70vh'}}>
                <Typography style={{ textAlign: 'left'}}variant="h4"> {message} </Typography>
                <Typography style={{ textAlign: 'left'}} variant="body2">  Continue to Shop to browse our collection. </Typography>
                <Button style={{ background: 'rgba(151, 212, 136, 0.6)', marginTop: '30px'}} size="small" variant="contained" endIcon={<StorefrontIcon/>}>
                    <a href='/shop' style={{ textDecoration: 'none', color: 'black'}}> Shop </a>
                </Button>
            </Container>
        )
    }

    if(loading){
        return (
            <Container className={classes.root}>
                <Spinner/>
            </Container> 
        )
    }

    return (reply && reply.success) ?  (
        <Container className={classes.root}>
            <Box className={classes.box}>
              {/* <CheckCircleIcon/> */}
              <Typography variant='h5' className={classes.bold}>
                    {message}
              </Typography>
                { 
                    reply.emailed && 
                    <Typography variant='body1' >
                        Hi <i className={classes.bold}>{reply.customer.email}</i>, your order has been received. We just sent a confirmation to your email address
                    </Typography>
                }
            </Box>
            <br/>
            <Divider/>
            <br/>
            <Box className={classes.box}>
                <Typography>Order Reference: #<b>{reply.orderDetails.reference}</b></Typography>
                <Typography>Order Date: {moment(reply.orderDetails.date).format("DD MMM YYYY")}</Typography>
                <Typography variant='body1'>
                   Estimated Delivery Date:  2 - 5 Business days
                </Typography>
                
            </Box>
            <br/>
            <Divider/>
            <br/>
            <Box className={classes.orderSummary}>
                <Grid container>
                    <Grid  item xs={12} sm={6}>
                        {reply.basket.map((item, index) => (
                            <OrderedItems key={index} preview={item.image} name={item.name} quantity={item.quantity} price={item.price}/>
                        ))}
                    </Grid>
                    <Grid  item xs={12} sm={6}>
                        <Typography variant="h6"> DELIVERY DETAILS</Typography>
                        <Container>
                            <Typography>{reply.customer.firstname + ' ' + reply.customer.lastname}</Typography>
                            <Typography>{reply.shipping.address.line1}</Typography>
                            <Typography>{reply.shipping.address.line2}</Typography>
                            <Typography>{reply.shipping.address.city}</Typography>
                            <Typography>{reply.shipping.address.postal_code + ' ' + reply.shipping.address.state + ' ' + reply.shipping.address.country}</Typography>
                            <Typography style={{ margin: '20px 0px'}}>{reply.customer.phonenumber}</Typography>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    ) : ( (reply && !reply.success) &&
        <Container>
            <Typography>Something went wrong processing the payemnt</Typography>
            <Link to='/shop'> Return to Shop</Link>
        </Container>
    )
}


ConfirmationPage.propTypes = {
    auth: PropTypes.bool,
    message: PropTypes.string,
    outcome: PropTypes.object,
    activeUser: PropTypes.object,
}

export default ConfirmationPage;

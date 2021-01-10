import React, { useEffect } from 'react'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckOutForm from "./content/Unused/CheckOutForm";
// import SplitForm from "./content/Unused/SplitForm";
import PreBuiltCheckOut from "./content/PreBuiltCheckOut";

import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'


const promise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 50,
        [theme.breakpoints.up('md')]:{
            height: '70vh'
        }
    }
}))

const Checkout = () => {
    const classes = useStyles()

    useEffect(() => {
        window.scrollTo(0,0)
        
    }, [])
    
    return (
        <Box className={ classes.root }>
            <Elements stripe={promise}>
                <PreBuiltCheckOut/>
            </Elements>
        </Box>
    )
}


export default Checkout
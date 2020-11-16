import React from 'react'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckOutForm from "./content/Unused/CheckOutForm";
// import SplitForm from "./content/Unused/SplitForm";
import PreBuiltCheckOut from "./content/PreBuiltCheckOut";

import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const promise = loadStripe("pk_test_51He63RBlvQTC5cs5dWw0Rjj9VM5oXCEe7Y0FDRdpdYWoSWhoTLHHEgpIIg9QFfeEsGUxvO7QDUK021ZS2T5sU1Vl00yEbNl8rh");

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 50
    }
}))

const Checkout = () => {
    const classes = useStyles()
    return (
        <Box className={ classes.root }>
            <Elements stripe={promise}>
                <PreBuiltCheckOut/>
            </Elements>
        </Box>
    )
}


export default Checkout
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import { useStripe } from "@stripe/react-stripe-js";
import axios from 'axios'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { clearCart } from '../../../redux/actions/shoppingcart'
import { makeStyles } from '@material-ui/core/styles'

//Contents
import ValidateEmail  from "../utils/ValidateEmail";

//Steps
import ViewCartStep  from "../steps/ViewCartStep";
import ShippingStep from '../steps/ShippingStep';
import ReviewDetailsStep from '../steps/ReviewDetailsStep'

import { Container } from "@material-ui/core";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import infinity from '../../../img/InFiniC.png'
import bgLogo from '../../../img/Logo.png'


const useStyles = makeStyles(theme => ({
    item: {
        display: 'flex',
    }, 
    divider: {
        marginLeft: '20px',
        [theme.breakpoints.down("sm")]:{
            marginBottom: '10px',
        }
    },
    instructions:{

    },
    stepper: {
        background: 'transparent',
        // color: 'rgb(0,255,0)'
    }, 
    icon: {
        background: 'red'
    }
}))

const PreBuiltCheckOut = ({user, isAuthenticated, clearCart, shoppingcart}) => {

    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false)
    const stripe = useStripe();

    const apiUrl ="https://inphinityapi.herokuapp.com/api"
    const localHost ="http://localhost:5000/api"

    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        console.log('[QUERY_LOCATION]', window.location.query)

        if (query.get("success")) {
            ( async () =>
                await clearCart()
            )()
            setMessage("Order placed! You will receive an email confirmation.");
        }
        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }

        const getRelatedProducts = async () => {
            try{
                //sample query values = ["Hair", "Accessories","Body"]
                const categoryNames = shoppingcart.items.map(item => item.category)
                const excludeIds = shoppingcart.items.map(item => item.product_idx)

                let uniq = a => [...new Set(a)];
                let query = uniq(categoryNames)

                const res = await axios.get(`${localHost}/products?filter={"category_names": ${JSON.stringify(query)}, "excludeIds": ${JSON.stringify(excludeIds)}}`)
                if (res.data){
                    setSimilarProducts(similarProducts => [...res.data])
                }
            }catch(e){
                console.log(e.message)
            }
        }
        (async () =>
            await getRelatedProducts()
        )()
    }, []);

    const Message = ({ message }) => (
        <section>
          <p>{message}</p>
        </section>
    );

    const handleChange = (e) => {
        setError(false)
    }

    const handleClick = async (event) => {
        // event.preventDefault()
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            let userEmail
            const lineitems = shoppingcart.items.map(cart => ({ 
                    product: cart.product_idx.toString(), 
                    quantity: cart.quantity.toString()
                })
            )

            console.log(lineitems)
            if (isAuthenticated && user) {
                userEmail = user.email
            }else{
                if (ValidateEmail(shoppingcart.shippingAddress.email) === false){
                    setError(true)
                    return
                }else{
                    userEmail = shoppingcart.shippingAddress.email
                }
            }

            const formData = { 
                email: userEmail,
                items: lineitems
            }

             console.log(formData)
            let response
            if (isAuthenticated){
                response = await axios.post(`${localHost}/create-session`, formData, config) 
            }else{
                response = await axios.post(`${localHost}/create-session/guest`, formData, config)
            }

            const session = response.data;

            //When the customer clicks on the button, redirect them to Checkout.
            const result = await stripe.redirectToCheckout({
              sessionId: session.id,
            });
        
            if (result.error) {
                //redirect failed - do something
                console.log(result.error.message)
            }
        }catch(e){
            console.log(e)
        }
    };

    // console.log(localStorage.getItem("Curr"))
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const getSteps =()=> {
        return ['View Cart', 'Shipping Address', 'Review Details'];
    }
    const steps = getSteps();

    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return (<ViewCartStep shoppingcart={shoppingcart}
                        similarProducts={similarProducts} user={user} 
                        isAuthenticated={isAuthenticated} 
                        error={error} 
                        handleChange ={handleChange}
                        handleClick={handleClick}/>
                    );
          case 1:
            return (<ShippingStep user={user}/>)
          case 2:
            return (
                <>
                    <Typography variant="h5">Review Details</Typography>
                    <ReviewDetailsStep user={user} 
                        isAuthenticated={isAuthenticated} 
                        error={error}
                        handleChange ={handleChange}
                        handleClick={handleClick}/>
                </>
            );
        }
    }
      /////////////////////////////////////////////////////////
      const totalSteps = () => {
        return steps.length;
      };
    
      const completedSteps = () => {
        return Object.keys(completed).length;
      };
    
      const isLastStep = () => {
        return activeStep === totalSteps() - 1;
      };
    
      const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
      };
    
      const handleNext = () => {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStep = (step) => () => {
        setActiveStep(step);
      };
    
      const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;

        //save address to db
        setCompleted(newCompleted);
        
        handleNext();
      };
      /////////////////////////////////////////////////////////
    
    return message ? (
        <Message message={message} />
    ) : (<div>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label, index) => (
                <Step style={{ color: 'blue'}} key={label}>
                    <StepButton 
                        onClick={handleStep(index)} 
                        completed={completed[index]}>
                        {label}
                    </StepButton>
                </Step>
                ))}
            </Stepper>
            <Container>
                {allStepsCompleted() ? (
                        <div>
                            <Typography className={classes.instructions}>
                                Review cart item and submit to stripe
                            </Typography>
                        </div>
                     ) : ( 
                        <Box>
                            {getStepContent(activeStep)}
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Button variant="contained" color="primary" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Next
                                </Button>
                            </div>
                        </Box>
                    )
                }
            </Container>
        </div>
    );
}

PreBuiltCheckOut.propTypes = {
    user: PropTypes.object,
    shoppingcart: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    clearCart: PropTypes.func
}

const mapStateToProps = state => ({
    user : state.auth.user,
    shoppingcart : state.shoppingcart,
    isAuthenticated : state.auth.isAuthenticated
})


export default connect(mapStateToProps, {clearCart})(PreBuiltCheckOut);




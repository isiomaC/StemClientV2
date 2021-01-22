import React, { useState, useEffect } from "react";

import { useStripe } from "@stripe/react-stripe-js";
import axios from 'axios'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { clearCart, getDetails } from '../../../redux/actions/shoppingcart'
import { makeStyles } from '@material-ui/core/styles'

//Contents
import ValidateEmail  from "../utils/ValidateEmail";

//Steps
import ViewCartStep  from "../steps/ViewCartStep";
import ShippingStep from '../steps/ShippingStep';
import ReviewDetailsStep from '../steps/ReviewDetailsStep'
import ConfirmationPage from '../steps/ConfirmationPage'

import { Container } from "@material-ui/core";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { encrypt } from '../../../utils/cryptoWrapper'


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
    },
    message: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

const PreBuiltCheckOut = ({user, isAuthenticated, clearCart, getDetails, shoppingcart}) => {

    const classes = useStyles();

    const [message, setMessage] = useState("");
    const [outcome, setOutcome] = useState(null)

    const [error, setError] = useState(false)
    const [chkError, setchkError] = useState(false)
    const stripe = useStripe();
  
    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {
        
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        // setMessage('Testing this component')
        if (query.get("success")) {
            setOutcome({"success": query.get("success")})
            setMessage("IT'S ORDERED!!!");
        }

        if (query.get("canceled")) {
            setOutcome({"cancelled": query.get("canceled")})
            setMessage("Order Canceled!!");
        }

        const getRelatedProducts = async () => {
            try{
                //sample query values = ["Hair", "Accessories","Body"]
                const categoryNames = shoppingcart.items.map(item => item.category)
                const excludeIds = shoppingcart.items.map(item => item.product_idx)

                let uniq = a => [...new Set(a)];
                let query = uniq(categoryNames)

                const res = await axios.get(`${process.env.REACT_APP_API_URL}/products?filter={"category_names": ${JSON.stringify(query)}, "excludeIds": ${JSON.stringify(excludeIds)}}`)
                if (res.data){
                    setSimilarProducts(similarProducts => [...res.data])
                }
            }catch(e){
                setSimilarProducts([])
            }
        }
        
        if (user && user.email){
            getDetails()
        }
     
        (async () => {
                await getRelatedProducts()
                
                // if (isAuthenticated) {
                //     await getDetails()
                // }
            }
        )()
    }, [shoppingcart, user, getDetails]);

    // const Message = ({ message }) => (
    //     <section className={classes.message}>
    //       <p>{message}</p>
    //     </section>
    // );

    const handleChange = (e) => {
        setError(false)
    }

    const handleCheckOut = async (event) => {
        // event.preventDefault()
        
        const apiUrl = process.env.REACT_APP_API_URL 
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
                items: lineitems,
                details: shoppingcart.shippingAddress
            }

            let response

            if (isAuthenticated){
                response = await axios.post(`${apiUrl}/create-session`, formData, config) 
            }else{
                response = await axios.post(`${apiUrl}/create-session/guest`, formData, config)
            }

            const session = response.data;

            const encryptedSession = encrypt(session.id)
           
            localStorage.setItem('sId', encryptedSession)

            localStorage.setItem('email', shoppingcart.shippingAddress.email)

            await clearCart();

            // When the customer clicks on the button, redirect them to Checkout.
            const result = await stripe.redirectToCheckout({
              sessionId: session.id,
            });
        
            if (result.error) {
                //redirect failed - do something
                setchkError(result.error.message)
            }
        }catch(e){
            setchkError(e.message)
        }
    };

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const getSteps =()=> {
        return ['View Cart', 'Your Details', 'Review Order'];
    }

    const steps = getSteps();

    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return (<ViewCartStep shoppingcart={shoppingcart}
                        similarProducts={similarProducts}
                       />
                    );
          case 1:
            return (<ShippingStep user={user} getDetails={getDetails}/>)
          case 2:
            return (
                <>
                    <Typography variant="h5" style={{ marginBottom: '15px'}}>Review Details</Typography>
                    <ReviewDetailsStep user={user} 
                        error={error}
                        cart={shoppingcart}
                        handleChange ={handleChange}
                        checkOutError={chkError}
                        handleClick={handleCheckOut}/>
                </>
            );
          default:
              return (<ViewCartStep shoppingcart={shoppingcart}
                similarProducts={similarProducts} user={user} 
                isAuthenticated={isAuthenticated} 
                error={error} 
                handleChange ={handleChange}
                handleClick={handleCheckOut}/>)
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
        // handleComplete()
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
        <>
         <ConfirmationPage 
            auth={isAuthenticated}
            outcome={outcome} 
            message={message} 
            activeUser={user} />
        </>
        
    ) : ( <div>
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
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    disabled={activeStep === 0} 
                                    onClick={handleBack} 
                                    className={classes.button}>
                                    Back
                                </Button>
                                {/* {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption" className={classes.completed}>
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                        </Button>
                                ))} */}
                                <Button
                                    disabled={activeStep === 1 && shoppingcart.details_complete === false ? true : (activeStep === 2) && true }
                                    // disabled={true}
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
    clearCart: PropTypes.func,
    getDetails: PropTypes.func,
    // saveAddress: PropTypes.func
}

const mapStateToProps = state => ({
    user : state.auth.user,
    shoppingcart : state.shoppingcart,
    isAuthenticated : state.auth.isAuthenticated
})


export default connect(mapStateToProps, {clearCart, getDetails})(PreBuiltCheckOut);




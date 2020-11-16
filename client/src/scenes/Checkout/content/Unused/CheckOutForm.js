import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import axios from 'axios'
import Spinner from '../../../Components/layout/Spinner'

export default function CheckoutForm() {

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [paymentId, setPaymentId] = useState('')
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const formData = { 
        items: [{ id: "14", quantity: 90 }],
        currency: 'eur',
    }

    const fetchData = async () => {
        try{
            const res = await axios.post('/api/create-payment-intent', formData, config)
            console.log(res.data)
            setClientSecret(res.data.clientSecret)
            setPaymentId(res.data.id)
        }catch(error){
            console.log(error)
        }
    }
    fetchData()
        return () => {
            
        }
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
    })

    if (paymentMethod !== null){

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const paymentMethod_id = paymentMethod.paymentMethod.id
        const formData = { 
            intentId: paymentId,
            paymentMethod_Id: paymentMethod_id
        }
        console.log('[PAYMENTMETHOD]', paymentMethod)
        console.log('[PAYMENT]', paymentId)

        try{
            const res = await axios.post('/api/confirm-payment-intent', formData, config)
            setSucceeded(true)
            setProcessing(false);
            console.log('[SUCCESS]', res.data)
        }catch(error){
            setError(`Payment failed ${error.message}`)
            setProcessing(false);
            console.log(error)
        }
    }
  };

  return (

    <form id="payment-form" onSubmit={handleSubmit}>

      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <Spinner/>
          ) : (
            "Pay"
          )}
        </span>
      </button>

      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      { succeeded && (<p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>)}
    </form>
  );
}

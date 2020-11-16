import React, { useMemo, useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import axios from 'axios'


import useResponsiveFontSize from "../useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const SplitForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentId, setPaymentId] = useState('')
  const [succeeded, setSucceeded] = useState(false);
  const options = useOptions();

  useEffect(() => {
       // Create PaymentIntent as soon as the page loads
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const formData = { 
        items: [{ id: "14", quantity: 23 }],
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
          console.log("cleanup")
      }
  }, [])

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    console.log(elements.getElement(CardNumberElement))

    Promise.all(
        [
            await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardNumberElement)
            })
        ]).then(async (paymentMethod) => {

            const paymentMethod_id = paymentMethod[0].paymentMethod.id

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const formData = { 
                intentId: paymentId,
                paymentMethod_Id: paymentMethod_id
            }

            try{
                const res = await axios.post('/api/confirm-payment-intent', formData, config)
                setSucceeded(true)
                console.log('[SUCCESS]', res.data)
            }catch(error){
                console.log(error)
            }
        }).then((error) => {
            if (error){
                console.log(error)
            }
        })
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {succeeded && (<> <div>SUCCEEDED</div></>)}
    </form>
  );
};

export default SplitForm;

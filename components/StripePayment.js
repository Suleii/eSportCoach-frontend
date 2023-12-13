import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe("pk_test_51OMp3uB5PJ0t72PEmVwASiNtiAVzCa2Sd2CG8vQbWAv0VxxCibF4ZsPQryv7hzSWyni9XEeeNtDICtRZmDdhCNEm00jVJzFUnd")

function Stripe() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
      )
}

export default Stripe

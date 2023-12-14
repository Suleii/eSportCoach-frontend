import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


// This is our test public API key.
const stripePromise = loadStripe("pk_test_51OMp3uB5PJ0t72PEmVwASiNtiAVzCa2Sd2CG8vQbWAv0VxxCibF4ZsPQryv7hzSWyni9XEeeNtDICtRZmDdhCNEm00jVJzFUnd");

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  // const [coachId, setCoachId] = useState('')
  // const [sessionType, setSessionType] = useState('')
  const user = useSelector((state) => state.user.value);
  const coachId = '65785516dbc6cc8be9b8003f'; 
  const sessionType = 'oneSession'; 

  // useEffect(() => {
  //   fetch(`http://localhost:3000/coaches/profile/${user}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //     setCoachId(data.profile._id)
  //     setSessionType(data.profile.price)
  //   });
  // }, [])

  // useEffect(() => {
  //   fetch(`http://localhost:3000/coaches/profile/${props.username}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data.profile.price)
  //     setSessionType(data.profile.price)
  //   });
  // }, [])

  useEffect(() => {
    // Create a Checkout Session as soon as we get sessionType and coachID
    fetch(`http://localhost:3000/checkout_session/create-checkout-session?coachId=${coachId}&sessionType=${sessionType}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`http://localhost:3000/checkout_session/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/payment" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:contact@exp.com">contact@exp.com</a>.
        </p>
      </section>
    )
  }

  return null;
}

const PaymentSession = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/payment" element={<CheckoutForm />} />
          <Route path="/paymentReturn" element={<Return />} />
        </Routes>
      </Router>
    </div>
  )
}

export default PaymentSession;
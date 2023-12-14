import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
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
  const [clientSecret, setClientSecret] = useState(''); // Identifiant de session 
  const booking = useSelector((state) => state.booking.value);
  const username = booking.coach
  const sessionType = booking.sessionType;
  


  useEffect(() => {
    // Create a Checkout Session as soon as we get sessionType and coachID
    fetch(`http://localhost:3000/checkout_session/create-checkout-session`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, sessionType }),
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
  const router = useRouter();
  const booking = useSelector((state) => state.booking.value);
  const username = booking.coach

  useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');

      fetch(`http://localhost:3000/checkout_session/session-status?session_id=${sessionId}`)
          .then(res => res.json())
          .then(data => {
              setStatus(data.status);
              setCustomerEmail(data.customer_email);
              if (data.status === 'complete') {
                  createBooking();
              }
          });
  }, []);

  const createBooking = () => {
      const bookingData = {
          game: "NomDuJeu", // Exemple
          username: "UserId", // Exemple, ID de l'utilisateur
          coachUsername: username,
          startDate: new Date(), // Date de début
          endDate: new Date(), // Date de fin
      };

      fetch('http://localhost:3000/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
      })
      .then(response => response.json())
      .then(data => console.log("Booking Created:", data))
      .catch(error => console.error("Booking Error:", error));
  };

  const handleReturnHome = () => router.push('/');

  if (status === 'open') {
      return <p>Le paiement est en cours de traitement...</p>;
  }

  if (status === 'complete') {
      return (
        <div className="flex items-center justify-center min-h-screen">
        <section className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center">
            <h1 className="text-lg font-bold mb-2">Confirmation de Paiement</h1>
            <p>Merci pour votre confiance ! Un email de confirmation a été envoyé à <strong>{customerEmail}</strong>.</p>
            <p className="mt-5">Si vous avez des questions, n'hésitez pas à envoyer un email à <a href="mailto:contact@exp.com">contact@exp.com</a>.</p>
            <button onClick={handleReturnHome} className="mt-5 btn btn-success hover:bg-orange-700 border-none text-white font-bold py-2 px-4 rounded">
                Retour à l'accueil
            </button>
        </section>
    </div>
      );
  }

  return null;
};

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
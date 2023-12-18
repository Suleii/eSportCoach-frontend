import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// This is our test public API key called outside of components to avoid multiple call
const stripePromise = loadStripe(
  "pk_test_51OMp3uB5PJ0t72PEmVwASiNtiAVzCa2Sd2CG8vQbWAv0VxxCibF4ZsPQryv7hzSWyni9XEeeNtDICtRZmDdhCNEm00jVJzFUnd"
);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState(""); // Payment session ID
  const booking = useSelector((state) => state.booking.value);
  const coachName = booking.coach;

  useEffect(() => {
    // Create a Checkout Session as soon as we get coachName
    fetch(`http://localhost:3000/checkout_session/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coachName }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const router = useRouter();
  const booking = useSelector((state) => state.booking.value);
  const user = useSelector((state) => state.user.value);
  const coachName = booking.coach;

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(
      `http://localhost:3000/checkout_session/session-status?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        if (data.status === "complete") {
          createBooking();
        }
      });
  }, []);

  // Create a booking reservation in database
  const createBooking = () => {
    // First fetch to collect coach datas
    fetch(`http://localhost:3000/coaches/profile/${coachName}`)
      .then((res) => res.json())
      .then((coachData) => {
        if (!coachData.result) {
          console.error("Coach data not found");
        }

        // Second fetch to collect user connected datas
        return fetch(`http://localhost:3000/gamers/profile/${user.username}`)
          .then((res) => res.json())
          .then((userData) => {
            if (!userData.result) {
              console.error("User data not found");
            }

            // Booking datas management
            const bookingData = {
              date: booking.date,
              coachUsername: coachData.profile._id,
              game: booking.game,
              username: user.username,
            };

            // Third fetch to create booking in database
            return fetch("http://localhost:3000/bookings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(bookingData),
            });
          })
          .then((response) => response.json())
          .then((bookingData) => {
            console.log("Booking Created:", bookingData);

            // Fourth fetch to create unavailability in database
            return fetch("http://localhost:3000/unavailabilities", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(bookingData),
            });
          })
          .then((response) => response.json())
          .then((unavailabilityData) =>
            console.log("Unavailability Created:", unavailabilityData)
          )
          .catch((error) =>
            console.error("Error in creating booking or unavailability:", error)
          );
      });
  };

  const handleReturnHome = () => router.push("/");

  if (status === "open") {
    return <p>Le paiement est en cours de traitement...</p>;
  }

  if (status === "complete") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <section className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center">
          <h1 className="text-lg font-bold mb-2">Confirmation de Paiement</h1>
          <p>
            Merci pour votre confiance ! Un email de confirmation a été envoyé à{" "}
            <strong>{customerEmail}</strong>.
          </p>
          <p className="mt-5">
            Si vous avez des questions, n'hésitez pas à envoyer un email à{" "}
            <a href="mailto:contact@exp.com">contact@exp.com</a>.
          </p>
          <button
            onClick={handleReturnHome}
            className="mt-5 btn btn-success hover:bg-orange-700 border-none text-white font-bold py-2 px-4 rounded"
          >
            Retour à l'accueil
          </button>
        </section>
      </div>
    );
  }

  return null;
};

export { CheckoutForm, Return };

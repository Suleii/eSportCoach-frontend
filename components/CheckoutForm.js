import React, { useState } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import styles from "../styles/CheckoutForm.module.css"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "black"
		}
	}
}
  

export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const cardElement = elements.getElement(CardNumberElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        })

        if(!error){
            try {
                const {id: paymentMethodId} = paymentMethod
                const response = await axios.post("http://localhost:3000/checkout_session/process_payment", {
                    amount: 10000,
                    paymentMethodId
                })

                if(response.data.success){
                    console.log("Successful Payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            {!success ? 
            <form onSubmit={handleSubmit}>
                <fieldset className={styles.FormGroup}>
                    <div className={styles.FormRow}>
                        <CardNumberElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <fieldset className={styles.FormGroup}>
                    <div className={styles.FormRow}>
                        <CardExpiryElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <fieldset className={styles.FormGroup}>
                    <div className={styles.FormRow}>
                        <CardCvcElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <button className={styles.button}>Pay</button>
            </form>
            :
            <div className={styles.paymentSuccess}>
                <h2>Payment successful</h2>
                <h3 className={styles.thankYou}>Thank you for your purchase</h3>
            </div>
        }
        </>
      )
}
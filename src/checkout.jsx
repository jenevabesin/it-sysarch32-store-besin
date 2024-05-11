import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51PEvNOEoCKfVp71pGchlLLSILQp5clDkfWmBfoh0mvVdoyBfGM6x6AWyd2EchcTruN343g3RrkhPe4MeyLCsyHPj00KmIPxHxC');

const CheckoutButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
    });

    if (response.ok) {
      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Error redirecting to checkout:', result.error);
      }
    } else {
      console.error('Error creating checkout session');
    }
  };

  return (
    <button onClick={handleCheckout}>Checkout</button>
  );
};

export default CheckoutButton;

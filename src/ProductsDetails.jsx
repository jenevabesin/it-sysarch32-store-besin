import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './configs/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PEvNOEoCKfVp71pGchlLLSILQp5clDkfWmBfoh0mvVdoyBfGM6x6AWyd2EchcTruN343g3RrkhPe4MeyLCsyHPj00KmIPxHxC');

const ProductDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(firestore, 'products', productId));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleClick = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName: product.product_name, price: product.price }), // Send product name and price to the backend
      });

      if (response.ok) {
        // If the request is successful, retrieve the session ID from the response
        const session = await response.json();

        // Redirect the user to the Stripe Checkout page using the session ID
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
          // If there is an error during the redirect, display the error message
          setError(result.error.message);
        }
      } else {
        // If there is an error creating the checkout session, display an error message
        setError('Error creating checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }

    const newItem = {
      id: product.id,
      name: product.product_name,
      size: selectedSize,
      price: product.price,
      quantity: quantity,
    };
    addToCart(newItem);
    setSelectedSize('');
    setQuantity(1);
    setError('');
  };

  return (
    <div>
      {product && (
        <div>
          <h1>{product.product_name}</h1>
          <img
            className='product-image'
            src={product.product_image}
            alt={product.product_name}
          />
          <p>{product.product_description}</p>
          <p>Price: ₱{product.price}</p>
          <label>
            Size:
            <select value={selectedSize} onChange={handleSizeChange}>
              <option value="">Select size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>
          <label>
            Quantity:
            <input type="number" value={quantity} min="1" onChange={handleQuantityChange} />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleClick}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Cart = ({ cartItems }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-icon" onClick={toggleCart}>
      <FaShoppingCart />
      {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
      {isCartOpen && cartItems.length > 0 && (
        <div className="cart-dropdown">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';

import HomePage from './Homepage';
import ProductsList from './ProductsList';
import ProductDetails from './ProductsDetails';
import './App.css';
import Cart from './Cart';

const navigateTo = (route) => {
  window.location.href = route;
};

const App = () => {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <Router>
      <div className="app">
      <header>
         <button onClick={() => navigateTo('/')}>Jeneva Store</button>
          <button onClick={() => navigateTo('/products')}>Shop</button>
          
      </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsList addToCart={addToCart} />} />
          <Route path="/products/:productId" element={<ProductDetails addToCart={addToCart} />} />
        </Routes>
        <Cart cartItems={cartItems} />
        
      </div>
    </Router>
  );
};

export default App;

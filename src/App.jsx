import React, { useState } from 'react';
import HomePage from './Homepage';
import ProductsList from './ProductsList';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <header>
        <button onClick={() => handleButtonClick('home')}>Jeneva Store</button>
        <button onClick={() => handleButtonClick('shop')}>Shop</button>
      </header>
      <main>
        {currentPage === 'home' ? <HomePage /> : <ProductsList />}
      </main>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from './configs/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products List</h1>
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}>
              <img src={product.product_image} alt={product.product_name} />
              </Link>
              <h2>{product.product_name}</h2>
              <p>{product.product_description}</p>
              <p>Price: ₱{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;

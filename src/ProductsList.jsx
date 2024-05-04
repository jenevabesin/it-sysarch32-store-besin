import React, { useState, useEffect } from 'react';
import { firestore } from './configs/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.code === 'permission-denied') {
          console.error('Permission denied. Check Firestore security rules.');
        } else {
          console.error('An unexpected error occurred while fetching products.');
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.product_image && <img src={product.product_image} alt={product.product_name} style={{ maxWidth: '200px' }} />}
            <h2>{product.product_name}</h2>
            <p>{product.product_description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;

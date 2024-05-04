import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './configs/firebase-config';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await firestore.collection('products').doc(productId).get();
        if (productDoc.exists) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          console.log('Product not found!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.product_name}</h1>
          <p>{product.product_description}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;

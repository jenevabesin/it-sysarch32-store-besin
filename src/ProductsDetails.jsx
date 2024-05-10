import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './configs/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import Cart from './Cart';

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
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

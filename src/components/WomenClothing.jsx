import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import PropTypes from 'prop-types';

function WomenClothing({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/womens-dresses')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: quantity }));
  };

  return (
    <div>
      <h1 className={styles.title}>Women's Clothing</h1>
      <div className={styles.productList}>
        {products.map(product => (
          <div key={product.id} className={styles.productItem}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productPrice}>${product.price}</p>
            <img className={styles.productImage} src={product.thumbnail} alt={product.title} />
            <input
              type="number"
              min="1"
              value={quantities[product.id] || 1}
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
              className={styles.quantityInput}
            />
            <button className={styles.addToCartButton} onClick={() => addToCart(product, quantities[product.id] || 1)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

WomenClothing.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default WomenClothing;

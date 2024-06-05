import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import PropTypes from 'prop-types';

function MenClothing(addToCart) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/mens-shirts')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Men's Clothing</h1>
      <div className={styles.productList}>
        {products.map(product => (
          <div key={product.id} className={styles.productItem}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productPrice}>${product.price}</p>
            <img className={styles.productImage} src={product.thumbnail} alt={product.title} />
            <button className={styles.addToCartButton} onClick={()=> addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenClothing;

MenClothing.propTypes = {
  addToCart: PropTypes.func.isRequired
};

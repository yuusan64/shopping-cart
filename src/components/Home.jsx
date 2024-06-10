import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.css';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const urls = [
        'https://dummyjson.com/products/category/mens-shirts',
        'https://dummyjson.com/products/category/womens-dresses',
      ];

      const promises = urls.map(url => fetch(url).then(response => response.json()));
      const results = await Promise.all(promises);
      
      const combinedProducts = results.flatMap(result => result.products);
      setProducts(combinedProducts);
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: quantity }));
  };

  return (
    <div>
      <div className={styles.productList}>
        {products.map((product, index) => (
          <div key={`${product.id}-${index}`} className={styles.productItem}>
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
            <button
              className={styles.addToCartButton}
              onClick={() => addToCart(product, quantities[product.id] || 1)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default Home;

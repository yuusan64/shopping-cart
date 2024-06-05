import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import PropTypes from 'prop-types';

function Home({addToCart}) {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1 className={styles.title}>Clothing Store</h1>
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

Home.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default Home;

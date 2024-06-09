import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import '/src/App.css';
import cart from '/src/assets/cart.png';
import logo from '/src/assets/logo.png';
import PropTypes from 'prop-types';

export default function Layout({ cartItemCount }) {
  return (
    <div>
      <div className={styles.title}>
        <img src={logo} className={styles.logo} alt='Logo'/>
        <h1>Style Hub</h1>
      </div>
      <nav className={styles.navbar}>
        <div>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/men" className={styles.navLink}>Men's Clothing</Link>
          <Link to="/women" className={styles.navLink}>Women's Clothing</Link>
        </div>
        <div className={styles.cartContainer}>
          <Link to="/cart" className={styles.navLink}>
            <img src={cart} className={styles.cart} alt="Cart" />
          </Link>
          <div className={styles.metric}>{cartItemCount}</div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

Layout.propTypes = {
  cartItemCount: PropTypes.number.isRequired
};

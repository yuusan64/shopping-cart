import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cart.module.css';

export default function Cart({ cartItems, updateCartQuantity, removeFromCart }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <h1 className={styles.title}>Cart</h1>
      <div>
        {cartItems.length === 0 ? (
          <p className={styles.emptyMessage}>Your cart is empty :(</p>
        ) : (
          <div>
            <ul className={styles.cartList}>
              {cartItems.map((item, index) => (
                <li key={index} className={styles.cartItem}>
                  <h2>{item.title}</h2>
                  <p>${item.price} x {item.quantity}</p>
                  <img src={item.thumbnail} alt={item.title} />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                    className={styles.quantityInput}
                  />
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>Remove</button>
                </li>
              ))}
            </ul>
            <h2 className={styles.totalPrice}>Total: ${calculateTotal()}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  updateCartQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

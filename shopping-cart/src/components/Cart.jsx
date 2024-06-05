import React from "react";
import PropTypes from 'prop-types';

export default function Cart({cartItems}){

    return(
        <div>
            <h1>Cart</h1>
            <div>
              {cartItems.length === 0? (
                <p>Your cart is empty</p>
              ): (
            <ul>
                {cartItems.map((item, index)=>(
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>${item.price}</p>
                        <img src={item.thumbnail} alt={item.title}/>
                    </li>
                ))}
            </ul>
              )}
            </div>
        </div>
    )
}

Cart.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            thumbnail: PropTypes.string.isRequired
          })
        ).isRequired
      };
      
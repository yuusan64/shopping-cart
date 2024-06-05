import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MenClothing from './components/MenClothing';
import WomenClothing from './components/WomenClothing';
import Cart from './components/Cart';
import Layout from './components/Layout';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout cartItemCount={cartItems.length} />}>
          <Route index element={<Home addToCart={addToCart} />} />
          <Route path="men" element={<MenClothing addToCart={addToCart} />} />
          <Route path="women" element={<WomenClothing addToCart={addToCart} />} />
          <Route path="cart" element={<Cart cartItems={cartItems} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

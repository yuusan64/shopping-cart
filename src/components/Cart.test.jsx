import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import { describe, expect, test, vi } from 'vitest';

const mockUpdateCartQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();

const cartItems = [
  { id: 1, title: 'Product 1', price: 10.0, thumbnail: 'https://via.placeholder.com/150', quantity: 1 },
  { id: 2, title: 'Product 2', price: 20.0, thumbnail: 'https://via.placeholder.com/150', quantity: 2 },
];

describe('Cart component', () => {
  test('renders cart items and allows update and remove', () => {
    render(
      <Cart cartItems={cartItems} updateCartQuantity={mockUpdateCartQuantity} removeFromCart={mockRemoveFromCart} />
    );

    // Check if cart items are rendered
    const product1 = screen.getByText(/Product 1/i);
    const product2 = screen.getByText(/Product 2/i);
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();

    // Check correct total price
    const total = screen.getByText(/Total: \$50.00/i);
    expect(total).toBeInTheDocument();

    // Check updating quantity works
    const quantityInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(quantityInput, { target: { value: '3' } });
    expect(mockUpdateCartQuantity).toHaveBeenCalledWith(1, 3);

    // Check if removing item works
    const removeButton = screen.getAllByText(/Remove/i)[0];
    fireEvent.click(removeButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });
});

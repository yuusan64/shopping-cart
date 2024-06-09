
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const mockAddToCart = vi.fn();

describe('Home component', () => {
  beforeEach(() => {
    // Mock fetch response
    globalThis.fetch = vi.fn((url) =>
      Promise.resolve({
        json: () =>
          Promise.resolve(
            url.includes('mens-shirts')
              ? { products: [{ id: '1', title: 'Product 1', price: 10.0, thumbnail: 'https://via.placeholder.com/150' }] }
              : { products: [{ id: '2', title: 'Product 2', price: 20.0, thumbnail: 'https://via.placeholder.com/150' }] }
          ),
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders products and allows adding to cart', async () => {
    render(<Home addToCart={mockAddToCart} />);

    // Check that products are rendered
    const product1 = await screen.findByText('Product 1');
    const product2 = await screen.findByText('Product 2');
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();

    // Check that quantity input and add to cart button work
    const quantityInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(quantityInputs[0], { target: { value: '2' } });
    expect(quantityInputs[0].value).toBe('2');

    const addButtons = screen.getAllByText(/Add to Cart/i);
    fireEvent.click(addButtons[0]);

    // Check if addToCart was called with correct arguments
    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(
        { id: '1', title: 'Product 1', price: 10.0, thumbnail: 'https://via.placeholder.com/150' },
        2
      );
    });
  });
});

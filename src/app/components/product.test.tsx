import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './product';

describe('Product =>', () => {
    const product = {
            id: 123,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 129.9,
            description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: 'men\'s clothing',
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
            rating: { rate: 4.6, count: 237 },
        };


    it('renders basic fields (title, price, description, category, image)', () => {
        render(<ProductCard product={product} />);

        const productTitle = screen.queryByTestId('product-title');
        const productDescription = screen.queryByTestId('product-description');
        const productPrice = screen.queryByTestId('product-price');
        const productRating = screen.queryByTestId('product-rating');

        expect(productTitle).toHaveTextContent('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptop');
        expect(productDescription).toHaveTextContent('Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday');
        expect(productPrice).toHaveTextContent('$129.9');
        expect(productRating).toHaveTextContent('4.6(237)');
    });

    it('calls onAddToCart with the product when clicking the button', () => {
        const onAddToCart = jest.fn();
        render(<ProductCard product={product} onAddToCart={onAddToCart} />);

        const button = screen.getByRole('button', {
            name: 'Add Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops to cart for $129.90',
        });
        fireEvent.click(button);

        expect(onAddToCart).toHaveBeenCalledTimes(1);
        expect(onAddToCart).toHaveBeenCalledWith(product);
    });
});

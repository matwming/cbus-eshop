import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorScreen } from './error';

describe('ErrorScreen =>', () => {
    it('renders title and message with correct attribute and text', () => {
        //Arrange
        const retry = jest.fn();

        //Act
        render(<ErrorScreen retry={retry} />);

        //Assert
        expect(screen.getByRole('main')).toBeInTheDocument();
        const alertSection = screen.getByRole('alert');
        expect(alertSection).toBeInTheDocument();
        expect(alertSection).toHaveAttribute('aria-live', 'polite');

        const title = screen.getByTestId('error-title');
        expect(title).toHaveTextContent(/something went wrong/i);

        expect(screen.getByTestId('error-message')).toHaveTextContent(
            /an unexpected error occurred/i
        );
    });

    it('clicking "Try again" calls retry', () => {
        //Arrange
        const retry = jest.fn();

        //Act
        render(<ErrorScreen retry={retry} />);

        //Assert
        const tryAgain = within(screen.getByTestId('try-again-button')).getByRole('button', {
            name: /try again/i,
        });

        fireEvent.click(tryAgain);
        expect(retry).toHaveBeenCalledTimes(1);
    });

    it('home link points to "/" and is focusable', () => {
        //Arrange
        const retry = jest.fn();

        //Act
        render(<ErrorScreen retry={retry} />);

        const home = screen.getByRole('link', { name: /home/i });

        //Assert
        expect(home).toHaveAttribute('href', '/');

        home.focus();
        expect(home).toHaveFocus();
    });

    it('support info section is present', () => {
        //Arrange
        const retry = jest.fn();

        //Act
        render(<ErrorScreen retry={retry} />);

        const support = screen.getByTestId('contact-support');

        //Assert
        expect(support).toBeInTheDocument();
        expect(within(support).getByText(/contact support/i)).toBeInTheDocument();
    });
});

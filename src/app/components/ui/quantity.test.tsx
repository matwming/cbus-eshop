import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Quantity } from './quantity';
import {renderWithJotaiProvider} from "../../../../jest.setup";
import {cartAtom} from "@/app/components/states";

jest.mock('lucide-react', () => ({
    Minus: (props: any) => <svg data-testid="minus-icon" {...props} />,
    Plus: (props: any) => <svg data-testid="plus-icon" {...props} />,
}));

const getDecBtn = () =>
    screen.getByRole('button', { name: /decrease quantity/i });
const getIncBtn = () =>
    screen.getByRole('button', { name: /increase quantity/i });

describe('Quantity', () => {
    describe('when initial state has the given product', () => {
        beforeEach(() => {
            const states =[
                [cartAtom, new Map([[1, { quantity: 1 }]])]
            ];
            renderWithJotaiProvider(<Quantity productId={1}/>, states);
        });
        it('renders initial quantity from cart state', () => {

            expect(screen.getByText('1')).toBeInTheDocument();

            expect(getDecBtn()).toBeInTheDocument();
            expect(getIncBtn()).toBeInTheDocument();
        });

        it('focuses the Increase button on mount (accessibility)', async () => {
            const inc = getIncBtn();
            await waitFor(() => {
                expect(inc).toHaveFocus();
            });
        });

        it('increments quantity when Increase is clicked', () => {

            expect(screen.getByText('1')).toBeInTheDocument();

            fireEvent.click(getIncBtn());
            expect(screen.getByText('2')).toBeInTheDocument();

            fireEvent.click(getIncBtn());
            expect(screen.getByText('3')).toBeInTheDocument();
        });

        it('decrements quantity and never goes below 0', () => {

            fireEvent.click(getDecBtn());
            expect(screen.getByText('0')).toBeInTheDocument();

            fireEvent.click(getDecBtn());
            expect(screen.getByText('0')).toBeInTheDocument();

            fireEvent.click(getDecBtn());
            expect(screen.getByText('0')).toBeInTheDocument();
        });
        it('has the icon elements rendered (smoke test)', () => {
            expect(screen.getByTestId('minus-icon')).toBeInTheDocument();
            expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
        });
    });

    it('works when the product not in cart initially', () => {
        const states =[
            [cartAtom, new Map([[2, { quantity: 1 }]])]
        ];

        renderWithJotaiProvider(<Quantity productId={1} />, states);

        expect(screen.getByText('0')).toBeInTheDocument();

        fireEvent.click(getIncBtn());
        expect(screen.getByText('1')).toBeInTheDocument();

        fireEvent.click(getDecBtn());
        expect(screen.getByText('0')).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from './rating';

jest.mock('./stars', () => ({
    Stars: ({ className = '' }: { className?: string }) => (
        <div data-testid="stars" className={className}>★</div>
    ),
}));

describe('Rating', () => {
    it('renders with default outOf=5 and accessible label', () => {
        render(<Rating rate={3.2} count={17} />);

        expect(
            screen.getByLabelText('Rating 3.2 of 5')
        ).toBeInTheDocument();

        expect(screen.getByText('3.2')).toBeInTheDocument();

        expect(screen.getByText('(17)')).toBeInTheDocument();
    });

    it('supports custom outOf and computes correct percentage width', () => {
        const { container } = render(<Rating rate={7.5} outOf={10} count={42} />);
        expect(screen.getByLabelText('Rating 7.5 of 10')).toBeInTheDocument();

        const overlay = container.querySelector('[aria-hidden="true"]') as HTMLElement;
        expect(overlay).toHaveStyle({ width: '75%' });

        expect(screen.getByText('7.5')).toBeInTheDocument();
        expect(screen.getByText('(42)')).toBeInTheDocument();
    });
});

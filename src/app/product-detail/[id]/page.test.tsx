import { server } from "@/mocks/node";
import { rest } from "msw";
import { screen, waitFor } from "@testing-library/react";
import ProductDetail from "./page";
import { renderWithProviders } from "../../../../jest.setup";

// Mock next/navigation
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
    useParams: jest.fn(() => ({ id: '1' })),
    useRouter: () => ({ back: mockBack }),
}));

describe('ProductDetail Page', () => {
    beforeEach(() => {
        mockBack.mockClear();
    });

    it('should render the skeleton if loading', async () => {
        // Arrange
        server.use(
            rest.get('https://fakestoreapi.com/products/1', async (req, res, ctx) => {
                return res(ctx.delay('infinite'));
            })
        );

        // Act
        renderWithProviders(<ProductDetail />);

        // Assert
        expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
    });

    it('should render the error screen if the product api returns 500', async () => {
        // Arrange
        server.use(
            rest.get('https://fakestoreapi.com/products/1', async (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        // Act
        renderWithProviders(<ProductDetail />);

        // Assert
        await waitFor(() => {
            const title = screen.getByTestId('error-title');
            expect(title).toHaveTextContent(/something went wrong/i);

            expect(screen.getByTestId('error-message')).toHaveTextContent(
                /an unexpected error occurred/i
            );
        });
    });

    it('should render the product detail if the product api is successful', async () => {
        // Arrange
        server.use(
            rest.get('https://fakestoreapi.com/products/1', async (req, res, ctx) => {
                return res(
                    ctx.json({
                        id: 1,
                        title: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance',
                        price: 109,
                        description: '3D NAND flash are applied to deliver high transfer speeds',
                        category: 'electronics',
                        image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
                        rating: { rate: 4.8, count: 319 },
                    })
                );
            })
        );

        // Act
        renderWithProviders(<ProductDetail />);

        // Assert
        await waitFor(() => {
            const title = screen.getByTestId('product-title');
            expect(title).toHaveTextContent(
                /Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance/i
            );
        });

        expect(screen.getByTestId('product-category')).toHaveTextContent('electronics');
        expect(screen.getByTestId('description')).toHaveTextContent(
            /3D NAND flash are applied to deliver high transfer speeds/i
        );
        expect(screen.getByTestId('rating')).toHaveTextContent('4.8');
        expect(screen.getByTestId('rating')).toHaveTextContent('(319)');
    });

    it('should render back button', async () => {
        // Arrange
        server.use(
            rest.get('https://fakestoreapi.com/products/1', async (req, res, ctx) => {
                return res(
                    ctx.json({
                        id: 1,
                        title: 'Test Product',
                        price: 99.99,
                        description: 'Test description',
                        category: 'electronics',
                        image: 'https://fakestoreapi.com/img/test.jpg',
                        rating: { rate: 4.5, count: 100 },
                    })
                );
            })
        );

        // Act
        renderWithProviders(<ProductDetail />);

        // Assert
        await waitFor(() => {
            const backButton = screen.getByTestId('back-button');
            expect(backButton).toBeInTheDocument();
            expect(backButton).toHaveAccessibleName(/go back/i);
        });
    });

    it('should not render cart when cart is empty', async () => {
        // Arrange
        server.use(
            rest.get('https://fakestoreapi.com/products/1', async (req, res, ctx) => {
                return res(
                    ctx.json({
                        id: 1,
                        title: 'Test Product',
                        price: 99.99,
                        description: 'Test description',
                        category: 'electronics',
                        image: 'https://fakestoreapi.com/img/test.jpg',
                        rating: { rate: 4.5, count: 100 },
                    })
                );
            })
        );

        // Act
        renderWithProviders(<ProductDetail />);

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId('product-title')).toBeInTheDocument();
        });

        expect(screen.queryByText('Your Cart')).not.toBeInTheDocument();
    });

    it('should render add to cart section', async () => {
        // Arrange
        server.use(
            rest.get('https://fakestoreapi.com/products/1', async (req, res, ctx) => {
                return res(
                    ctx.json({
                        id: 1,
                        title: 'Test Product',
                        price: 99.99,
                        description: 'Test description',
                        category: 'electronics',
                        image: 'https://fakestoreapi.com/img/test.jpg',
                        rating: { rate: 4.5, count: 100 },
                    })
                );
            })
        );

        // Act
        renderWithProviders(<ProductDetail />);

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();
        });
    });
});

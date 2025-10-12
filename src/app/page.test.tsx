import {server} from "@/mocks/node";
import {rest} from "msw";
import {screen, waitFor} from "@testing-library/react";
import Page from "./page";
import {renderWithProviders} from "../../jest.setup";

describe('Page', () => {
    it('should render the skeleton if loading', async () => {
        //Arrange
        server.use(rest.get('/products', async (req, res, ctx) => {
            return res(ctx.delay('infinite'))
        }))

        //Act
        renderWithProviders(<Page />);

        //Assert
        expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
    });

    it('should render the error screen if the products api return 500', async () => {
        //Arrange
        server.use(rest.get('/products', async (req, res, ctx) => {
            return res(ctx.status(500))
        }))

        //Act
        renderWithProviders(<Page />);

        //Assert
        await waitFor(()=>{
            const title = screen.getByTestId('error-title');
            expect(title).toHaveTextContent(/something went wrong/i);

            expect(screen.getByTestId('error-message')).toHaveTextContent(
                /an unexpected error occurred/i
            );
        });
    })
});

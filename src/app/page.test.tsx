import { server } from "@/mocks/node";
import { rest } from "msw";
import { screen, waitFor } from "@testing-library/react";
import Page from "./page";
import { renderWithJotaiProvider } from "../../jest.setup";
import { selectCategoryAtom } from "@/app/components/states";

describe("Page", () => {
  it("should render the skeleton if loading", async () => {
    //Arrange
    server.use(
      rest.get("https://fakestoreapi.com/products", async (req, res, ctx) => {
        return res(ctx.delay("infinite"));
      }),
    );

    //Act
    renderWithJotaiProvider(<Page />);

    //Assert
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
  });

  it("should render the error screen if the products api return 500", async () => {
    //Arrange
    server.use(
      rest.get("https://fakestoreapi.com/products", async (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    //Act
    renderWithJotaiProvider(<Page />);

    //Assert
    await waitFor(() => {
      const title = screen.getByTestId("error-title");
      expect(title).toHaveTextContent(/something went wrong/i);

      expect(screen.getByTestId("error-message")).toHaveTextContent(
        /an unexpected error occurred/i,
      );
    });
  });

  it("should render the product list if the products api is successful", async () => {
    //Arrange
    server.use(
      rest.get("https://fakestoreapi.com/products", async (req, res, ctx) => {
        return res(
          ctx.json([
            {
              id: 123,
              title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
              price: 129.9,
              description:
                "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
              category: "men's clothing",
              image:
                "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
              rating: { rate: 4.6, count: 237 },
            },
          ]),
        );
      }),
    );

    //Act
    renderWithJotaiProvider(<Page />);

    //Assert
    await waitFor(() => {
      const title = screen.getByTestId("product-title");
      expect(title).toHaveTextContent(
        /Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i,
      );
    });
  });

  describe("Filter product", () => {
    it("should render the filtered product list if the selected category matches", async () => {
      //Arrange
      server.use(
        rest.get("https://fakestoreapi.com/products", async (req, res, ctx) => {
          return res(
            ctx.json([
              {
                id: 123,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 129.9,
                description:
                  "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                category: "men's clothing",
                image:
                  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
                rating: { rate: 4.6, count: 237 },
              },
            ]),
          );
        }),
      );

      const states = [[selectCategoryAtom, "men's clothing"]];
      //Act
      renderWithJotaiProvider(<Page />, states);

      //Assert
      await waitFor(() => {
        const title = screen.getByTestId("product-title");
        expect(title).toHaveTextContent(
          /Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i,
        );
      });
    });

    it("should not render the product list if the selected category does not match", async () => {
      //Arrange
      server.use(
        rest.get("https://fakestoreapi.com/products", async (req, res, ctx) => {
          return res(
            ctx.json([
              {
                id: 123,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 129.9,
                description:
                  "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                category: "men's clothing",
                image:
                  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
                rating: { rate: 4.6, count: 237 },
              },
            ]),
          );
        }),
      );

      const states = [[selectCategoryAtom, "electronics"]];
      //Act
      renderWithJotaiProvider(<Page />, states);

      //Assert
      await waitFor(() => {
        const title = screen.getByTestId("product-list");
        expect(title).not.toHaveTextContent(
          /Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i,
        );
      });
    });
  });
});

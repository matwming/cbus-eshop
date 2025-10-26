import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { cartAtom } from "@/app/components/states";
import { Cart } from "./cart";
import { renderWithJotaiProvider } from "../../../../jest.setup";
import type { CartItem } from "@/app/components/types";

jest.mock("@/app/components/ui/productButtons", () => ({
  ProductButtons: ({ product }: { product: CartItem }) => (
    <div
      data-testid="product-buttons"
      data-id={product?.id}
      data-title={product?.title}
      data-qty={product?.quantity}
    />
  ),
}));

const p1 = {
  id: 1,
  title: "Cool Gadget",
  price: 19.99,
  quantity: 2,
  image: "https://img.local/gadget.png",
} as CartItem;

const p2 = {
  id: 2,
  title: "Nice Ring",
  price: 100,
  quantity: 1,
  image: "https://img.local/ring.png",
} as CartItem;

describe("Cart", () => {
  it("shows empty state and $0.00 subtotal when cart is empty", () => {
    //Arrange
    const emptyCart = [[cartAtom, new Map([])]];

    //Act
    renderWithJotaiProvider(<Cart />, emptyCart);

    //Assert
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByTestId("total-price")).toHaveTextContent("$0.00");
  });

  it("renders a single item with title, unit price, per-item total, image alt/src, and ProductButtons", () => {
    //Arrange
    const cart = [[cartAtom, new Map([[p1.id, p1]])]];
    //Act
    renderWithJotaiProvider(<Cart />, cart);

    //Assert
    expect(screen.getByText("Cool Gadget")).toBeInTheDocument();

    // Image alt/src
    const img = screen.getByRole("img", {
      name: "Cool Gadget",
    }) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(p1.image);

    expect(screen.getByTestId("unit-1-price")).toHaveTextContent("$19.99");
    expect(screen.getByTestId("total-1-price")).toHaveTextContent("$39.98");

    // ProductButtons gets correct product
    const pb = screen.getByTestId("product-buttons");
    expect(pb).toHaveAttribute("data-id", "1");
    expect(pb).toHaveAttribute("data-title", "Cool Gadget");
    expect(pb).toHaveAttribute("data-qty", "2");

    expect(screen.getByTestId("total-price")).toHaveTextContent("$39.98");
  });

  it("renders multiple items and computes subtotal correctly", () => {
    //Arrange
    const cart = [
      [
        cartAtom,
        new Map([
          [p1.id, p1],
          [p2.id, p2],
        ]),
      ],
    ];
    //Act
    renderWithJotaiProvider(<Cart />, cart);

    //Assert
    expect(screen.getByText("Cool Gadget")).toBeInTheDocument();
    expect(screen.getByText("Nice Ring")).toBeInTheDocument();

    expect(screen.getByTestId("unit-1-price")).toHaveTextContent("$19.99");
    expect(screen.getByTestId("unit-2-price")).toHaveTextContent("$100.00");

    // Subtotal price
    expect(screen.getByTestId("total-1-price")).toHaveTextContent("$39.98");
    expect(screen.getByTestId("total-2-price")).toHaveTextContent("$100.00");
    // Total price
    expect(screen.getByTestId("total-price")).toHaveTextContent("$139.98");

    // ProductButtons markers for each product
    const pbs = screen.getAllByTestId("product-buttons");
    const ids = pbs.map((el) => el.getAttribute("data-id"));
    expect(ids).toEqual(expect.arrayContaining(["1", "2"]));
  });

  it("clears the cart and resets subtotal when clicking Clear", () => {
    //Arrange
    const cart = [
      [
        cartAtom,
        new Map([
          [p1.id, p1],
          [p2.id, p2],
        ]),
      ],
    ];
    //Act
    renderWithJotaiProvider(<Cart />, cart);

    //Assert
    expect(screen.getByTestId("total-price")).toHaveTextContent("$139.98");

    fireEvent.click(screen.getByRole("button", { name: /clear/i }));

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByTestId("total-price")).toHaveTextContent("$0.00");
  });
});

import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { cartAtom } from "@/app/components/states";
import { ProductButtons } from "./productButtons";
import { renderWithJotaiProvider } from "../../../../jest.setup";
import { Product } from "@/app/components/types";

jest.mock("lucide-react", () => ({
  ShoppingCart: (p: any) => <svg data-testid="cart-icon" {...p} />,
}));

jest.mock("@/app/components/ui/quantity", () => ({
  Quantity: ({ productId }: { productId: number }) => (
    <div data-testid="quantity" data-productid={productId} />
  ),
}));

export const sampleProduct: Product = {
  id: 1,
  title: "Cool Gadget",
  price: 19.99,
  category: "electronics",
  description:
    "A compact multi-purpose gadget with long battery life and fast USB-C charging. Includes carry pouch.",
  image: "",
  rating: { rate: 4.3, count: 127 },
  quantity: 1,
};

describe("ProductButtons", () => {
  it("shows Add to cart when product not in cart and has correct aria-label", () => {
    //Arrange
    const states = [[cartAtom, new Map([[2, { quantity: 1 }]])]];

    //Act
    renderWithJotaiProvider(<ProductButtons product={sampleProduct} />, states);

    //Assert
    const button = screen.getByRole("button", {
      name: /add cool gadget to cart for \$19\.99/i,
    });
    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId("quantity")).not.toBeInTheDocument();
  });

  it("clicking Add to cart adds item to cart (qty 1) and swaps to <Quantity>", () => {
    //Arrange
    const states = [[cartAtom, new Map([[2, { quantity: 1 }]])]];

    //Act
    renderWithJotaiProvider(<ProductButtons product={sampleProduct} />, states);

    //Assert
    const button = screen.getByRole("button", {
      name: /add cool gadget to cart/i,
    });
    fireEvent.click(button);

    // UI swapped to Quantity (button disappears)
    expect(
      screen.queryByRole("button", { name: /add cool gadget to cart/i }),
    ).not.toBeInTheDocument();
    const qty = screen.getByTestId("quantity");
    expect(qty).toBeInTheDocument();
    expect(qty).toHaveAttribute("data-productid", String(sampleProduct.id));
  });

  it("renders <Quantity> immediately when product already in cart", () => {
    //Arrange
    const states = [[cartAtom, new Map([[1, { quantity: 1 }]])]];

    //Act
    renderWithJotaiProvider(<ProductButtons product={sampleProduct} />, states);

    //Assert
    const qty = screen.getByTestId("quantity");
    expect(qty).toBeInTheDocument();
    expect(qty).toHaveAttribute("data-productid", String(sampleProduct.id));

    expect(
      screen.queryByRole("button", { name: /add cool gadget to cart/i }),
    ).not.toBeInTheDocument();
  });
});

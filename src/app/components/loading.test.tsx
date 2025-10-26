import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductListSkeleton } from "./loading";

describe("ProductListSkeleton", () => {
  it("renders a polite status live region with sr-only text: Loading products", () => {
    render(<ProductListSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
  });

  it("renders default 10 product cards in the loading skeleton", () => {
    render(<ProductListSkeleton />);
    const cards = screen.queryAllByTestId("product-card");
    expect(cards.length).toBe(10);
  });
});

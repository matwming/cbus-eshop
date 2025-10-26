import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductDetailsPage } from "./productDetail";

const backMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: backMock }),
}));

const product = {
  id: 11,
  title:
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
  price: 109,
  description:
    "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance...",
  category: "electronics",
  image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
  rating: { rate: 4.8, count: 319 },
};

describe("<ProductDetailsPage />", () => {
  beforeEach(() => {
    backMock.mockClear();
  });

  it("renders header: back button, category, and title", () => {
    render(<ProductDetailsPage product={product} />);

    const backBtn = screen.getByTestId("back-button");
    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toHaveAccessibleName(/go back/i);

    expect(screen.getByTestId("product-category")).toHaveTextContent(
      "electronics",
    );

    const title = screen.getByTestId("product-title");
    expect(title).toHaveTextContent(
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    );

    expect(screen.getByTestId("rating")).toHaveTextContent("4.8(319)");

    const descSection = screen.getByTestId("description");
    expect(descSection).toHaveTextContent(
      /3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance.../i,
    );
  });

  it("fires router.back() when clicking Back", () => {
    render(<ProductDetailsPage product={product} />);
    fireEvent.click(screen.getByTestId("back-button"));
    expect(backMock).toHaveBeenCalledTimes(1);
  });
});

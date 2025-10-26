import React from "react";
import { render } from "@testing-library/react";
import { Stars } from "./stars";

describe("Stars", () => {
  it("renders exactly 5 star svgs", () => {
    const { container } = render(<Stars />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(5);
  });

  it("wraps stars in a flex container and has given className", () => {
    const { container } = render(<Stars className="text-yellow-500" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("flex");
    expect(wrapper).toHaveClass("text-yellow-500");
  });

  it("marks stars aria-hidden so they are not exposed to screen readers", () => {
    const { container } = render(<Stars />);
    const svgs = Array.from(container.querySelectorAll("svg"));
    svgs.forEach((svg) => {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });
});

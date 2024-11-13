import { render, screen } from "@testing-library/react";
import { NotFound } from ".";

const renderComponent = () => {
  render(<NotFound />);
};

describe("<NotFound />", () => {
  it("should render", () => {
    renderComponent();

    const errorNum = screen.getByText("404");

    expect(errorNum).toBeInTheDocument();
  });
});

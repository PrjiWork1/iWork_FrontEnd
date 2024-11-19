import { render, screen } from "@testing-library/react";
import { AdminHome } from ".";

const renderComponent = () => {
  render(<AdminHome />);
};

describe("<AdminHome />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("Seja bem-vindo à área administrativa!");

    expect(text).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { PaymentFailurePage } from ".";
import { MemoryRouter } from "react-router-dom";

const renderComponent = () => {
  render(
    <MemoryRouter>
      <PaymentFailurePage />
    </MemoryRouter>
  );
};

describe("<PaymentFailurePage />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("Falha ao realizar a compra.");

    expect(text).toBeInTheDocument();
  });
});

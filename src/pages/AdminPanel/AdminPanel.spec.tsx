import { render, screen } from "@testing-library/react";
import { AdminPanel } from ".";
import { MemoryRouter } from "react-router-dom";

const renderComponent = () => {
  render(
    <MemoryRouter>
      <AdminPanel />
    </MemoryRouter>
  );
};

describe("<AdminPanel />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("iWORK");

    expect(text).toBeInTheDocument();
  });
});

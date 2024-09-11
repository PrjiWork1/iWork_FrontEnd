import { render, screen } from "@testing-library/react";
import { Header } from ".";
import { MemoryRouter } from "react-router-dom";

const renderComponent = () => {
    render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    )
}

describe("<Header />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("iWORK");

    expect(text).toBeInTheDocument();
  });
});

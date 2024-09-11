import { render, screen } from "@testing-library/react";
import { Footer } from ".";
import { MemoryRouter } from "react-router-dom";

const renderComponent = () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    )
}

describe("<Footer />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText(/iWORK 2024/i);

    expect(text).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { Ad } from ".";
import { BrowserRouter } from "react-router-dom";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Ad />
    </BrowserRouter>
  );
};

describe("<Ad />", () => {
  it("should render", () => {
    renderComponent();

    const adBanner = screen.getByTestId("ad-banner");

    expect(adBanner).toBeInTheDocument();
  });
});

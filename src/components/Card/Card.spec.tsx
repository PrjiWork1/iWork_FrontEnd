import { render, screen } from "@testing-library/react";
import { Card } from ".";
import { Advertisement } from "types/Advertisement";
import { mockedAd, mockedAd2 } from "@utils/test/mockedData";

const renderComponent = (ad: Advertisement) => {
  render(<Card advertisement={ad} />);
};

describe("<Card />", () => {
  it("should render", () => {
    renderComponent(mockedAd);

    const adTitle = screen.getByText(/Anúncio Mock/i);

    expect(adTitle).toBeInTheDocument();
  });

  it("should render priceRange in dynamic Ad", () => {
    renderComponent(mockedAd2);

    const priceRange = screen.getByText("R$ 100 - R$ 200");

    expect(priceRange).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { ItemsSection } from ".";
import { Advertisement } from "types/Advertisement";
import { AdProvider } from "@context/AdContext";

const renderComponent = (ads: Advertisement[]) => {
  render(
    <AdProvider>
      <ItemsSection ads={ads} />
    </AdProvider>
  );
};

describe("<ItemsSection />", () => {
  it("should render", () => {
    renderComponent([]);

    const loadingText = screen.getByText(/Carregando Anúncios.../i);

    expect(loadingText).toBeInTheDocument();
  });
});

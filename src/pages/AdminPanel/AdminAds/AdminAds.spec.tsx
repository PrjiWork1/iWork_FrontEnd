import { render, screen } from "@testing-library/react";
import { AdContext } from "@context/AdContext";
import { mockedContextData } from "@utils/test/mockedData";
import { AdminAds } from ".";

const AdContextProviderMock = ({ children }: { children: React.ReactNode }) => (
  <AdContext.Provider value={mockedContextData}>{children}</AdContext.Provider>
);

const renderComponent = () => {
  render(<AdminAds />);
};

describe("<AdminAds />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("Carregando Anúncios...");

    expect(text).toBeInTheDocument();
  });

  it("should display ads", () => {
    render(
      <AdContextProviderMock>
        <AdminAds />
      </AdContextProviderMock>
    );

    const firstAdTitle = screen.getByText("Anúncio Mock");

    expect(firstAdTitle).toBeInTheDocument();
  });

  it("should not display any ads if advertisements is empty", () => {
    render(
      <AdContext.Provider
        value={{ ...mockedContextData, advertisements: [], isLoading: false }}
      >
        <AdminAds />
      </AdContext.Provider>
    );

    const noAdsWereFoundText = screen.getByText(
      "Nenhum anúncio em análise foi encontrado."
    );

    expect(noAdsWereFoundText).toBeInTheDocument();
  });
});

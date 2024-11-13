import { render, screen, waitFor } from "@testing-library/react";
import { ItemsSection } from ".";
import { AdContext } from "@context/AdContext";
import { mockedAds, mockedContextData } from "@utils/test/mockedData";
import { BrowserRouter } from "react-router-dom";

// Mock do AdContext para passar o contexto com dados predefinidos
const AdContextProviderMock = ({ children }: { children: React.ReactNode }) => (
  <AdContext.Provider value={mockedContextData}>{children}</AdContext.Provider>
);

describe("<ItemsSection />", () => {
  it("should render", () => {
    render(
      <AdContext.Provider value={{ ...mockedContextData, isLoading: true }}>
        <ItemsSection ads={[]} />
      </AdContext.Provider>
    );

    const loadingText = screen.getByText(/Carregando Anúncios.../i);

    expect(loadingText).toBeInTheDocument();
  });

  it("should display ads", async () => {
    render(
      <BrowserRouter>
        <AdContextProviderMock>
          <ItemsSection ads={mockedAds} />
        </AdContextProviderMock>
      </BrowserRouter>
    );

    await waitFor(() => {
      mockedAds.forEach((ad) => {
        expect(screen.getByText(ad.title)).toBeInTheDocument();
      });
    });
  });

  it("should display an error message when there is no ads to show", () => {
    render(
      <AdContextProviderMock>
        <ItemsSection ads={[]} />
      </AdContextProviderMock>
    );

    const loadingText = screen.getByText(/Nenhum anúncio foi encontrado./i);

    expect(loadingText).toBeInTheDocument();
  });
});

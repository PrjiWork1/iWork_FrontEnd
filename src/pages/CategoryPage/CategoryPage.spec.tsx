import { render, screen } from "@testing-library/react";
import { AdContext } from "@context/AdContext";
import { mockedAds, mockedContextData } from "@utils/test/mockedData";

import { BrowserRouter } from "react-router-dom";
import { CategoryPage } from ".";

const AdContextProviderMock = ({ children }: { children: React.ReactNode }) => (
  <AdContext.Provider value={mockedContextData}>{children}</AdContext.Provider>
);

// Mock para window.scrollTo
beforeAll(() => {
  window.scrollTo = jest.fn();
});

// Silencia os erros de console (console.error) antes de todos os testes
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

// Restaura todos os mocks depois de todos os testes
afterAll(() => {
  jest.restoreAllMocks();
});

// Mock do useParams para definir o parâmetro de URL `name`
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ name: "Desenvolvimento_Web" }),
}));

const renderComponent = () => {
  render(
    <BrowserRouter>
      <AdContextProviderMock>
        <CategoryPage />
      </AdContextProviderMock>
    </BrowserRouter>
  );
};

describe("<CategoryPage />", () => {
  it("should render", () => {
    renderComponent();
    const categoryText = screen.getByText(/Categoria/i);
    expect(categoryText).toBeInTheDocument();
  });

  it("should display only ads in 'Desenvolvimento Web' category", async () => {
    render(
      <BrowserRouter>
        <AdContext.Provider
          value={{
            ...mockedContextData,
            advertisements: mockedAds,
            isLoading: false,
          }}
        >
          <CategoryPage />
        </AdContext.Provider>
      </BrowserRouter>
    );

    const adTitle = screen.getByText(/Anúncio Mock/i);
    expect(adTitle).toBeInTheDocument();

    // Anúncio que tem outra categoria
    const anotherAdTitle = screen.queryByText(/Anúncio Dinâmico Mock/i);
    expect(anotherAdTitle).not.toBeInTheDocument();
  });
});

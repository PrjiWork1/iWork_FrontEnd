import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Home } from ".";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CategoryPage } from "@pages/CategoryPage";

// Mock do axiosApi para interceptar a chamada de API
jest.mock("@utils/axiosApi");

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

const renderComponent = () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe("<Home />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("Categorias Populares");

    expect(text).toBeInTheDocument();
  });

  it("should go to Category Page 'Desenvolvimento Web' when clicking in its image card", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    const webDesignCategory = screen.getByAltText("Desenvolvimento para Web");

    act(() => {
      fireEvent.click(webDesignCategory);
    });

    await waitFor(() => {
      const loadingAdsText = screen.getByText("Carregando Anúncios...");
      expect(loadingAdsText).toBeInTheDocument();
    });
  });
});

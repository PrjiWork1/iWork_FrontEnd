import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Footer } from ".";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Home } from "@pages/Home";
import { Ad } from "@pages/Ad";

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
      <Footer />
    </MemoryRouter>
  );
};

describe("<Footer />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText(/iWORK 2024/i);

    expect(text).toBeInTheDocument();
  });

  it("should not go to Ad page when clicking in 'Anunciar' ", async () => {
    render(
      <MemoryRouter>
        <Footer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-ad" element={<Ad />} />
        </Routes>
      </MemoryRouter>
    );

    const anunciarText = screen.getByText("Anunciar");

    act(() => {
      fireEvent.click(anunciarText);
    });

    await waitFor(() => {
      const dynamicAdModelText = screen.queryByText(/Dinâmico/i);
      expect(dynamicAdModelText).not.toBeInTheDocument();
    });
  });
});

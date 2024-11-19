import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { AdItem } from ".";
import { AdContext } from "@context/AdContext";
import { mockedContextData } from "@utils/test/mockedData";
import { UserPage } from "@pages/UserPage";

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
  useParams: () => ({ id: "ad-1" }),
}));

const renderComponent = () => {
  render(
    <BrowserRouter>
      <AdContextProviderMock>
        <AdItem />
      </AdContextProviderMock>
    </BrowserRouter>
  );
};

describe("<AdItem />", () => {
  it("should render", () => {
    renderComponent();

    const adUserName = screen.getByText(/Mock Person/i);

    expect(adUserName).toBeInTheDocument();
  });

  it("should go to UserPage when clicking in user icon", async () => {
    render(
      <AdContextProviderMock>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<AdItem />} />
            <Route path="/user/:email" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      </AdContextProviderMock>
    );

    const userIcon = screen.getByTestId("user-link");

    act(() => {
      fireEvent.click(userIcon);
    });

    await waitFor(() => {
      const userName = screen.getByText(/Carregando usuário.../i);
      expect(userName).toBeInTheDocument();
    });
  });
});

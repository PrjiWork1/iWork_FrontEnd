import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Header } from ".";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "@context/UserContext";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";

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
    <UserProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </UserProvider>
  );
};

describe("<Header />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("iWORK");

    expect(text).toBeInTheDocument();
  });

  it("should go to Login page when clicking in User icon", async () => {
    render(
      <UserProvider>
        <MemoryRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </UserProvider>
    );

    const userIcon = screen.getByTestId("userIcon");

    act(() => {
      fireEvent.click(userIcon);
    });

    await waitFor(() => {
      const loginText = screen.getAllByText(/Login/i);
      expect(loginText).toHaveLength(2);
    });
  });
});

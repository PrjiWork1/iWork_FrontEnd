import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Register } from ".";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Login } from "@pages/Login";

const renderComponent = () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
};

describe("<Register />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("Registrar");

    expect(text).toBeInTheDocument();
  });

  it("should display an error message when trying to register", async () => {
    renderComponent();

    const loginButton = screen.getByRole("button", {
      name: "Registrar",
    });

    act(() => {
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      const errorText = screen.getByText("*Você deve informar seu nome.");
      expect(errorText).toBeInTheDocument();
    });
  });

  it("should go to Login Page when clicking in 'Clique aqui para fazer login' button", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const registerButton = screen.getByRole("button", {
      name: "Clique aqui para fazer login",
    });

    act(() => {
      fireEvent.click(registerButton);
    });

    await waitFor(() => {
      const loginText = screen.getByText(/Entrar/i);
      expect(loginText).toBeInTheDocument();
    });
  });
});

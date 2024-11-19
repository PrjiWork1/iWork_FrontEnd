import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Login } from ".";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Register } from "@pages/Register";

const renderComponent = () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
};

describe("<Login />", () => {
  it("should render", () => {
    renderComponent();

    const text = screen.getByText("Entrar");

    expect(text).toBeInTheDocument();
  });

  it("should display an error message when trying to login", async () => {
    renderComponent();

    const loginButton = screen.getByRole("button", {
      name: "Entrar",
    });

    act(() => {
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      const errorText = screen.getByText("*Você deve informar seu email.");
      expect(errorText).toBeInTheDocument();
    });
  });

  it("should go to Register Page when clicking in 'Crie sua conta agora' button", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    const registerButton = screen.getByRole("button", {
      name: "Crie sua conta agora",
    });

    act(() => {
      fireEvent.click(registerButton);
    });

    await waitFor(() => {
      const registerText = screen.getByText(/Registrar/i);
      expect(registerText).toBeInTheDocument();
    });
  });
});

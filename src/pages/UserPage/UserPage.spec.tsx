import { render, screen, waitFor } from "@testing-library/react";
import { UserPage } from ".";
import { AdContext } from "@context/AdContext";
import {
  mockedAds,
  mockedContextData,
  mockedUser,
} from "@utils/test/mockedData";
import axiosApi from "@utils/axiosApi";
import { BrowserRouter } from "react-router-dom";

// Mock do axiosApi para interceptar a chamada de API
jest.mock("@utils/axiosApi");

const AdContextProviderMock = ({ children }: { children: React.ReactNode }) => (
  <AdContext.Provider value={mockedContextData}>{children}</AdContext.Provider>
);

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
    <BrowserRouter>
      <AdContextProviderMock>
        <UserPage />
      </AdContextProviderMock>
    </BrowserRouter>
  );
};

describe("<UserPage />", () => {
  beforeEach(() => {
    // Configura o mock da chamada axiosApi para retornar o usuário simulado
    (axiosApi.get as jest.Mock).mockResolvedValue({ data: mockedUser });
  });

  it("should render", () => {
    renderComponent();
    const loadingUserText = screen.getByText(/Carregando usuário.../i);
    expect(loadingUserText).toBeInTheDocument();
  });

  it("should display User ads", async () => {
    renderComponent();

    // Aguarda a API carregar o usuário e os anúncios
    await waitFor(() => {
      expect(
        screen.queryByText("Carregando usuário...")
      ).not.toBeInTheDocument();
    });

    // Verifica se o nome do usuário aparece na tela
    expect(screen.getByText(mockedUser.completeName)).toBeInTheDocument();

    // Verifica a renderização de cada anúncio
    await waitFor(() => {
      mockedAds.forEach((ad) => {
        expect(screen.getByText(ad.title)).toBeInTheDocument();
      });
    });
  });

  it("should display an error message when user does not have any ads", async () => {
    render(
      <AdContext.Provider
        value={{ ...mockedContextData, advertisements: [], isLoading: false }}
      >
        <UserPage />
      </AdContext.Provider>
    );

    // Aguarda o carregamento do usuário
    await waitFor(() =>
      expect(screen.queryByText("Carregando usuário...")).toBeNull()
    );

    // Verifica se a mensagem de erro é exibida
    expect(
      screen.getByText("Este usuário não possui nenhum anúncio.")
    ).toBeInTheDocument();
  });
});

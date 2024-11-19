import { render, screen } from "@testing-library/react";
import { PaymentSucessPage } from ".";
import { MemoryRouter } from "react-router-dom";

const renderComponent = () => {
  render(
    <MemoryRouter>
      <PaymentSucessPage />
    </MemoryRouter>
  );
};

describe("<PaymentSucessPage />", () => {
  it("should render", () => {
    const purchaseData = {
      items: [],
      description: "Teste",
    };
    sessionStorage.setItem("purchaseServiceData", JSON.stringify(purchaseData));

    renderComponent();

    const text = screen.getByText("Compra realizada com sucesso!");

    expect(text).toBeInTheDocument();
  });

  it("should display items", () => {
    const purchaseData = {
      items: [
        { title: "Ad A", unitprice: 100, id: "1" },
        { title: "Ad B", unitprice: 200, id: "2" },
      ],
      description: "Teste",
    };
    sessionStorage.setItem("purchaseServiceData", JSON.stringify(purchaseData));

    renderComponent();

    const titleAdA = screen.getByText(/Ad A/i);
    const titleAdB = screen.getByText(/Ad B/i);

    expect(titleAdA).toBeInTheDocument();
    expect(titleAdB).toBeInTheDocument();
  });
});

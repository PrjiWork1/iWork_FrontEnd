import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { UserProvider } from "@context/UserContext";
import { AdminAdRow } from ".";
import { Advertisement } from "types/Advertisement";
import { mockedAd, mockedAd2 } from "@utils/test/mockedData";

const renderComponent = (ad: Advertisement) => {
  render(
    <UserProvider>
      <AdminAdRow advertisement={ad} onUpdated={() => jest.fn()} />
    </UserProvider>
  );
};

describe("<AdminAdRow />", () => {
  it("should render", () => {
    renderComponent(mockedAd);

    const adTitle = screen.getByText(/Anúncio Mock/i);

    expect(adTitle).toBeInTheDocument();
  });

  it("should render priceRange in dynamic Ad", () => {
    renderComponent(mockedAd2);

    const priceRange = screen.getByText("R$ 100 - R$ 200");

    expect(priceRange).toBeInTheDocument();
  });

  it("should not show more information by default", async () => {
    renderComponent(mockedAd);

    const planType = screen.queryByText(/Diamante/i);
    expect(planType).not.toBeInTheDocument();
  });

  it("should show more information when clicking on it", async () => {
    renderComponent(mockedAd);

    const adRow = screen.getByTestId("adRow");

    act(() => {
      fireEvent.click(adRow);
    });

    await waitFor(() => {
      const planType = screen.getByText(/Diamante/i);
      expect(planType).toBeInTheDocument();
    });
  });
});

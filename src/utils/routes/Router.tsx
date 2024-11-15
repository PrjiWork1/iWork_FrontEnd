import { createBrowserRouter } from "react-router-dom";
import App from "../../App.tsx";
import { Home } from "@pages/Home/index.tsx";
import { Ad } from "@pages/Ad/index.tsx";
import { Register } from "@pages/Register/index.tsx";
import { Login } from "@pages/Login/index.tsx";
import { NotFound } from "@pages/NotFound/index.tsx";
import { AdProvider } from "@context/AdContext.tsx";
import { AdItem } from "@pages/AdItem/index.tsx";
import { UserProvider } from "@context/UserContext.tsx";
import { PrivateAdminRoute } from "./PrivateAdminRoute.tsx";
import { AdminPanel } from "@pages/AdminPanel/index.tsx";
import { AdminHome } from "@pages/AdminPanel/AdminHome/index.tsx";
import { AdminAds } from "@pages/AdminPanel/AdminAds/index.tsx";
import { UserPage } from "@pages/UserPage/index.tsx";
import { PrivateUserRoute } from "./PrivateUserRote.tsx";
import { CategoryPage } from "@pages/CategoryPage/index.tsx";
import { PaymentSucessPage } from "@pages/PaymentSuccessPage/index.tsx";
import { PaymentFailurePage } from "@pages/PaymentFailurePage/index.tsx";
import { PrivateCheckoutRoute } from "./PrivateCheckoutRoute.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: (
          <AdProvider>
            <UserProvider>
              <Home />
            </UserProvider>
          </AdProvider>
        ),
      },
      {
        path: "/create-ad",
        element: (
          <UserProvider>
            <PrivateUserRoute>
              <Ad />
            </PrivateUserRoute>
          </UserProvider>
        ),
      },
      {
        path: "/ad/:id",
        element: (
          <AdProvider>
            <AdItem />
          </AdProvider>
        ),
      },
      {
        path: "/category/:name",
        element: (
          <AdProvider>
            <CategoryPage />
          </AdProvider>
        ),
      },
    ],
  },
  {
    path: "/adminPanel",
    element: (
      <UserProvider>
        <PrivateAdminRoute>
          <AdminPanel />
        </PrivateAdminRoute>
      </UserProvider>
    ),
    children: [
      { path: "", element: <AdminHome /> },
      {
        path: "adminAds",
        element: (
          <AdProvider>
            <AdminAds />
          </AdProvider>
        ),
      },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/user/:email",
    element: (
      <AdProvider>
        <UserProvider>
          <UserPage />
        </UserProvider>
      </AdProvider>
    ),
  },
  {
    path: "/success",
    element: (
      <PrivateCheckoutRoute>
        <PaymentSucessPage />
      </PrivateCheckoutRoute>
    ),
  },
  {
    path: "/failure",
    element: (
      <PrivateCheckoutRoute>
        <PaymentFailurePage />
      </PrivateCheckoutRoute>
    ),
  },

  { path: "/*", element: <NotFound /> },
]);

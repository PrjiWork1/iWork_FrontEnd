import { createBrowserRouter } from "react-router-dom";
import App from "../../App.tsx";
import { Home } from "@pages/Home/index.tsx";
import { Ad } from "@pages/Ad/index.tsx";
import { Register } from "@pages/Register/index.tsx";
import { Login } from "@pages/Login/index.tsx";
import { NotFound } from "@pages/NotFound/index.tsx";
import { AdProvider } from "@context/AdContext.tsx";
import { AdItem } from "@pages/AdItem/index.tsx";
import { PrivateRoute } from "./PrivateRoute.tsx";
import { UserProvider } from "@context/UserContext.tsx";
import { PrivateAdminRoute } from "./PrivateAdminRoute.tsx";
import { AdminPanel } from "@pages/AdminPanel/index.tsx";
import { AdminHome } from "@pages/AdminPanel/AdminHome/index.tsx";
import { AdminAds } from "@pages/AdminPanel/AdminAds/index.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: (
          <UserProvider>
            <Home />
          </UserProvider>
        ),
      },
      {
        path: "/create-ad",
        element: (
          <PrivateRoute>
            <Ad />
          </PrivateRoute>
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

  { path: "/*", element: <NotFound /> },
]);

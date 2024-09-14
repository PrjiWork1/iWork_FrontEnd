import { createBrowserRouter } from "react-router-dom";
import App from "../../App.tsx";
import { Home } from "../../pages/Home/index.tsx";
import { Register } from "../../pages/Register/index.tsx";
import { Login } from "../../pages/Login/index.tsx";
import { NotFound } from "../../pages/NotFound/index.tsx";
import { Ad } from "../../pages/Ad/index.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ad",
        element: <Ad />,
      },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/*", element: <NotFound /> },
]);

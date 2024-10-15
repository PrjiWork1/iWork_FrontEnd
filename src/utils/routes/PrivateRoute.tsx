import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const userToken = sessionStorage.getItem("token_iWork");

  return userToken ? children : <Navigate to={"/"} />;
}

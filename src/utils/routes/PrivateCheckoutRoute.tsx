import { Navigate } from "react-router-dom";

interface PrivateCheckoutRouteProps {
  children: React.ReactNode;
}

export function PrivateCheckoutRoute({ children }: PrivateCheckoutRouteProps) {
  const data = sessionStorage.getItem("purchaseServiceData");

  return data ? children : <Navigate to="/" />;
}

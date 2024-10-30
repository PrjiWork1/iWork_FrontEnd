import { UserContext } from "@context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface PrivateAdminRouteProps {
  children: React.ReactNode;
}

export function PrivateAdminRoute({ children }: PrivateAdminRouteProps) {
  // const { user } = useContext(UserContext);

  // return user?.role == "Admin" ? children : <Navigate to={"/"} />;
  return true ? children : <Navigate to={"/"} />;
}

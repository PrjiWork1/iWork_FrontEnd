import { UserContext } from "@context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface PrivateAdminRouteProps {
  children: React.ReactNode;
}

export function PrivateAdminRoute({ children }: PrivateAdminRouteProps) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return children;
}

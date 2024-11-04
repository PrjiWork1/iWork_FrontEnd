import { UserContext } from "@context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface PrivateUserRouteProps {
  children: React.ReactNode;
}

export function PrivateUserRoute({ children }: PrivateUserRouteProps) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.role === "Admin") {
    return <Navigate to="/" />;
  }

  return children;
}

import { UserContext } from "@context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface PrivateAdminRouteProps {
  children: React.ReactNode;
}

export function PrivateAdminRoute({ children }: PrivateAdminRouteProps) {
  const { user, loading } = useContext(UserContext);

  // Se ainda está carregando os dados do usuário
  if (loading) {
    return <div>Carregando...</div>; // Exibe um indicador de carregamento
  }

  // Se o usuário não tiver a role ou não for Admin, redireciona
  if (!user || user.role !== "Admin") {
    return <Navigate to="/" />;
  }

  // Se tudo estiver certo, renderiza os filhos
  return children;
}

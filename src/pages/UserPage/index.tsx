import axiosApi from "@utils/axiosApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "types/User";

export function UserPage() {
  const { email } = useParams();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const getUser = async () => {
      let api = "/User/GetUserByEmail";

      try {
        const response = await axiosApi.get(api, {
          params: {
            email: email,
          },
        });
        const data = response.data;

        setUser(data);
      } catch (error) {
        console.error("Erro ao obter o usuário: ", error);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return <div>Carregando usuário...</div>;
  }

  return (
    <div>
      <p>Usuário {user.completeName}</p>
    </div>
  );
}

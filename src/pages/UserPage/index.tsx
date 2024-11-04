import axiosApi from "@utils/axiosApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "types/User";

import userImage from "@assets/user-image.png";
import { ItemsSection } from "@components/ItemsSection";
import { AdProvider } from "@context/AdContext";

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
    <div className="bg-primary-lightgreen flex flex-col font-inter">
      <section className="mt-3 flex border-2 bg-primary-darkgreen border-primary-gray rounded py-4 px-20 self-center">
        <div className="flex flex-col items-center gap-3">
          <img
            src={userImage}
            className="size-24 object-cover"
            alt={user.completeName}
          />
          <p className="text-primary-white font-medium text-xl text-center">
            Usuário <span className="text-primary-yellow">{user.role}</span>
          </p>
          <p className="text-primary-white font-medium text-xl text-center">
            {user.completeName}
          </p>
        </div>
      </section>

      <section className="p-8 h-screen">
        <p className="text-primary-white bg-primary-darkgreen font-medium text-xl text-center">
          Anúncios do Usuário
        </p>
        <AdProvider>
          <ItemsSection title="" userId={user.id} />
        </AdProvider>
      </section>
    </div>
  );
}

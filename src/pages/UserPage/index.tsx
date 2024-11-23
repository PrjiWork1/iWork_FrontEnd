import axiosApi from "@utils/axiosApi";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "types/User";

import userImage from "@assets/user-image.png";
import { ItemsSection } from "@components/ItemsSection";
import { AdContext } from "@context/AdContext";
import { Advertisement } from "types/Advertisement";

export function UserPage() {
  const { email } = useParams();
  const { advertisements } = useContext(AdContext);

  const [user, setUser] = useState<User | undefined>(undefined);
  const [userAds, setUserAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getUserAds();
    }
  }, [user]);

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

      getUserAds();
    } catch (error) {
      console.error("Erro ao obter o usuário: ", error);
    }
  };

  const getUserAds = () => {
    if (advertisements) {
      const ads = advertisements.filter(
        (ad: Advertisement) => ad.userId === user?.id
      );
      setUserAds(ads);
    }
  };

  if (!user) {
    return <div>Carregando usuário...</div>;
  }

  return (
    <div className="bg-primary-white flex flex-col font-inter">
      <section className="mt-3 flex border-2 bg-primary-darkgreen border-primary-gray rounded py-4 px-20 self-center">
        <div className="flex flex-col items-center gap-3">
          <img
            src={userImage}
            className="size-24 object-cover"
            alt={user.completeName}
          />
          <p className="text-primary-yellow font-medium text-xl text-center">
            {user.role == "Admin" ? "Administrador" : "Usuário"}
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
        <ItemsSection
          title=""
          ads={userAds}
          errorMessage="Este usuário não possui nenhum anúncio."
        />
      </section>
    </div>
  );
}

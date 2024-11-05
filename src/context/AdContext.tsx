import axiosApi from "@utils/axiosApi";
import { createContext, useEffect, useState } from "react";
import { Advertisement } from "types/Advertisement";

type ContextProps = {
  children: React.ReactNode;
};

interface AdContextType {
  advertisements: Advertisement[];
  isAdmin: boolean;
  isLoading: boolean;
  setIsAdmin: (value: boolean) => void;
  setUserId: (id: string) => void;
}

export const AdContext = createContext<AdContextType>({
  advertisements: [],
  isAdmin: false,
  isLoading: true,
  setIsAdmin: () => {},
  setUserId: () => "",
});

export const AdProvider = ({ children }: ContextProps) => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let api = "/Advertisement/GetAllAdvertisements";

      try {
        const response = await axiosApi.get(api, {
          params: { isAdmin },
        });

        let data = response.data;

        if (userId) {
          data = data.filter((ad: Advertisement) => ad.userId === userId);
        }

        setAdvertisements(data);
      } catch (error) {
        console.error("Erro ao obter os anúncios: ", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    };

    fetchData();
  }, [isAdmin, userId]);

  return (
    <AdContext.Provider
      value={{ advertisements, isLoading, isAdmin, setIsAdmin, setUserId }}
    >
      {children}
    </AdContext.Provider>
  );
};

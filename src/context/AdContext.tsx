import axiosApi from "@utils/axiosApi";
import { createContext, useEffect, useState } from "react";
import { Advertisement } from "types/Advertisement";

type ContextProps = {
  children: React.ReactNode;
};

interface AdContextType {
  advertisements: Advertisement[];
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

export const AdContext = createContext<AdContextType>({
  advertisements: [],
  isAdmin: false,
  setIsAdmin: () => {},
});

export const AdProvider = ({ children }: ContextProps) => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      let api = "/Advertisement/GetAllAdvertisements";

      try {
        const response = await axiosApi.get(api, {
          params: { isAdmin },
        });
        const data = response.data;

        setAdvertisements(data);
      } catch (error) {
        console.error("Erro ao obter os anúncios: ", error);
      }
    };

    fetchData();
  }, [isAdmin]);

  return (
    <AdContext.Provider value={{ advertisements, isAdmin, setIsAdmin }}>
      {children}
    </AdContext.Provider>
  );
};

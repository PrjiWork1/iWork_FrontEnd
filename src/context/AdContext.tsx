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
  setAdvertisements: (
    value: Advertisement[] | ((prevAds: Advertisement[]) => Advertisement[])
  ) => void;
}

export const AdContext = createContext<AdContextType>({
  advertisements: [],
  isAdmin: false,
  isLoading: true,
  setIsAdmin: () => {},
  setAdvertisements: () => {},
});

export const AdProvider = ({ children }: ContextProps) => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [isAdmin]);

  return (
    <AdContext.Provider
      value={{
        advertisements,
        isLoading,
        isAdmin,
        setIsAdmin,
        setAdvertisements,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

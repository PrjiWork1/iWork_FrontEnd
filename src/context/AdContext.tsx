import axiosApi from "@utils/axiosApi";
import { createContext, useEffect, useState } from "react";
import { Advertisement } from "types/Advertisement";

type ContextProps = {
  children: React.ReactNode;
};

interface AdContextType {
  advertisements: Advertisement[];
}

export const AdContext = createContext<AdContextType>({
  advertisements: [],
});

export const AdProvider = ({ children }: ContextProps) => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let api = "/Advertisement/GetAllAdvertisements";

      try {
        const response = await axiosApi.get(api);
        const data = response.data;

        setAdvertisements(data);
      } catch (error) {
        console.error("Erro ao obter os anúncios: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdContext.Provider value={{ advertisements }}>
      {children}
    </AdContext.Provider>
  );
};

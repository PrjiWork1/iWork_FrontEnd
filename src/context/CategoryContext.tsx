import axiosApi from "@utils/axiosApi";
import { createContext, useEffect, useState } from "react";
import { Category } from "types/Category";

type ContextProps = {
  children: React.ReactNode;
};

interface CategoryContextType {
  categories: Category[];
}

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
});

export const CategoryProvider = ({ children }: ContextProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let api = "/Category";

      try {
        const response = await axiosApi.get(api);
        const data = response.data;
        console.log(data);

        setCategories(data);
      } catch (error) {
        console.error("Erro ao obter as categorias: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

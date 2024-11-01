import axiosApi from "@utils/axiosApi";
import { createContext, useEffect, useState } from "react";
import { User } from "types/User";

type ContextProps = {
  children: React.ReactNode;
};

interface UserContextType {
  user: User | undefined;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: {
    id: "",
    completeName: "",
    email: "",
    isActive: true,
    role: "",
    userName: "",
  },
  loading: true,
});

export const UserProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const email = sessionStorage.getItem("UserEmail_iWork");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

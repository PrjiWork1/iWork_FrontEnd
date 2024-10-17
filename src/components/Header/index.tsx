import { Link } from "react-router-dom";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { HeaderMenu } from "./HeaderMenu";
import { UserProvider } from "@context/UserContext";

export function Header() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  const handleIsUserLogged = () => {
    const token = sessionStorage.getItem("token_iWork");
    setIsUserLogged(!!token);
  };

  useEffect(() => {
    handleIsUserLogged();
  }, []);

  return (
    <div className="font-inter flex flex-row justify-between bg-primary-darkgreen px-5 md:px-10 py-3 items-center ">
      <Link to="/">
        <p className="text-primary-yellow text-3xl font-extrabold mx-3">
          iWORK
        </p>
      </Link>
      {/* <input
        type="search"
        className="w-50 md:w-[40%] px-3 mt-3 md:mt-0 rounded outline-none focus:ring ring-primary-yellow/90 transition"
      /> */}
      <div
        className={`flex flex-row text-center items-center  md:w-[35%] gap-2 md:gap-0 ${
          isUserLogged ? "justify-between" : "justify-end"
        }`}
      >
        {isUserLogged && (
          <p className="text-primary-yellow font-extrabold text-shadow hidden sm:flex">
            iWork PRO
          </p>
        )}
        {isUserLogged && (
          <Link to="/create-ad" className="hidden sm:flex">
            <button className="cursor-pointer bg-primary-gray text-primary-yellow p-2 rounded-xl font-extrabold hover:bg-primary-yellow hover:text-primary-gray transition">
              Anunciar
            </button>
          </Link>
        )}
        {isUserLogged ? (
          <UserProvider>
            <HeaderMenu />
          </UserProvider>
        ) : (
          <Link to="/login">
            <HiMiniUserCircle size={40} color="#FFC700" cursor={"pointer"} />
          </Link>
        )}
      </div>
    </div>
  );
}

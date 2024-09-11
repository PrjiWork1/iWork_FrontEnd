import { Link } from "react-router-dom";
import { HeaderSearchInput } from "./HeaderSearchInput";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useState } from "react";

export function Header() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  const handleIsUserLogged = () => {

  }

  return (
    <div className="font-inter flex flex-col md:flex-row justify-between bg-primary-darkgreen px-10 py-3 items-center">
      <p className="text-primary-yellow text-3xl font-extrabold mx-3">iWORK</p>
      <HeaderSearchInput />
      <div className="flex flex-col md:flex-row text-center mt-3 md:mt-0 items-center justify-around md:w-[30%] gap-2 md:gap-0">
        <p className="text-primary-yellow font-extrabold text-shadow">
          iWork PRO
        </p>
        <button className="cursor-pointer bg-primary-gray text-primary-yellow p-2 rounded-xl font-extrabold hover:bg-primary-yellow hover:text-primary-gray transition">
          Anunciar
        </button>
        {isUserLogged ? (
          <Link to="/user">
            <HiMiniUserCircle size={40} color="#FFC700" />
        </Link>
      ) : (
      <Link to="/login">
          <HiMiniUserCircle size={40} color="#FFC700" />
        </Link>
      )}

      </div>
    </div>
  );
}

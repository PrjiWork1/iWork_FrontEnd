import { Link } from "react-router-dom";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";

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
    <div className="font-inter flex flex-col md:flex-row justify-between bg-primary-darkgreen px-10 py-3 items-center">
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
        className={`flex flex-col md:flex-row text-center mt-3 md:mt-0 items-center  md:w-[30%] gap-2 md:gap-0 ${
          isUserLogged ? "justify-between" : "justify-end"
        }`}
      >
        {isUserLogged && (
          <p className="text-primary-yellow font-extrabold text-shadow">
            iWork PRO
          </p>
        )}
        {isUserLogged && (
          <Link to="/create-ad">
            <button className="cursor-pointer bg-primary-gray text-primary-yellow p-2 rounded-xl font-extrabold hover:bg-primary-yellow hover:text-primary-gray transition">
              Anunciar
            </button>
          </Link>
        )}
        {isUserLogged ? (
          <div className="flex items-center gap-3">
            <Link to="/user">
              <HiMiniUserCircle size={40} color="#FFC700" />
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <HiMiniUserCircle size={40} color="#FFC700" />
          </Link>
        )}
      </div>
    </div>
  );
}

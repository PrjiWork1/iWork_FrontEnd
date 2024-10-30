import { HiMiniUserCircle } from "react-icons/hi2";
import { UserContext } from "@context/UserContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

interface MenuPosition {
  top: number;
}

export function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({ top: 0 });

  const { user } = useContext(UserContext);

  const handleOpenMenu = (e: React.MouseEvent) => {
    setIsMenuOpen((prev) => !prev);

    const target = e.target as HTMLImageElement;

    const profileImageRect = target.getBoundingClientRect();

    const position: MenuPosition = {
      top: profileImageRect.bottom + window.scrollY,
    };

    setMenuPosition(position);
  };

  return (
    <div>
      <HiMiniUserCircle
        size={40}
        color="#FFC700"
        cursor={"pointer"}
        onClick={handleOpenMenu}
      />

      <div
        className={`bg-primary-lightgreen p-4 rounded absolute right-2 z-10 w-40 mt-1 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: menuPosition.top }}
      >
        <div>
          <div className="text-white flex flex-col gap-3">
            <p className="text-primary-black font-medium">
              Logado como <br />
              <span className="font-semibold">{user?.completeName}</span>
            </p>
            <p className="text-primary-yellow font-extrabold text-shadow visible sm:hidden">
              iWork PRO
            </p>
            <div className="border border-primary-darkgray"></div>
            <Link
              to="/create-ad"
              className="visible sm:hidden bg-primary-gray text-primary-yellow p-2 rounded-xl font-extrabold hover:bg-primary-yellow hover:text-primary-gray transition"
            >
              Anunciar
            </Link>

            {user?.role == "Admin" && (
              <Link
                to={"/adminPanel"}
                className="text-primary-black font-medium cursor-pointer"
              >
                Painel Admin
              </Link>
            )}

            <Link
              to={"/user"}
              className="text-primary-black font-medium cursor-pointer"
            >
              Meu perfil
            </Link>

            <Link
              to={"/login"}
              className="text-primary-black font-medium cursor-pointer"
            >
              Sair
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

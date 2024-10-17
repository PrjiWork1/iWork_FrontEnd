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

      {isMenuOpen && (
        <div
          className="bg-primary-lightgreen p-4 rounded absolute right-2 z-10 w-40 mt-1"
          style={{ top: menuPosition.top }}
        >
          <div>
            <div className="text-white flex flex-col gap-3">
              <p className="text-primary-black font-medium">
                Logado como <br />
                <span className="font-semibold">{user?.completeName}</span>
              </p>
              <div className="border border-primary-darkgray"></div>
              <Link
                to={"/user"}
                className="text-primary-black font-medium cursor-pointer"
              >
                Minha conta
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
      )}
    </div>
  );
}

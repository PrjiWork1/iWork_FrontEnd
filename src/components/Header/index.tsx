import { HiMiniUserCircle } from "react-icons/hi2";

export function Header() {
  return (
    <div className="font-inter flex flex-col md:flex-row justify-between bg-primary-darkgreen px-10 py-3 items-center">
      <p className="text-primary-yellow text-3xl font-extrabold mx-3">iWORK</p>
      <input
        type="search"
        className="w-50 md:w-[40%] px-3 mt-3 md:mt-0 rounded outline-none focus:ring ring-primary-yellow/90 transition"
      />
      <div className="flex flex-col md:flex-row text-center mt-3 md:mt-0 items-center justify-around md:w-[30%] gap-2 md:gap-0">
        <p className="text-primary-yellow font-extrabold text-shadow">
          iWork PRO
        </p>
        <button className="cursor-pointer bg-primary-gray text-primary-yellow p-2 rounded-xl font-extrabold hover:bg-primary-yellow hover:text-primary-gray transition">
          Anunciar
        </button>
        <HiMiniUserCircle size={40} color="#FFC700" cursor={"pointer"} />
      </div>
    </div>
  );
}

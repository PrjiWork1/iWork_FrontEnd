import { Link, Outlet } from "react-router-dom";

export function AdminPanel() {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen font-inter">
      <aside className="w-full md:w-1/4 py-4 bg-primary-darkgreen">
        <Link to="/adminPanel">
          <p className="text-primary-yellow text-3xl font-extrabold text-center tracking-wide cursor-pointer">
            iWORK <span className="text-primary-white">Admin</span>
          </p>
        </Link>
        <div className="border-2 border-primary-white mt-4"></div>
        <ul className="flex justify-center md:flex-col md:justify-normal gap-3">
          <li className="text-primary-white text-xl lg:text-2xl font-bold tracking-wide mt-4 md:ml-6 uppercase">
            <Link to="/adminPanel/adminAds">
              <span className="hover:text-primary-yellow cursor-pointer transition">
                Aprovação
              </span>
            </Link>
          </li>
        </ul>
      </aside>
      <section className="w-full h-full">
        <Outlet />
      </section>
    </div>
  );
}

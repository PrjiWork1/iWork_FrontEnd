import { CategoryProvider } from "@context/CategoryContext";
import { AdForm } from "./AdForm";
import { UserProvider } from "@context/UserContext";

import banner from "@assets/Banners/bannerAd.svg";

export function Ad() {
  return (
    <div className="font-inter">
      <img src={banner} alt="ad banner" />
      <section className="md:px-20 px-2 lg:flex lg:justify-center">
        <UserProvider>
          <CategoryProvider>
            <AdForm />
          </CategoryProvider>
        </UserProvider>
      </section>
    </div>
  );
}

import { PopularCategories } from "./PopularCategories";
import { InfoCards } from "./InfoCards";
import { AdProvider } from "@context/AdContext";
import { ItemsSection } from "@components/ItemsSection";

import banner from "@assets/Banners/bannerHome.svg";

export function Home() {
  return (
    <div>
      <AdProvider>
        <div className="font-inter">
          <img src={banner} alt="home banner" />
          <section className="md:px-20">
            <PopularCategories />
            <ItemsSection title="Mais Populares" />
            <ItemsSection title="Em Destaque" />
            <InfoCards />
          </section>
        </div>
      </AdProvider>
    </div>
  );
}

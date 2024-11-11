import { PopularCategories } from "./PopularCategories";
import { AdContext, AdProvider } from "@context/AdContext";
import { ItemsSection } from "@components/ItemsSection";

import banner from "@assets/Banners/bannerHome.svg";
import { useContext, useEffect, useState } from "react";
import { Advertisement } from "types/Advertisement";

export function Home() {
  const { advertisements } = useContext(AdContext);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    getRecentAds();
    getPopularAds();
  }, [advertisements]);

  const [popularAds, setPopularAds] = useState<Advertisement[]>([]);
  const [recentAds, setRecentAds] = useState<Advertisement[]>([]);

  const getPopularAds = () => {
    const ads = advertisements
      .slice()
      .sort(
        (a: Advertisement, b: Advertisement) =>
          b.numberOfSales - a.numberOfSales
      );
    setPopularAds(ads);
  };

  const getRecentAds = () => {
    const ads = advertisements
      .slice()
      .sort(
        (a: Advertisement, b: Advertisement) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    setRecentAds(ads);
  };

  return (
    <div>
      <AdProvider>
        <div className="font-inter">
          <img src={banner} alt="home banner" />
          <section className="md:px-20">
            <PopularCategories />
            <ItemsSection title="Mais Populares" ads={popularAds} />
            <ItemsSection title="Em Destaque" ads={recentAds} />
            {/* <InfoCards /> */}
          </section>
        </div>
      </AdProvider>
    </div>
  );
}

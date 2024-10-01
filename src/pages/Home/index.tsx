import { useEffect } from "react";
import { PopularCategories } from "./PopularCategories";
import { FeaturedItems } from "./FeaturedItems";
import { MostPopularItems } from "./MostPopularItems";
import { InfoCards } from "./InfoCards";

export function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-inter">
      <div className="bg-primary-darkblue text-primary-white font-extrabold text-center py-20 text-3xl">
        Banner Home
      </div>
      <div className="md:px-20">
        <PopularCategories />
        <FeaturedItems />
        <MostPopularItems />
        <InfoCards />
      </div>
    </div>
  );
}

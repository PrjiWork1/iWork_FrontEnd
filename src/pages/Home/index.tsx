import { PopularCategories } from "./PopularCategories";
import { MostPopularItems } from "./MostPopularItems";
import { InfoCards } from "./InfoCards";
import { AdProvider } from "@context/AdContext";
import { FeaturedItems } from "@components/FeaturedItems";

export function Home() {
  return (
    <div>
      <AdProvider>
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
      </AdProvider>
    </div>
  );
}

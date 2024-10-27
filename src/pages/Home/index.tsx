import { PopularCategories } from "./PopularCategories";
import { InfoCards } from "./InfoCards";
import { AdProvider } from "@context/AdContext";
import { ItemsSection } from "@components/ItemsSection";

export function Home() {
  return (
    <div>
      <AdProvider>
        <div className="font-inter">
          <div className="bg-primary-darkblue text-primary-white font-extrabold text-center py-20 text-3xl">
            Banner Home
          </div>
          <section className="md:px-20">
            <PopularCategories />
            <ItemsSection name="Mais Populares" />
            <ItemsSection name="Em Destaque" />
            <InfoCards />
          </section>
        </div>
      </AdProvider>
    </div>
  );
}

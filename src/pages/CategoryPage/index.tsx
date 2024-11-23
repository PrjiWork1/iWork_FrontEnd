import { ItemsSection } from "@components/ItemsSection";
import { AdContext } from "@context/AdContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Advertisement } from "types/Advertisement";

export function CategoryPage() {
  const { name } = useParams();
  const { advertisements } = useContext(AdContext);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    getAdsByCategory();
  }, [advertisements]);

  const [categoryAds, setCategoryAds] = useState<Advertisement[]>([]);

  const category = name ? name.replace(/_/g, " ") : "";

  const getAdsByCategory = () => {
    const ads = advertisements.filter(
      (ad: Advertisement) => ad.categoryDescription === category
    );
    setCategoryAds(ads);
  };

  return (
    <div className="p-8 font-inter mb-10 text-center md:text-start">
      <ItemsSection title={`Categoria ${category}`} ads={categoryAds} />
    </div>
  );
}

import { Card } from "@components/Card";
import { CategoryContext } from "@context/CategoryContext";
import { Advertisement } from "@types/Advertisement";
import { useContext, useEffect, useState } from "react";

export function FeaturedItems() {
  const [adsToShow, setAdsToShow] = useState<Advertisement[]>([]);
  const { categories } = useContext(CategoryContext);

  const setProducts = () => {
    const newData = Object.values(categories).flat().slice(0, 4);
    // setAdsToShow(newData);
  };

  useEffect(() => {
    setProducts();
  }, [categories]);

  return (
    <div className="mb-14">
      <div className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black mb-5 md:text-center lg:text-start md:text-xl text-2xl">
          Em Destaque
        </p>
        <ul className="flex flex-wrap md:justify-center lg:flex-nowrap flex-col gap-4 md:flex-row md:gap-20">
          {adsToShow.map((ad: Advertisement) => (
            <li key={ad.id}>
              <Card advertisement={ad} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

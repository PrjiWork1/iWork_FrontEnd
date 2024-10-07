import { Card } from "@components/Card";
import { CategoryContext } from "@context/CategoryContext";
import { useContext, useEffect, useState } from "react";
import { Advertisement } from "types/Advertisement";

export function FeaturedItems() {
  const [featuredAds, setFeaturedAds] = useState<Advertisement[]>([]);
  const { categories } = useContext(CategoryContext);

  const setAds = () => {
    const newData = Object.values(categories).flat().slice(0, 4);
    const mockedData = [
      { id: "1", title: "teste", userId: "1", price: "10" },
      { id: "2", title: "design", userId: "2", price: "30" },
      { id: "3", title: "site", userId: "3", price: "20" },
    ];
    setFeaturedAds(mockedData);
  };

  useEffect(() => {
    setAds();
  }, [categories]);

  return (
    <div className="mb-14">
      <div className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black mb-5 md:text-center lg:text-start md:text-xl text-2xl">
          Em Destaque
        </p>
        <ul className="flex flex-wrap md:justify-center flex-col gap-4 md:flex-row md:gap-20">
          {featuredAds.map((ad: Advertisement) => (
            <li key={ad.id}>
              <Card advertisement={ad} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

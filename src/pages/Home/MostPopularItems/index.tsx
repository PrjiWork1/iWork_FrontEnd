import { Card } from "@components/Card";
import { useEffect, useState } from "react";
import { Advertisement } from "types/Advertisement";

export function MostPopularItems() {
  const [popularAds, setPopularAds] = useState<Advertisement[]>([]);

  const setAds = () => {
    // const newData = Object.values(categories).flat().slice(0, 4);
    // setAdsToShow(data);
  };

  useEffect(() => {
    setAds();
  }, []);

  return (
    <div className="mb-14">
      <div className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black mb-5 md:text-center lg:text-start md:text-xl text-2xl">
          Mais Populares
        </p>
        <div className="flex flex-wrap md:justify-center flex-col gap-4 md:flex-row md:gap-20">
          {popularAds.map((ad: Advertisement) => (
            <li key={ad.id}>
              <Card advertisement={ad} />
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

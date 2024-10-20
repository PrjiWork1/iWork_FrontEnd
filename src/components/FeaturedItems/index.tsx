import { Card } from "@components/Card";
import { AdContext } from "@context/AdContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Advertisement } from "types/Advertisement";

export function FeaturedItems() {
  const [featuredAds, setFeaturedAds] = useState<Advertisement[]>([]);
  const { advertisements } = useContext(AdContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (advertisements.length > 0) {
      const adsToShow = advertisements.slice(0, 4);
      setFeaturedAds(adsToShow);
      setLoading(false);
    }
  }, [advertisements]);

  return (
    <div className="mb-14">
      <section className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black mb-5 md:text-center lg:text-start md:text-xl text-2xl">
          Em Destaque
        </p>
        {loading ? (
          <p className="text-center text-lg">Carregando...</p>
        ) : (
          <ul className="flex flex-wrap md:justify-center flex-col gap-4 md:flex-row md:gap-20">
            {featuredAds.map((ad: Advertisement) => (
              <Link to={`/ad/${ad.id}`} key={ad.id}>
                <Card advertisement={ad} />
              </Link>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

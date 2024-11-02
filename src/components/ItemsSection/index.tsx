import { Card } from "@components/Card";
import { AdContext } from "@context/AdContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Advertisement } from "types/Advertisement";

type SectionProps = {
  name: string;
};

export function ItemsSection({ name }: SectionProps) {
  const [Ads, setAds] = useState<Advertisement[]>([]);
  const { advertisements, setIsAdmin } = useContext(AdContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsAdmin(false);
    }, 100);
  }, [setIsAdmin]);

  useEffect(() => {
    setTimeout(() => {
      if (advertisements.length > 0) {
        const adsToShow = advertisements.slice(0, 4);
        setAds(adsToShow);
      }
      setLoading(false);
    }, 1000);
  }, [advertisements]);

  return (
    <div className="mb-14">
      <section className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black mb-5 md:text-center lg:text-start md:text-xl text-2xl">
          {name}
        </p>
        {!loading && advertisements.length == 0 && (
          <p className="text-center text-lg">Nenhum anúncio foi encontrado.</p>
        )}
        {loading ? (
          <p className="text-center text-lg">Carregando Anúncios...</p>
        ) : (
          <ul className="flex flex-wrap md:justify-center flex-col gap-4 md:flex-row md:gap-20">
            {Ads.map((ad: Advertisement) => (
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

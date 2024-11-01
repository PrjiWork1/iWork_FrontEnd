import { AdminAdRow } from "@components/AdminAdRow";
import { AdContext } from "@context/AdContext";
import { useContext, useEffect, useState } from "react";
import { Advertisement } from "types/Advertisement";

export function AdminAds() {
  const { advertisements, setIsAdmin } = useContext(AdContext);
  const [Ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsAdmin(true);
    }, 100);
  }, [setIsAdmin]);

  useEffect(() => {
    if (advertisements.length > 0) {
      const adsToShow = advertisements.slice(0, 4);
      setAds(adsToShow);
      setLoading(false);
    }
  }, [advertisements]);

  const handleUpdateAd = (adId: string) => {
    setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
  };

  return (
    <div className="flex flex-col m-6 gap-10">
      {loading ? (
        <p className="text-center text-lg">Carregando...</p>
      ) : (
        <ul>
          {Ads.map((ad: Advertisement) => (
            <li key={ad.id}>
              <AdminAdRow advertisement={ad} onUpdated={handleUpdateAd} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

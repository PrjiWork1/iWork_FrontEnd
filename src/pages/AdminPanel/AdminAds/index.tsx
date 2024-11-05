import { AdminAdRow } from "@components/AdminAdRow";
import { AdContext } from "@context/AdContext";
import { useContext, useEffect } from "react";
import { Advertisement } from "types/Advertisement";

export function AdminAds() {
  const { advertisements, setIsAdmin, isLoading, setAdvertisements } =
    useContext(AdContext);

  useEffect(() => {
    setTimeout(() => {
      setIsAdmin(true);
    }, 100);
  }, []);

  const handleUpdateAd = (adId: string) => {
    setAdvertisements((prevAds) => prevAds.filter((ad) => ad.id !== adId));
  };

  return (
    <div className="flex flex-col m-6 gap-10">
      {!isLoading && advertisements.length == 0 && (
        <p className="text-center text-lg">
          Nenhum anúncio em análise foi encontrado.
        </p>
      )}
      {isLoading ? (
        <p className="text-center text-lg">Carregando Anúncios...</p>
      ) : (
        <ul className="flex flex-col gap-5">
          {advertisements.length > 0 &&
            advertisements.map((ad: Advertisement) => (
              <li key={ad.id}>
                <AdminAdRow advertisement={ad} onUpdated={handleUpdateAd} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

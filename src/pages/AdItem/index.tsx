import { AdContext, AdProvider } from "@context/AdContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Advertisement } from "types/Advertisement";
import { AdTopSection } from "./AdTopSection";
import { AdBottomSection } from "./AdBottomSection";
import { ItemsSection } from "@components/ItemsSection";
import { UserProvider } from "@context/UserContext";

export function AdItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { advertisements } = useContext(AdContext);

  const [ad, setAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (advertisements.length === 0) {
      setLoading(true);
      return;
    }

    const foundAd = advertisements.find((ad) => ad.id.toString() === id);
    setAd(foundAd || null);
    setLoading(false);

    if (!foundAd) {
      navigate("/not-found");
    }
  }, [id, advertisements, navigate]);

  useEffect(() => {
    if (ad) {
      getRelatedAds();
    }
  }, [ad]);

  const [relatedAds, setRelatedAds] = useState<Advertisement[]>([]);

  const getRelatedAds = () => {
    const ads = advertisements.filter(
      (dataAd: Advertisement) => dataAd.categoryId === ad!.categoryId
    );
    setRelatedAds(ads);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {ad && (
        <div className="font-inter">
          <UserProvider>
            <AdTopSection ad={ad} />
          </UserProvider>
          <AdBottomSection ad={ad} />
          <section className="mt-20 px-10">
            <AdProvider>
              <ItemsSection title="Anúncios Relacionados" ads={relatedAds} />
            </AdProvider>
          </section>
        </div>
      )}
    </div>
  );
}

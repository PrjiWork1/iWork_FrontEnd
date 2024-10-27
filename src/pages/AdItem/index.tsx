import { AdContext, AdProvider } from "@context/AdContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Advertisement } from "types/Advertisement";
import { AdTopSection } from "./AdTopSection";
import { AdBottomSection } from "./AdBottomSection";
import { ItemsSection } from "@components/ItemsSection";

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

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {ad && (
        <div className="font-inter">
          <AdTopSection ad={ad} />
          <AdBottomSection ad={ad} />
          <section className="mt-20 px-10">
            <AdProvider>
              <ItemsSection name="Em Destaque" />
            </AdProvider>
          </section>
        </div>
      )}
    </div>
  );
}

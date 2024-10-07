import { AdContext } from "@context/AdContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Advertisement } from "types/Advertisement";

export function AdItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { advertisements } = useContext(AdContext);
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

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
        <div className="font-poppins flex flex-col gap-5">
          <p>{ad.title}</p>
          <p>{ad.id}</p>
          <p>{ad.createdAt}</p>
        </div>
      )}
    </div>
  );
}

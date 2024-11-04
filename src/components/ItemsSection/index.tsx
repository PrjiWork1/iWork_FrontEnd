import { Card } from "@components/Card";
import { AdContext } from "@context/AdContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Advertisement } from "types/Advertisement";

type SectionProps = {
  name: string;
  userId?: string;
};

export function ItemsSection({ name, userId }: SectionProps) {
  const { advertisements, setIsAdmin, setUserId, isLoading } =
    useContext(AdContext);

  useEffect(() => {
    setTimeout(() => {
      setIsAdmin(false);
    }, 100);

    if (userId) {
      setUserId(userId);
    }
  }, []);

  return (
    <div className="mb-14">
      <section className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black mb-5 md:text-center lg:text-start md:text-xl text-2xl">
          {name}
        </p>
        {!isLoading && advertisements.length == 0 && (
          <p className="text-center text-lg">Nenhum anúncio foi encontrado.</p>
        )}
        {isLoading ? (
          <p className="text-center text-lg">Carregando Anúncios...</p>
        ) : (
          <ul className="flex flex-wrap md:justify-center flex-col gap-4 md:flex-row md:gap-20">
            {advertisements.map((ad: Advertisement) => (
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

import { Card } from "@components/Card";
import { AdContext } from "@context/AdContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Advertisement } from "types/Advertisement";

type SectionProps = {
  ads: Advertisement[];
  title?: string;
  errorMessage?: string;
};

export function ItemsSection({
  title,
  ads,
  errorMessage = "Nenhum anúncio foi encontrado.",
}: SectionProps) {
  const { isLoading } = useContext(AdContext);

  return (
    <div className="mb-14">
      <section className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black mb-5 md:text-center lg:text-start md:text-xl text-2xl">
          {title}
        </p>
        {!isLoading && ads.length == 0 && (
          <p className="text-center text-lg">{errorMessage}</p>
        )}
        {isLoading ? (
          <p className="text-center text-lg">Carregando Anúncios...</p>
        ) : (
          <ul className="flex flex-wrap md:justify-center flex-col gap-4 md:flex-row md:gap-20">
            {ads.map((ad: Advertisement) => (
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

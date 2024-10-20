import { Advertisement } from "types/Advertisement";

type AdProps = {
  ad: Advertisement;
};

export function AdTopSection({ ad }: AdProps) {
  const calcAdType = () => {
    const rate = ad.advertisementRate;
    if (rate === 0.13) return "Diamante";
    if (rate === 0.12) return "Ouro";
    if (rate === 0.1) return "Prata";
  };

  return (
    <section className="p-10 flex gap-8 flex-col md:flex-row items-center md:items-stretch">
      <img
        src={ad.urlBanner}
        alt={ad.title}
        className="w-60 h-44 object-cover"
      />
      <div className="flex flex-col justify-around gap-5 md:gap-0 items-center md:items-stretch">
        <div className="flex items-center gap-3">
          <p className="font-bold text-xl">{ad.title}</p>
          <p className="font-medium text-primary-white bg-primary-darkblue rounded px-2">
            {calcAdType()}
          </p>
        </div>
        <p className="text-xl">
          Vendas{" "}
          <span className="bg-primary-darkgreen px-2 rounded text-primary-white">
            0
          </span>
        </p>
        <div className="flex gap-3">
          <p className="text-xl">R$ {ad.price.toFixed(2)}</p>
          <button className="text-lg bg-primary-lightgreen rounded text-primary-white font-medium px-2 hover:bg-primary-darkgreen/90 transition">
            Comprar
          </button>
        </div>
      </div>
    </section>
  );
}

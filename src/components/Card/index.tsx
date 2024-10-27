import { Advertisement } from "types/Advertisement";

type AdCardProps = {
  advertisement: Advertisement;
};

export function Card({ advertisement }: AdCardProps) {
  const prices =
    advertisement.itemAdvertisements?.map((item) => item.price) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const priceRange = prices.length > 0 ? `${minPrice} - R$ ${maxPrice}` : "";
  return (
    <div className="flex flex-col gap-2 cursor-pointer rounded-lg border border-primary-darkgray p-2 transform transition-transform duration-150 hover:scale-105 shadow-lg">
      <img
        src={advertisement.urlBanner}
        alt={advertisement.title}
        className="w-60 h-44 object-cover"
      />
      <p className="text-primary-black font-black">{advertisement.title}</p>
      <section className="flex flex-col items-center gap-3 mt-2">
        <p className="text-primary-white font-extrabold bg-primary-darkblue p-2 rounded-2xl">
          R$ {advertisement.price || priceRange}
        </p>
        <small className="text-black font-medium">
          @{advertisement.completeName}
        </small>
      </section>
    </div>
  );
}

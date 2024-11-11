import { getPriceRange } from "@utils/ad/Functions";
import { Advertisement } from "types/Advertisement";

type AdCardProps = {
  advertisement: Advertisement;
};

export function Card({ advertisement }: AdCardProps) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer rounded-lg border border-primary-darkgray p-2 transform transition-transform duration-150 hover:scale-105 shadow-lg w-64">
      <img
        src={advertisement.urlBanner}
        alt={advertisement.title}
        className="w-full h-44 object-cover"
      />
      <p className="text-primary-black font-black">{advertisement.title}</p>
      <section className="flex flex-col items-center gap-3 mt-2">
        <p className="text-primary-white font-extrabold bg-primary-darkblue p-2 rounded-2xl">
          R$ {advertisement.price || getPriceRange(advertisement)}
        </p>
        <small className="text-black font-medium">
          @{advertisement.completeName}
        </small>
      </section>
    </div>
  );
}

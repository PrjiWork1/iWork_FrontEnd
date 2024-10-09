import { Advertisement } from "types/Advertisement";

type AdCardProps = {
  advertisement: Advertisement;
};

export function Card({ advertisement }: AdCardProps) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer rounded-lg border border-primary-darkgray p-2 transform transition-transform duration-150 hover:scale-105 shadow-lg">
      <img
        src={advertisement.urlBanner}
        alt={advertisement.title}
        className="w-60 h-44 object-cover"
      />
      <p className="text-primary-black font-black">{advertisement.title}</p>
      <div className="flex flex-col items-center gap-3 mt-2">
        <p className="text-primary-white font-extrabold bg-primary-darkblue p-2 rounded-2xl">
          R$ {advertisement.price}
        </p>
        <small className="text-black font-medium">
          @{advertisement.description}
        </small>
      </div>
    </div>
  );
}

import { Advertisement } from "@types/Advertisement";

type AdCardProps = {
  advertisement: Advertisement;
};

export function Card({ advertisement }: AdCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-primary-lightgray h-44 w-60"></div>
      <p className="text-primary-black font-black">Nome do anúncio</p>
      <div className="flex flex-col items-center gap-3 mt-2">
        <p className="text-primary-white font-extrabold bg-primary-darkblue p-2 rounded-2xl">
          R$ 000,00
        </p>
        <small className="text-black font-medium">@username</small>
      </div>
    </div>
  );
}

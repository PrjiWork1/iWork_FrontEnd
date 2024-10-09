import { Advertisement } from "types/Advertisement";

type AdProps = {
  ad: Advertisement;
};

export function AdBottomSection({ ad }: AdProps) {
  return (
    <div className="p-5 flex gap-4 flex-col items-center md:items-stretch">
      <p className="font-bold text-xl">Descrição do Anúncio</p>
      <p className="font-medium text-xl">{ad.description}</p>
    </div>
  );
}

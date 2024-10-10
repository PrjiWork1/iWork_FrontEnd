import { Advertisement } from "types/Advertisement";

type AdProps = {
  ad: Advertisement;
};

export function AdBottomSection({ ad }: AdProps) {
  return (
    <div>
      <div className="p-5 flex gap-4 flex-col items-center md:items-stretch">
        <p className="font-bold text-xl">Vendedor</p>
        <div className="flex gap-6 items-center">
          <img
            src="fotoPerfil"
            alt="vendedor"
            className="bg-primary-darkgray rounded-full size-24 object-cover"
          />
          <p className="font-medium text-xl">Nome do vendedor</p>
        </div>
      </div>
      <div className="p-5 flex gap-4 flex-col items-center md:items-stretch">
        <p className="font-bold text-xl">Descrição do Anúncio</p>
        <p className="font-medium text-xl">{ad.description}</p>
      </div>
    </div>
  );
}

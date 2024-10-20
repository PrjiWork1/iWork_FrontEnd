import { Advertisement } from "types/Advertisement";

type AdProps = {
  ad: Advertisement;
};

export function AdBottomSection({ ad }: AdProps) {
  return (
    <section>
      <div className="p-5 flex gap-4 flex-col md:items-stretch">
        <p className="font-bold text-xl">Vendedor(a)</p>
        <div className="flex gap-6 items-center">
          <img
            src="fotoPerfil"
            className="bg-primary-darkgray rounded-full size-24 object-cover"
          />
          <p className="font-medium text-xl">{ad.completeName}</p>
        </div>
      </div>
      <div className="p-5 flex gap-4 flex-col">
        <p className="font-bold text-xl">Descrição do Anúncio</p>
        <p className="font-medium text-xl break-words">{ad.description}</p>
      </div>
    </section>
  );
}

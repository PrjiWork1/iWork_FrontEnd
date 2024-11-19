import { Advertisement } from "types/Advertisement";
import userImage from "@assets/user-image.png";
import { Link } from "react-router-dom";

type AdProps = {
  ad: Advertisement;
};

export function AdBottomSection({ ad }: AdProps) {
  return (
    <section>
      <div className="p-5 flex gap-4 flex-col md:items-stretch">
        <p className="font-bold text-xl">Vendedor(a)</p>
        <div className="flex gap-6 items-center">
          <Link
            to={`/user/${ad.userEmail}`}
            className="headermenu-option"
            data-testid="user-link"
          >
            <img src={userImage} className="size-24 object-cover" />
          </Link>
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

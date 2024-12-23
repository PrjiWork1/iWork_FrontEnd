import { PurchaseModal } from "@components/PurchaseModal";
import { UserContext, UserProvider } from "@context/UserContext";
import { calcAdType } from "@utils/ad/Functions";
import { useContext, useState } from "react";
import { Advertisement } from "types/Advertisement";

type AdProps = {
  ad: Advertisement;
};

export function AdTopSection({ ad }: AdProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const { user } = useContext(UserContext);

  return (
    <section className="p-10 flex gap-8 flex-col md:flex-row items-center md:items-stretch">
      <img
        src={ad.urlBanner}
        alt={ad.title}
        className="w-60 h-56 object-cover"
      />
      <div className="flex flex-col justify-around gap-5 md:gap-0 items-center md:items-stretch">
        <div className="flex items-center gap-3">
          <p className="font-bold text-xl">{ad.title}</p>
          <p className="font-medium text-primary-white bg-primary-darkblue rounded px-2">
            {calcAdType(ad.advertisementRate)}
          </p>
        </div>
        <p className="text-xl">
          Vendas{" "}
          <span className="bg-primary-darkgreen px-2 rounded text-primary-white">
            {ad.numberOfSales}
          </span>
        </p>
        <div className="flex gap-3">
          {ad.itemAdvertisements.length > 0 ? (
            <select
              name="itemAdvertisements"
              id="itemAdvertisements"
              className="border p-2 rounded text-lg border-primary-black font-medium"
            >
              <option hidden>Escolha um item</option>
              {ad.itemAdvertisements.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} - R${item.price.toFixed(2)}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-xl">R$ {ad.price.toFixed(2)}</p>
          )}
          {user?.role == "User" && (
            <button
              className="text-lg bg-primary-lightgreen rounded text-primary-white font-medium px-2 hover:bg-primary-darkgreen/90 transition"
              onClick={handleShowModal}
            >
              Comprar
            </button>
          )}
        </div>
      </div>
      <UserProvider>
        <PurchaseModal
          ad={ad}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
        />
      </UserProvider>
    </section>
  );
}

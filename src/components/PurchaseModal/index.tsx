import { usePurchaseModalForm } from "@hooks/usePurchaseModalForm";
import { Advertisement } from "types/Advertisement";
import { purchasemodalschema } from "@schemas/purchasemodalSchema";

import { IoIosClose } from "react-icons/io";

import { motion } from "framer-motion";

type ModalProps = {
  ad: Advertisement;
  isOpen: boolean;
  onClose: () => void;
};

export function PurchaseModal({ ad, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const prices = ad.itemAdvertisements?.map((item) => item.price) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const priceRange = prices.length > 0 ? `${minPrice} - R$ ${maxPrice}` : "";

  const modalVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: "0%" },
  };

  const { register, handleSubmit } = usePurchaseModalForm();

  const onSubmitFunc = async (data: purchasemodalschema) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-black bg-opacity-50 p-4 sm:p-6 overflow-y-auto">
      <motion.form
        className="mt-96 sm:mt-20 lg:mt-3 relative bg-primary-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg"
        onSubmit={handleSubmit(onSubmitFunc)}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={modalVariants}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={onClose}
            className="self-center sm:self-start order-1 sm:order-3"
            aria-label="Fechar Modal"
          >
            <IoIosClose size={32} />
          </button>
          <img
            src={ad.urlBanner}
            alt={ad.title}
            className="w-full sm:w-60 h-44 object-cover  rounded-lg order-2 md:order-1"
          />
          <div className="flex flex-col gap-2 order-2 md:order-1">
            <p className="font-bold text-lg sm:text-xl">{ad.title}</p>
            <p className="font-medium">@{ad.completeName}</p>
            <p className="font-bold text-lg sm:text-xl">
              R$ {ad.price || priceRange}
            </p>
            <button className="text-base sm:text-lg bg-primary-lightgreen rounded text-primary-white font-medium px-3 py-1 mt-2 hover:bg-primary-darkgreen/90 transition">
              Comprar
            </button>
          </div>
        </div>

        {ad.itemAdvertisements && (
          <div>
            <p className="font-medium mt-5 text-lg">
              Escolha os itens que você deseja
            </p>
            <ul className="flex flex-wrap gap-3 mt-3 border rounded p-4">
              {ad.itemAdvertisements.map((item) => (
                <li
                  key={item.name}
                  className="flex gap-2 items-center w-full sm:w-auto"
                >
                  <input
                    type="checkbox"
                    value={item.name}
                    className="cursor-pointer"
                    {...register("selectedItems")}
                  />
                  <span>
                    {item.name} - R${item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="font-medium mt-5 text-lg">Adicione uma descrição</p>
        <textarea
          className="border rounded-lg py-2 px-4 resize-none w-full h-32 sm:h-40 mt-3 font-medium"
          maxLength={350}
          placeholder="Insira aqui como você gostaria que fosse desenvolvido o serviço que está comprando."
          {...register("optionalDescription")}
        ></textarea>
      </motion.form>
    </div>
  );
}

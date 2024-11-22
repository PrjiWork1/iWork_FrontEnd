import { usePurchaseModalForm } from "@hooks/usePurchaseModalForm";
import { Advertisement } from "types/Advertisement";
import { purchasemodalschema } from "@schemas/purchasemodalSchema";

import { IoIosClose } from "react-icons/io";

import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@context/UserContext";
import { getAdModelEnum, getPriceRange } from "@utils/ad/Functions";
import { notify } from "@utils/notify";
import axiosApi from "@utils/axiosApi";

type ModalProps = {
  ad: Advertisement;
  isOpen: boolean;
  onClose: () => void;
};

export function PurchaseModal({ ad, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const modalVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: "0%" },
  };

  const { register, handleSubmit, errors } = usePurchaseModalForm();

  const { user } = useContext(UserContext);

  const navigator = useNavigate();

  const onSubmitFunc = async (data: purchasemodalschema) => {
    if (!user) {
      return navigator("/login");
    }

    if (user.id == ad.userId)
      return notify("error", "Você não pode comprar o seu próprio serviço!");

    handlePurchaseService(data);
  };

  const getSelectedItems = (data: purchasemodalschema) => {
    const info = data.selectedItems
      ? data.selectedItems
          .map((selectedItemName) => {
            // Encontre o item correspondente em `ad.itemAdvertisements`
            const item = ad.itemAdvertisements.find(
              (adItem) => adItem.name === selectedItemName
            );
            return item
              ? {
                  title: item.name,
                  unitprice: item.price,
                  id: ad.id,
                }
              : null;
          })
          .filter((item) => item !== null)
      : [
          {
            title: ad.title,
            unitprice: ad.price,
            id: ad.id,
          },
        ];

    return info;
  };

  const getItemsToData = (data: purchasemodalschema) => {
    const info = data.selectedItems
      ? data.selectedItems
          .map((selectedItemName) => {
            const item = ad.itemAdvertisements.find(
              (adItem) => adItem.name === selectedItemName
            );
            return item
              ? {
                  name: item.name,
                  price: item.price,
                }
              : null;
          })
          .filter((item) => item !== null)
      : [
          {
            name: ad.title,
            price: ad.price,
          },
        ];

    return info;
  };

  const handleSavePurchaseData = (data: purchasemodalschema) => {
    const purchaseData = {
      description: data.description,
      items: getItemsToData(data),
      advertisementId: ad.id,
      contractorId: ad.userId,
      advertiserId: user?.id,
      advertisementTemplate: getAdModelEnum(ad.itemAdvertisements),
      advertisementType: ad.type,
      advertisementNumOfSales: ad.numberOfSales,
    };

    sessionStorage.setItem("purchaseServiceData", JSON.stringify(purchaseData));
  };

  const handlePurchaseService = async (data: purchasemodalschema) => {
    try {
      const requestBody = {
        description: data.description,
        items: getSelectedItems(data),
      };

      const resp = await axiosApi.post("Preference", requestBody);

      handleSavePurchaseData(data);

      notify("success", "Sucesso! Redirecionando-se para a tela de pagamento.");
      setTimeout(() => {
        window.location.href = resp.data.preference;
      }, 2000);
    } catch (error) {
      console.log(error);
      notify("error", "Ocorreu um erro ao comprar o serviço!");
    }
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
            className="w-full sm:w-60 h-56 object-cover rounded-lg order-2 md:order-1"
          />
          <div className="flex flex-col gap-2 order-2 md:order-1">
            <p className="font-bold text-lg sm:text-xl">{ad.title}</p>
            <p className="font-medium">@{ad.completeName}</p>
            <p className="font-bold text-lg sm:text-xl">
              R$ {ad.price || getPriceRange(ad)}
            </p>
            <button className="text-base sm:text-lg bg-primary-lightgreen rounded text-primary-white font-medium px-3 py-1 mt-2 hover:bg-primary-darkgreen/90 transition">
              Comprar
            </button>
          </div>
        </div>

        {ad.itemAdvertisements.length > 0 && (
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
                    className="cursor-pointer size-4"
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
          {...register("description")}
        ></textarea>
        {errors.description && (
          <small className="text-primary-red font-semibold">
            {errors.description.message}*
          </small>
        )}
      </motion.form>
    </div>
  );
}

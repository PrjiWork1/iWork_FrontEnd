import { getAdModel, getPlanType } from "@utils/ad/Functions";
import axiosApi from "@utils/axiosApi";
import { notify } from "@utils/notify";
import { formattedDate } from "@utils/text/FormattedTexts";
import { useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { Advertisement } from "types/Advertisement";

type AdRowProps = {
  advertisement: Advertisement;
  onUpdated: (adId: string) => void;
};

export function AdminAdRow({ advertisement, onUpdated }: AdRowProps) {
  const handleAcceptAd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Você aprova o anúncio ${advertisement.title} ?`)) {
      handleUpdateAd(1);
      onUpdated(advertisement.id);
      notify("success", `Você aprovou o anúncio ${advertisement.title}.`);
    }
  };

  const handleRefuseAd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Você recusa o anúncio ${advertisement.title} ?`)) {
      handleUpdateAd(2);
      onUpdated(advertisement.id);
      notify("error", `Você recusou o anúncio ${advertisement.title}.`);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleIsMenuOpen = () => setIsMenuOpen((prev) => !prev);

  const handleUpdateAd = async (statusNum: number) => {
    let api = `/Advertisement/UpdateStatusAdvertisement${advertisement.id}`;

    try {
      await axiosApi.put(api, { status: statusNum });
    } catch (error) {
      console.error("Erro ao atualizar o status do anúncio: ", error);
    }
  };

  return (
    <div className="border rounded-md">
      <section
        className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 p-4 hover:bg-primary-lightgreen/80 cursor-pointer transition-all"
        onClick={toggleIsMenuOpen}
      >
        <img
          src={advertisement.urlBanner}
          alt={advertisement.title}
          className="size-20 object-cover cursor-default"
        />
        <p className="font-bold text-lg cursor-default">
          {advertisement.title}
        </p>
        <p className="font-bold text-lg cursor-default">
          {advertisement.categoryDescription}
        </p>
        <p className="font-bold text-lg cursor-default">
          R$ {advertisement.price}
        </p>
        <div className="flex gap-3 text-3xl cursor-default">
          <IoMdCheckmark
            cursor={"pointer"}
            color="green"
            className="hover:scale-110 transition-all"
            onClick={handleAcceptAd}
          />
          <IoMdClose
            cursor={"pointer"}
            color="red"
            className="hover:scale-110 transition-all"
            onClick={handleRefuseAd}
          />
        </div>
      </section>

      {isMenuOpen && (
        <section className="border-t">
          <div className="flex flex-col md:flex-row gap-10 p-4">
            <img
              src={advertisement.urlBanner}
              alt={advertisement.title}
              className="bg-primary-darkgray size-60 object-cover"
            />
            <ul className="flex flex-col gap-3">
              <li className="font-bold cursor-default">
                Nome: {advertisement.title}
              </li>
              <li className="font-bold cursor-default">
                Categoria: {advertisement.categoryDescription}
              </li>
              <li className="font-bold cursor-default">
                Valor: R$ {advertisement.price}
              </li>
              <li className="font-bold cursor-default">
                Descrição:
                <p>{advertisement.description}</p>
              </li>
              <li className="font-bold cursor-default">
                Tipo do Plano:
                <p className="text-primary-darkblue">
                  {getPlanType(advertisement.type)}
                </p>
              </li>
              <li className="font-bold cursor-default">
                Tipo do Anúncio:
                <p className="text-primary-darkgreen">
                  {getAdModel(advertisement.itemAdvertisements)}
                </p>
              </li>
              <li className="font-bold cursor-default">
                Criado em: {formattedDate(advertisement.createdAt)}
              </li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

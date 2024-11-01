import axiosApi from "@utils/axiosApi";
import { notify } from "@utils/notify";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { Advertisement } from "types/Advertisement";

type AdRowProps = {
  advertisement: Advertisement;
  onUpdated: (adId: string) => void;
};

export function AdminAdRow({ advertisement, onUpdated }: AdRowProps) {
  const handleAcceptAd = () => {
    if (confirm(`Você aprova o anúncio ${advertisement.title} ?`)) {
      handleUpdateAd(2);
      onUpdated(advertisement.id);
      notify("success", `Você aprovou o anúncio ${advertisement.title}.`);
    }
  };

  const handleRefuseAd = () => {
    if (confirm(`Você recusa o anúncio ${advertisement.title} ?`)) {
      handleUpdateAd(3);
      onUpdated(advertisement.id);
      notify("error", `Você recusou o anúncio ${advertisement.title}.`);
    }
  };

  const handleUpdateAd = async (statusNum: number) => {
    let api = `/Advertisement/UpdateStatusAdvertisement${advertisement.id}`;

    try {
      await axiosApi.put(api, {
        params: {
          Id: advertisement.id,
        },
        data: {
          status: statusNum,
        },
      });
      console.log(
        `Sucesso ao atualizar o status do anúncio, codigo de status ${statusNum}.`
      );
    } catch (error) {
      console.error("Erro ao atualizar o status do anúncio: ", error);
    }
  };

  return (
    <div className="border p-4 cursor-pointer hover:bg-primary-lightgreen/80 transition-all">
      <div className="flex items-center justify-between cursor-default">
        <img
          src={advertisement.urlBanner}
          alt={advertisement.title}
          className="size-20 object-cover"
        />
        <p className="font-bold text-lg">{advertisement.title}</p>
        <p className="font-bold text-lg">{advertisement.categoryDescription}</p>
        <p className="font-bold text-lg">R$ {advertisement.price}</p>
        <div className="flex gap-3 text-3xl">
          <IoMdCheckmark
            cursor={"pointer"}
            color="green"
            onClick={handleAcceptAd}
          />
          <IoMdClose cursor={"pointer"} color="red" onClick={handleRefuseAd} />
        </div>
      </div>
    </div>
  );
}

import { getApiStatus } from "@utils/ad/Functions";
import axiosApi from "@utils/axiosApi";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

type purchaseAdType = {
  name: string;
  price: number;
  id: string;
};

export function PaymentSucessPage() {
  const [searchParams] = useSearchParams();
  const purchasedAd = sessionStorage.getItem("purchaseServiceData");
  const data = JSON.parse(purchasedAd!);

  const handleReturnToHome = () => {
    sessionStorage.removeItem("purchaseServiceData");
  };

  const handleCreateHiringAdvertisement = async () => {
    try {
      await axiosApi.post("HiringAdvertisement/CreateHiringAdvertisement", {
        advertisementId: data.advertisementId,
        contractorId: data.contractorId,
        advertiserId: data.advertiserId,
        preferenceId: searchParams.get("preference_id"),
        advertisementTemplate: data.advertisementTemplate,
        advertisementType: data.advertisementType,
        hiringStatus: getApiStatus(searchParams.get("status")!),
        description: data.description,
        items: data.items ? data.items : [],
        price: data.items.length == 1 ? data.items[0].price : 0,
        isActive: true,
      });
    } catch (error) {}
  };

  const handleUptadeAdnumberOfSales = async (
    advertisementId: string,
    currentNumberOfSales: number
  ) => {
    try {
      await axiosApi.put(
        `Advertisement/UpdateNumberOfSalesAdvertisement${advertisementId}`,
        {
          numberOfSales: currentNumberOfSales + 1,
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    handleCreateHiringAdvertisement();
    handleUptadeAdnumberOfSales(
      data.advertisementId,
      data.advertisementNumOfSales
    );
  }, [purchasedAd]);

  return (
    <div className="bg-primary-lightgray font-inter flex items-center justify-center flex-col">
      <div className="border bg-primary-white border-primary-black py-6 md:w-1/2 rounded-lg flex flex-col justify-around gap-10 items-center md:m-10">
        <svg
          viewBox="0 0 24 24"
          className="text-primary-darkgreen w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <p className="text-2xl font-semibold text-center">
          Compra realizada com sucesso!
        </p>
        <div className="w-1/2 font-semibold text-lg flex flex-col gap-2">
          {data.items.length > 1 && "Itens Adquiridos"}
          {data.items.map((item: purchaseAdType) => (
            <div key={item.id}>
              <p>
                Título do {data.items.length > 1 ? "item" : "serviço"}:{" "}
                {item.name}
              </p>
              <p>
                Preço do {data.items.length > 1 ? "item" : "serviço"}: R${" "}
                {item.price}
              </p>
            </div>
          ))}
          <p>Descrição informada: </p>
          <textarea
            className="resize-none w-full h-32 border-2 border-primary-darkgray rounded p-2"
            value={data.description}
            disabled
          ></textarea>
        </div>
        <p>
          <Link
            to="/"
            className="p-2 bg-primary-darkblue text-primary-white text-2xl font-semibold hover:bg-primary-darkblue/80 transition "
            onClick={handleReturnToHome}
          >
            Voltar à tela home
          </Link>
        </p>
      </div>
    </div>
  );
}

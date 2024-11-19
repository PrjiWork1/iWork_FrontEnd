import { Link, useSearchParams } from "react-router-dom";

type purchaseAdType = {
  title: string;
  unitprice: number;
  id: string;
};

export function PaymentSucessPage() {
  const [searchParams] = useSearchParams();
  const purchasedAd = sessionStorage.getItem("purchaseServiceData");
  const data = JSON.parse(purchasedAd!);

  const handleReturnToHome = () => {
    sessionStorage.removeItem("purchaseServiceData");
  };

  return (
    <div className="bg-primary-lightgray w-screen h-screen font-inter flex items-center justify-center flex-col">
      <div className="border bg-primary-white border-primary-black py-6 w-1/2 rounded-lg flex flex-col justify-around gap-10 items-center">
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
        {/* <p>{searchParams.get("status")}</p> */}
        <div className="w-1/2 font-semibold text-lg flex flex-col gap-2">
          {data.items.length > 1 && "Itens Adquiridos"}
          {data.items.map((item: purchaseAdType) => (
            <div key={item.id}>
              <p>
                Título do {data.items.length > 1 ? "item" : "serviço"}:{" "}
                {item.title}
              </p>
              <p>
                Preço do {data.items.length > 1 ? "item" : "serviço"}: R${" "}
                {item.unitprice.toFixed(2)}
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

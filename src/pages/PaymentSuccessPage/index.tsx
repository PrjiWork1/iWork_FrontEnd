import { Link } from "react-router-dom";

export function PaymentSucessPage() {
  const purchasedAd = sessionStorage.getItem("purchaseServiceData");

  return (
    <div className="w-screen h-screen font-inter flex items-center justify-center flex-col">
      <div className="border border-primary-black p-20 rounded-lg flex flex-col justify-around gap-10 items-center">
        <p className="text-2xl font-semibold text-center flex gap-3">
          Compra realizada com sucesso!
        </p>
        <p>
          <Link to="/" className="text-2xl font-semibold hover:underline">
            Voltar à tela home
          </Link>
        </p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export function PaymentFailurePage() {
  const handleReturnToHome = () => {
    sessionStorage.removeItem("purchaseServiceData");
  };

  return (
    <div className="bg-primary-lightgray w-screen h-screen font-inter flex items-center justify-center flex-col">
      <div className="border bg-primary-white border-primary-black py-6 md:w-1/2 rounded-lg flex flex-col justify-around gap-10 items-center">
        <svg
          viewBox="0 0 24 24"
          className="text-primary-red w-16 h-16 mx-auto my-6"
        >
          <circle cx="12" cy="12" r="12" fill="currentColor" />
          <path
            fill="white"
            d="M15.78 8.22a1 1 0 0 1 0 1.414L13.414 12l2.364 2.364a1 1 0 0 1-1.414 1.414L12 13.414l-2.364 2.364a1 1 0 0 1-1.414-1.414L10.586 12 8.22 9.636a1 1 0 1 1 1.414-1.414L12 10.586l2.364-2.364a1 1 0 0 1 1.414 0z"
          />
        </svg>

        <p className="text-2xl font-semibold text-center">
          Falha ao realizar a compra.
        </p>

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

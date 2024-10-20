import { Link } from "react-router-dom";
import { gradient, gradient2 } from "@utils/style/Gradients";
import { LoginForm } from "./LoginForm";
import { useEffect } from "react";

export function Login() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row font-inter">
      <section
        className="md:flex-1 bg-cover bg-center flex flex-col items-center justify-center p-5 md:p-0 w-full"
        style={{
          backgroundImage: `${gradient}`,
        }}
      >
        <p className="text-primary-black font-semibold text-5xl text-center mb-5 tracking-wide">
          Olá Novamente
        </p>
        <p className="text-primary-black font-semibold text-lg text-center mb-32 w-3/4">
          Faça login para impulsionar sua carreira e conquistar novas
          oportunidades no melhor marketplace de freelancers do país!
        </p>
        <p className="text-primary-black font-semibold text-xl mb-3">
          Ainda não possui uma conta?
        </p>
        <Link to="/register">
          <button className="cursor-pointer bg-primary-yellow font-bold text-primary-black rounded md:px-20 px-3 py-2 hover:bg-primary-yellow/80 transition">
            Crie sua conta agora
          </button>
        </Link>
      </section>
      <section
        className="md:flex-1 bg-cover bg-center flex items-center justify-center p-5 md:p-0"
        style={{
          backgroundImage: `${gradient2}`,
        }}
      >
        <LoginForm />
      </section>
    </div>
  );
}

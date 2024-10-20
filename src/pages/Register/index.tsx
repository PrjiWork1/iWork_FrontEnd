import { gradient, gradient2 } from "@utils/style/Gradients";
import { Link } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { useEffect } from "react";

export function Register() {
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
          Seja Bem Vindo
        </p>
        <p className="text-primary-black font-semibold text-lg text-center mb-32 w-3/4">
          Comece sua jornada fazendo o seu cadastro.
        </p>
        <p className="text-primary-black font-semibold text-xl mb-3">
          Você já possui uma conta?
        </p>
        <Link to="/login">
          <button className="cursor-pointer bg-primary-yellow font-bold text-primary-black rounded md:px-20 px-3 py-2 hover:bg-primary-yellow/80 transition">
            Clique aqui para fazer login
          </button>
        </Link>
      </section>
      <section
        className="md:flex-1 bg-cover bg-center flex items-center justify-center p-5 md:p-0"
        style={{
          backgroundImage: `${gradient2}`,
        }}
      >
        <RegisterForm />
      </section>
    </div>
  );
}

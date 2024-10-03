import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { gradient, gradient2 } from "@utils/style/Gradients";

export function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    setShowPassword((previous) => !previous);
    showPassword
      ? (passwordInput.type = "password")
      : (passwordInput.type = "text");
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row font-inter">
      <div
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
      </div>
      <div
        className="md:flex-1 bg-cover bg-center flex items-center justify-center p-5 md:p-0"
        style={{
          backgroundImage: `${gradient2}`,
        }}
      >
        <form
          // onSubmit={handleSubmit(onSubmitFunc)}
          className="bg-primary-darkblue rounded-xl p-2 md:px-20 md:py-10 flex flex-col items-center justify-center"
        >
          <p className="text-primary-white md:text-5xl text-3xl mb-10 font-bold tracking-wide">
            Login
          </p>
          <button className="bg-primary-darkgreen">login com google</button>
          <div className="flex items-center justify-center my-4 w-full">
            <div className=" border-2 border-primary-white w-full rounded-full"></div>
            <span className="mx-4 font-bold text-primary-white text-center">
              ou
            </span>
            <div className="flex-grow border-2 border-primary-white w-full rounded-full"></div>
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <input
              type="email"
              placeholder="Email"
              className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70"
              style={{ backgroundColor: "transparent" }}
            />

            <div className="flex items-center border-2 rounded-lg border-primary-white">
              <input
                type="password"
                id="password"
                placeholder="Senha"
                className="rounded-lg py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 outline-none"
                style={{ backgroundColor: "transparent" }}
              />
              <span
                onClick={handleShowPassword}
                className="cursor-pointer mr-2"
              >
                {showPassword ? (
                  <FaRegEyeSlash
                    className="text-2xl cursor-pointer"
                    color="white"
                  />
                ) : (
                  <FaRegEye className="text-2xl cursor-pointer" color="white" />
                )}
              </span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-1 items-center">
                <input type="checkbox" className="size-4" />
                <p className="text-primary-white text-xs">Lembrar de mim</p>
              </div>
              <p className="text-primary-white text-xs cursor-pointer hover:underline">
                Esqueceu sua senha?
              </p>
            </div>
          </div>
          <input
            type="submit"
            value={"Entrar"}
            className="w-full py-2 rounded text-lg bg-primary-white text-primary-black font-bold hover:opacity-85 transition cursor-pointer"
          />
          <small className="mt-3 mb-3 md:mb-0 text-primary-white text-xs cursor-pointer hover:underline">
            Área de Administrador
          </small>
        </form>
      </div>
    </div>
  );
}

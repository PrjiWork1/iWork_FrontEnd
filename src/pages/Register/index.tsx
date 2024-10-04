import { maskCPF, maskData, maskPhone } from "@utils/input/Masks";
import { gradient, gradient2 } from "@utils/style/Gradients";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleShowPassword = () => setShowPassword((previous) => !previous);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((previous) => !previous);

  const [cpf, setCpf] = useState("");

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCpf(maskCPF(value));
  };

  const [date, setDate] = useState("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDate(maskData(value));
  };

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(maskPhone(value));
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
      </div>
      <div
        className="md:flex-1 bg-cover bg-center flex items-center justify-center p-5 md:p-0"
        style={{
          backgroundImage: `${gradient2}`,
        }}
      >
        <form
          // onSubmit={handleSubmit(onSubmitFunc)}
          className="bg-primary-darkblue rounded-xl p-2 md:px-14 md:py-8 flex flex-col items-center justify-center"
        >
          <p className="text-primary-white md:text-5xl mb-10 text-3xl font-bold tracking-wide">
            Registro
          </p>
          {/* <button className="bg-primary-darkgreen">
            entrar com google
          </button> */}
          {/* <div className="flex items-center justify-center my-4 w-full">
            <div className=" border-2 border-primary-white w-full rounded-full"></div>
            <span className="mx-4 font-bold text-primary-white text-center">
              ou
            </span>
            <div className="flex-grow border-2 border-primary-white w-full rounded-full"></div>
          </div> */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex gap-3 md:flex-row flex-col">
              <input
                type="text"
                placeholder="Nome"
                className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-40"
                style={{ backgroundColor: "transparent" }}
              />

              <input
                type="text"
                placeholder="Sobrenome"
                className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-40"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <div className="flex gap-3 md:flex-row flex-col">
              <input
                type="text"
                placeholder="CPF"
                value={cpf}
                maxLength={14}
                onChange={handleCPFChange}
                className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-40"
                style={{ backgroundColor: "transparent" }}
              />

              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={date}
                maxLength={10}
                onChange={handleDateChange}
                className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-40"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <input
              type="text"
              placeholder="Telefone"
              value={phone}
              maxLength={15}
              onChange={handlePhoneChange}
              className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70"
              style={{ backgroundColor: "transparent" }}
            />

            <input
              type="email"
              placeholder="Email"
              className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70"
              style={{ backgroundColor: "transparent" }}
            />

            <div className="flex gap-3 md:flex-row flex-col">
              <div className="flex items-center border-2 rounded-lg border-primary-white">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Senha"
                  className="border-2 rounded-lg py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-[7.5rem] outline-none border-none"
                  style={{ backgroundColor: "transparent" }}
                />
                <span
                  onClick={handleShowPassword}
                  className="cursor-pointer mr-3"
                >
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="text-2xl cursor-pointer"
                      color="white"
                    />
                  ) : (
                    <FaRegEye
                      className="text-2xl cursor-pointer"
                      color="white"
                    />
                  )}
                </span>
              </div>

              <div className="flex items-center border-2 rounded-lg border-primary-white">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Conf. Senha"
                  className="border-2 rounded-lg py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-[7.5rem] outline-none border-none"
                  style={{ backgroundColor: "transparent" }}
                />
                <span
                  onClick={handleShowConfirmPassword}
                  className="cursor-pointer mr-3"
                >
                  {showConfirmPassword ? (
                    <FaRegEyeSlash
                      className="text-2xl cursor-pointer"
                      color="white"
                    />
                  ) : (
                    <FaRegEye
                      className="text-2xl cursor-pointer"
                      color="white"
                    />
                  )}
                </span>
              </div>
            </div>

            {/* <div className="flex items-center border-2 rounded-lg border-primary-white">
              <input
                type="password"
                id="password"
                placeholder="Senha"
                className="rounded-lg py-2 px-4 w-[90%] text-primary-white font-semibold placeholder-primary-white/70 outline-none"
                style={{ backgroundColor: "transparent" }}
              />
              <span onClick={handleShowPassword} className="cursor-pointer">
                {showPassword ? (
                  <FaRegEyeSlash
                    className="text-2xl cursor-pointer"
                    color="white"
                  />
                ) : (
                  <FaRegEye className="text-2xl cursor-pointer" color="white" />
                )}
              </span>
            </div> */}
          </div>
          <input
            type="submit"
            value={"Entrar"}
            className="w-full py-2 rounded text-lg bg-primary-white text-primary-black font-bold hover:opacity-85 transition cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}

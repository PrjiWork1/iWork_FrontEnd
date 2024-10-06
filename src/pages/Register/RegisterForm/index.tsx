import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { maskCPF, maskData, maskPhone } from "@utils/input/Masks";
import { notify } from "@utils/notify";
import { useNavigate } from "react-router-dom";
import { registerschema } from "@schemas/registerSchema";
import { useRegisterForm } from "@hooks/useRegisterForm";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

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

  const { register, handleSubmit, errors } = useRegisterForm();
  const navigate = useNavigate();

  const onSubmitFunc = (data: registerschema) => {
    notify("success", "Conta registrada com sucesso!");
    console.log(data);
    setDisabledButton((prev) => !prev);
    setTimeout(() => {
      setDisabledButton((prev) => !prev);
    }, 4000);
    // navigate("/");
  };

  const onErrorFunc = () => {
    if (Object.keys(errors).length === 8) {
      notify("error", "Você deve informar seus dados.");
    } else {
      Object.values(errors).forEach((error) => {
        notify("error", `${error.message}`);
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitFunc, onErrorFunc)}
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
            {...register("name")}
          />

          <input
            type="text"
            placeholder="Sobrenome"
            className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-40"
            style={{ backgroundColor: "transparent" }}
            {...register("surname")}
          />
        </div>

        <div className="flex gap-3 md:flex-row flex-col">
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            maxLength={14}
            className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-40"
            style={{ backgroundColor: "transparent" }}
            {...register("cpf")}
            onChange={handleCPFChange}
          />

          <input
            type="text"
            placeholder="dd/mm/yyyy"
            value={date}
            maxLength={10}
            className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-40"
            style={{ backgroundColor: "transparent" }}
            {...register("birthDate")}
            onChange={handleDateChange}
          />
        </div>

        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          maxLength={15}
          className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70"
          style={{ backgroundColor: "transparent" }}
          {...register("phone")}
          onChange={handlePhoneChange}
        />

        <input
          type="email"
          placeholder="Email"
          className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70"
          style={{ backgroundColor: "transparent" }}
          {...register("email")}
        />

        <div className="flex gap-3 flex-col">
          <div className="flex items-center border-2 rounded-lg border-primary-white">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Senha"
              className="border-2 rounded-lg py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 w-[90%] outline-none border-none"
              style={{ backgroundColor: "transparent" }}
              {...register("password")}
            />
            <span onClick={handleShowPassword} className="cursor-pointer mr-3">
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

          <div className="flex items-center border-2 rounded-lg border-primary-white">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Conf. Senha"
              className="border-2 rounded-lg py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 w-[90%] outline-none border-none"
              style={{ backgroundColor: "transparent" }}
              {...register("confirmpassword")}
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
                <FaRegEye className="text-2xl cursor-pointer" color="white" />
              )}
            </span>
          </div>
        </div>
      </div>
      <input
        type="submit"
        value={"Registrar"}
        className="w-full py-2 rounded text-lg bg-primary-white text-primary-black font-bold hover:opacity-85 transition cursor-pointer disabled:bg-primary-white/50 disabled:hover:opacity-100 disabled:cursor-not-allowed"
        disabled={disabledButton}
      />
    </form>
  );
}

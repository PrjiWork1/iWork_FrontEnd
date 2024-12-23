import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { maskCPF, maskPhone } from "@utils/input/Masks";
import { notify } from "@utils/notify";
import { useNavigate } from "react-router-dom";
import { registerschema } from "@schemas/registerSchema";
import { useRegisterForm } from "@hooks/useRegisterForm";
import axiosApi from "@utils/axiosApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(maskPhone(value));
  };

  const { register, handleSubmit, errors } = useRegisterForm();
  const navigate = useNavigate();

  const onSubmitFunc = (data: registerschema) => {
    setDisabledButton((prev) => !prev);
    data.name = data.name.trim();
    data.surname = data.surname.trim();
    postUser(data);
  };

  const postUser = async (data: registerschema) => {
    try {
      await axiosApi.post("User/Register", {
        completeName: `${data.name} ${data.surname}`,
        userName: `${data.surname}_${data.name}${new Date().getTime()}`,
        email: data.email,
        cpf: data.cpf,
        birthDate: data.birthDate,
        phoneNumber: data.phone,
        password: data.password,
        confirmPassword: data.confirmpassword,
        role: "User",
        isActive: true,
      });
      setTimeout(() => {
        loginUser(data);
      }, 4000);
      setTimeout(() => {
        setDisabledButton((prev) => !prev);
      }, 8000);
    } catch (error) {
      notify("error", "Ocorreu um erro ao registrar o usuário!");
      setTimeout(() => {
        setDisabledButton((prev) => !prev);
      }, 4000);
    }
  };

  const loginUser = async (data: registerschema) => {
    try {
      const response = await axiosApi.post("User/Login", {
        email: data.email,
        password: data.password,
      });
      notify("success", "Usuário registrado com sucesso!");
      sessionStorage.setItem("token_iWork", response.data);
      sessionStorage.setItem("UserEmail_iWork", data.email);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      notify("error", "Ocorreu um erro ao realizar o login do usuário!");
    }
  };

  const onErrorFunc = () => {
    if (errors.password) {
      notify(
        "error",
        "A senha deve conter pelo menos 12 caracteres, incluindo um caractere maiúsculo, um número e um símbolo."
      );
    }
  };

  const errorMessage =
    errors.name?.message ||
    errors.surname?.message ||
    errors.cpf?.message ||
    errors.birthDate?.message ||
    errors.phone?.message ||
    errors.email?.message ||
    errors.password?.message ||
    errors.confirmpassword?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmitFunc, onErrorFunc)}
      className="bg-primary-darkblue rounded-xl p-2 md:px-14 md:py-8 flex flex-col items-center justify-center"
    >
      <p className="text-primary-white md:text-5xl mb-10 text-3xl font-bold tracking-wide">
        Registro
      </p>
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
            {...register("cpf", {
              onChange: handleCPFChange,
            })}
          />

          <input
            type="date"
            className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 md:w-40 dark:[color-scheme:dark]"
            style={{ backgroundColor: "transparent" }}
            {...register("birthDate")}
          />
        </div>

        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          maxLength={15}
          className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70"
          style={{ backgroundColor: "transparent" }}
          {...register("phone", {
            onChange: handlePhoneChange,
          })}
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
      {errorMessage && (
        <div className="mb-1">
          <small className="text-primary-yellow font-semibold">
            *{errorMessage}
          </small>
        </div>
      )}
      <button
        type="submit"
        className="w-full py-2 rounded text-lg bg-primary-white text-primary-black font-bold hover:opacity-85 transition cursor-pointer disabled:bg-primary-white/50 disabled:hover:opacity-100 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={disabledButton}
      >
        {disabledButton ? (
          <AiOutlineLoading3Quarters color="black" className="animate-spin" />
        ) : (
          "Registrar"
        )}
      </button>
    </form>
  );
}

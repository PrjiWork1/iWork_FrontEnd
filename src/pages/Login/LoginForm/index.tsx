import { useLoginForm } from "@hooks/useLoginForm";
import { loginschema } from "@schemas/loginSchema";
import { notify } from "@utils/notify";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useLoginForm();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((previous) => !previous);

  const onSubmitFunc = (data: loginschema) => {
    console.log(data.email, data.password);
    notify("success", "Logado com sucesso!");
    setDisabledButton((prev) => !prev);
    setTimeout(() => {
      setDisabledButton((prev) => !prev);
      navigate("/");
    }, 4000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitFunc)}
      className="bg-primary-darkblue rounded-xl p-2 md:px-20 md:py-10 flex flex-col items-center justify-center"
    >
      <p className="text-primary-white md:text-5xl text-3xl mb-10 font-bold tracking-wide">
        Login
      </p>
      {/* <button className="bg-primary-darkgreen">
            login com google
          </button> */}
      {/* <div className="flex items-center justify-center my-4 w-full">
            <div className=" border-2 border-primary-white w-full rounded-full"></div>
            <span className="mx-4 font-bold text-primary-white text-center">
              ou
            </span>
            <div className="flex-grow border-2 border-primary-white w-full rounded-full"></div>
          </div> */}
      <div className="flex flex-col gap-3 mb-10">
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            className="border-2 rounded-lg border-primary-white py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70"
            style={{ backgroundColor: "transparent" }}
            {...register("email")}
          />
          {errors.email && (
            <small className="text-primary-yellow">
              {errors.email.message}
            </small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center border-2 rounded-lg border-primary-white">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Senha"
              className="rounded-lg py-2 px-4 text-primary-white font-semibold placeholder-primary-white/70 outline-none"
              style={{ backgroundColor: "transparent" }}
              {...register("password")}
            />
            <span onClick={handleShowPassword} className="cursor-pointer mr-2">
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
          {errors.password && (
            <small className="text-primary-yellow">
              {errors.password.message}
            </small>
          )}
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
        className="w-full py-2 rounded text-lg bg-primary-white text-primary-black font-bold hover:opacity-85 transition cursor-pointer disabled:bg-primary-white/50 disabled:hover:opacity-100 disabled:cursor-not-allowed"
        disabled={disabledButton}
      />
      <small className="mt-3 mb-3 md:mb-0 text-primary-white text-xs cursor-pointer hover:underline">
        Área de Administrador
      </small>
    </form>
  );
}

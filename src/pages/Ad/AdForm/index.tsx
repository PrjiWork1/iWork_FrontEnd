import { useAdForm } from "@hooks/useAdForm";
import { adschema } from "@schemas/adSchema";
import axiosApi from "@utils/axiosApi";
import { notify } from "@utils/notify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdForm() {
  const { register, handleSubmit, errors } = useAdForm();
  const [image, setImage] = useState<File | null>(null);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image: File | undefined = e.target.files?.[0];
    const imageTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg",
      "image/svg+xml",
    ];

    if (image && imageTypes.includes(image.type)) {
      setImage(image);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axiosApi.post("Upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.path;
      // fazer uma função para adicionar o caminho + alguns numeros ou algo assim, para nao dar erro na imagem
    } catch (error) {
      console.log("Ocorreu um erro ao tentar subir a imagem à nuvem! " + error);
      return notify("error", "Um erro ocorreu ao tentar criar o anúncio.");
    }
  };

  const onSubmitFunc = async (data: adschema) => {
    setDisabledButton((prev) => !prev);

    postAd(data);

    setTimeout(() => {
      setDisabledButton((prev) => !prev);
    }, 3000);
  };

  const getAdType = (data: adschema) => {
    if (data.type === "Prata") return 0;
    if (data.type === "Ouro") return 1;
    if (data.type === "Diamante") return 2;
  };

  const postAd = async (data: adschema) => {
    try {
      await axiosApi.post("/Advertisement/CreateNormalAdvertisement", {
        title: data.title,
        description: data.description,
        urlBanner: await uploadImage(),
        type: getAdType(data),
        iWorkPro: true,
        userId: "9006bf61-34f3-42e5-98cb-cbed2c1674f0",
        categoryId: "ac5e18a7-5cea-403d-a434-be44168754d6",
        createdAt: new Date(),
        price: data.price,
        isActive: true,
      });
      notify("success", "Seu anúncio foi criado!");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      console.error("Erro ao fazer o POST: ", error);
      notify("error", "Um erro ocorreu ao tentar criar o anúncio.");
    }
  };

  const onErrorFunc = () => {
    Object.values(errors).forEach((error) => {
      alert(error.message);
    });
  };

  const [selectedType, setSelectedType] = useState("");
  const [adModel, setAdModel] = useState("Normal");

  const handleAddMoreItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="border-2 rounded border-primary-darkgray p-5 my-14 lg:w-2/3"
      onSubmit={handleSubmit(onSubmitFunc, onErrorFunc)}
    >
      <div className="flex flex-col gap-2">
        <p className="text-primary-darkgray font-black">Nome do anúncio</p>
        <input
          type="text"
          className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-black"
          {...register("title")}
        />
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <p className="text-primary-darkgray font-black mb-4">
          Envie aqui a imagem de capa do anúncio
        </p>
        <div className="flex gap-3 items-center flex-col md:flex-row">
          <div className="relative inline-block">
            <input
              type="file"
              id="adImageInput"
              accept="image/*"
              className="hidden inset-0"
              onChange={handleFileChange}
            />
            <label
              htmlFor="adImageInput"
              className="bg-primary-darkgray border-none font-extrabold text-primary-white py-3 px-8 rounded-lg cursor-pointer"
            >
              Fazer upload
            </label>
          </div>

          <span className="text-gray-700">
            {image ? image.name : "Envie aqui sua imagem"}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <p className="text-primary-darkgray font-black mb-4 text-center">
          Modelo do anúncio
        </p>
        <div className="flex gap-3 items-center flex-col md:flex-row justify-evenly">
          <label
            htmlFor="adModel1"
            className={`border-2 rounded-lg border-primary-darkgray flex flex-col p-3 gap-3 items-center justify-center lg:w-1/4 cursor-pointer group hover:bg-primary-darkgray transition-colors duration-200 ${
              adModel === "Normal" ? "bg-primary-darkgray" : "bg-primary-white"
            }`}
          >
            <input
              type="radio"
              id="adModel1"
              className="hidden"
              defaultChecked
              value="Normal"
              {...register("adModel", {
                onChange: (e) => {
                  setAdModel(e.target.value);
                },
              })}
            />
            <p
              className={`font-black group-hover:text-primary-white ${
                adModel === "Normal"
                  ? "text-primary-white"
                  : "text-primary-darkgray"
              }`}
            >
              Normal
            </p>
            <span
              className={`font-medium group-hover:text-primary-white ${
                adModel === "Normal"
                  ? "text-primary-white"
                  : "text-primary-darkgray"
              }`}
            >
              O item vendido será exatamente o do título do anúncio cadastrado
              neste formulário
            </span>
          </label>

          <label
            htmlFor="adModel2"
            className={`border-2 rounded-lg border-primary-darkgray flex flex-col p-3 gap-3 items-center justify-center lg:w-1/4 lg:p-4 lg:h-[11.5rem] cursor-pointer group hover:bg-primary-darkgray transition-colors duration-200 ${
              adModel === "Dinamico"
                ? "bg-primary-darkgray"
                : "bg-primary-white"
            }`}
          >
            <input
              type="radio"
              id="adModel2"
              className="hidden"
              value="Dinamico"
              {...register("adModel", {
                onChange: (e) => {
                  setAdModel(e.target.value);
                },
              })}
            />
            <p
              className={`font-black group-hover:text-primary-white ${
                adModel === "Dinamico"
                  ? "text-primary-white"
                  : "text-primary-darkgray"
              }`}
            >
              Dinâmico
            </p>
            <span
              className={`font-medium group-hover:text-primary-white ${
                adModel === "Dinamico"
                  ? "text-primary-white"
                  : "text-primary-darkgray"
              }`}
            >
              Anuncie vários itens, dando opções para que o cliente escolha qual
              item deseja.
            </span>
          </label>
        </div>
      </div>
      {adModel === "Normal" ? (
        <div className="flex flex-col gap-2 mt-6">
          <p className="text-primary-darkgray font-black">Valor do anúncio</p>
          <div className="flex items-center">
            <span className="ml-4 absolute font-bold text-primary-darkgray">
              R$
            </span>
            <input
              type="number"
              className="input-number border-2 rounded-lg border-primary-darkgray py-2 px-10 text-primary-darkgray font-bold w-full"
              {...register("price")}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-2 mt-6">
            <p className="text-primary-darkgray font-black">Item #1</p>
            <input
              type="text"
              className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-black"
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-primary-darkgray font-black">
              Valor do Item #1:
            </p>
            <div className="flex items-center">
              <span className="ml-4 absolute font-bold text-primary-darkgray">
                R$
              </span>
              <input
                type="number"
                className="input-number border-2 rounded-lg border-primary-darkgray py-2 px-10 text-primary-darkgray font-bold w-full"
              />
            </div>
          </div>
          <button
            className="my-6 bg-primary-darkgray rounded text-primary-white p-2"
            onClick={handleAddMoreItems}
          >
            Adicionar item
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-primary-darkgray font-black">Categoria do anúncio</p>
        <select
          id="adCategory"
          className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-bold"
          // {...register("category")}
        >
          <option value="select" hidden>
            Selecione
          </option>
        </select>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-primary-darkgray font-black">Descrição do anúncio</p>
        <textarea
          className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-bold resize-none h-52"
          maxLength={200}
          {...register("description")}
        ></textarea>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <p className="text-primary-darkgray font-black mb-4">Tipo do anúncio</p>
        <div className="flex items-center flex-col md:flex-row justify-between gap-3">
          <label
            htmlFor="adType1"
            className={`border-2 rounded-lg border-primary-darkgray flex flex-col p-3 items-center justify-between w-full lg:w-1/4 lg:p-4 lg:h-[14.4rem] cursor-pointer group hover:bg-primary-darkgray transition-colors duration-200 ${
              selectedType === "Prata"
                ? "bg-primary-darkgray"
                : "bg-primary-white"
            }`}
          >
            <div className="flex flex-col items-center h-full">
              <input
                type="radio"
                id="adType1"
                className="peer hidden"
                value="Prata"
                {...register("type", {
                  onChange: (e) => {
                    setSelectedType(e.target.value);
                  },
                })}
              />
              <p
                className={`font-black group-hover:text-primary-white lg:mb-5 ${
                  selectedType === "Prata"
                    ? "text-primary-white"
                    : "text-primary-darkgray"
                }`}
              >
                Prata
              </p>
              <span
                className={`font-medium group-hover:text-primary-white ${
                  selectedType === "Prata"
                    ? "text-primary-white"
                    : "text-primary-darkgray"
                }`}
              >
                Anúncio Prata <br /> Taxa básica de 9,99%
              </span>
            </div>
          </label>

          <label
            htmlFor="adType2"
            className={`border-2 rounded-lg border-primary-darkgray flex flex-col p-3 gap-3 items-center justify-center w-full lg:w-1/4 lg:p-4 lg:h-[14.4rem] cursor-pointer group hover:bg-primary-darkgray transition-colors duration-200 ${
              selectedType === "Ouro"
                ? "bg-primary-darkgray"
                : "bg-primary-white"
            }`}
          >
            <div className="flex flex-col items-center h-full">
              <input
                type="radio"
                id="adType2"
                className="peer hidden"
                value="Ouro"
                {...register("type", {
                  onChange: (e) => {
                    setSelectedType(e.target.value);
                  },
                })}
              />
              <p
                className={`font-black group-hover:text-primary-white lg:mb-5 ${
                  selectedType === "Ouro"
                    ? "text-primary-white"
                    : "text-primary-darkgray"
                }`}
              >
                Ouro
              </p>
              <span
                className={`font-medium group-hover:text-primary-white ${
                  selectedType === "Ouro"
                    ? "text-primary-white"
                    : "text-primary-darkgray"
                }`}
              >
                Anúncio Ouro <br />
                Destaque na página principal <br />
                Mais visibilidade <br />
                Taxa de 11,99%
              </span>
            </div>
          </label>

          <label
            htmlFor="adType3"
            className={`border-2 rounded-lg border-primary-darkgray flex flex-col p-3 gap-3 items-center justify-center w-full lg:w-1/4 lg:p-4 cursor-pointer group hover:bg-primary-darkgray transition-colors duration-200 ${
              selectedType === "Diamante"
                ? "bg-primary-darkgray"
                : "bg-primary-white"
            }`}
          >
            <div className="flex flex-col items-center h-full">
              <input
                type="radio"
                id="adType3"
                className="peer hidden"
                value="Diamante"
                {...register("type", {
                  onChange: (e) => {
                    setSelectedType(e.target.value);
                  },
                })}
              />
              <p
                className={`font-black group-hover:text-primary-white lg:mb-1 ${
                  selectedType === "Diamante"
                    ? "text-primary-white"
                    : "text-primary-darkgray"
                }`}
              >
                Diamante
              </p>
              <span
                className={`font-medium group-hover:text-primary-white peer-checked:text-primary-white ${
                  selectedType === "Diamante"
                    ? "text-primary-white"
                    : "text-primary-darkgray"
                }`}
              >
                Anúncio Diamante <br />
                Destaque na página principal <br />
                Destaque nas pesquisas <br />
                Máxima visibilidade <br />
                Taxa de 12,99%
              </span>
            </div>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <p className="text-primary-darkgray font-black mb-4">Tipo do plano</p>
        <div className="border-2 rounded-lg border-primary-darkgray p-5 text-primary-darkgray">
          <span className="text-primary-darkgray font-black">
            Plano iWork PRO
          </span>
          <p className="py-4 px-8 font-medium">
            Pagamento protegido <br />
            Saque acelerado <br />
            Estoque automático <br />
            Mensagem automática <br />
            Selo PRO no seu perfil
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            className="size-6 md:size-5"
            {...register("agree")}
          />
          <p className="text-primary-darkgray font-semibold">
            Li e aceito todos os{" "}
            <span className="text-primary-yellow">Termos de Contrato</span>
          </p>
        </div>
      </div>
      <div className="mb-6 mt-3 flex justify-end">
        <input
          type="submit"
          value="Anunciar"
          className="cursor-pointer bg-primary-yellow font-semibold text-primary-darkgray rounded px-3 py-1 hover:bg-primary-yellow/70 transition disabled:bg-primary-white/50 disabled:hover:opacity-100 disabled:cursor-not-allowed"
          disabled={disabledButton}
        />
      </div>
    </form>
  );
}

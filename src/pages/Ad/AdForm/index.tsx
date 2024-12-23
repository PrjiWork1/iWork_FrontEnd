import { CategoryContext } from "@context/CategoryContext";
import { UserContext } from "@context/UserContext";
import { useAdForm } from "@hooks/useAdForm";
import { adschema } from "@schemas/adSchema";
import { getAdType } from "@utils/ad/Functions";
import axiosApi from "@utils/axiosApi";
import { TermsLink } from "@utils/links";
import { notify } from "@utils/notify";
import { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface ItemAdvertisement {
  name: string;
  price: number;
}

export function AdForm() {
  const { register, handleSubmit, errors } = useAdForm();
  const [image, setImage] = useState<File | null>(null);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState("");
  const [adModel, setAdModel] = useState("Normal");
  const [itemFields, setItemFields] = useState<ItemAdvertisement[]>([
    { name: "", price: 0 },
  ]);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategoryContext);

  if (!user) {
    return <div>Carregando Usuário...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image: File | undefined = e.target.files?.[0];
    const imageTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg",
      "image/svg+xml",
    ];

    const maxSize = 5 * 1024 * 1024; // Limite de 5 MB em bytes

    if (image && imageTypes.includes(image.type)) {
      if (image.size <= maxSize) {
        setImage(image);
      } else {
        notify("error", "O tamanho da imagem excede o limite de 5 MB.");
      }
    } else {
      notify("error", "Por favor, selecione um arquivo de imagem válido.");
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
    } catch (error) {}
  };

  const onSubmitFunc = async (data: adschema) => {
    if (!image) {
      return notify("error", "Você deve selecionar uma imagem.");
    }

    setDisabledButton((prev) => !prev);

    postAd(data);

    setTimeout(() => {
      setDisabledButton((prev) => !prev);
    }, 3000);
  };

  const postAd = async (data: adschema) => {
    if (adModel == "Normal") {
      if (data.price === "")
        return notify("error", "Você deve informar um valor");
      try {
        await axiosApi.post("/Advertisement/CreateNormalAdvertisement", {
          title: data.title,
          description: data.description,
          urlBanner: await uploadImage(),
          type: getAdType(data.type),
          userId: user.id,
          categoryId: data.category,
          createdAt: new Date(),
          status: 0,
          price: data.price,
          isActive: true,
        });
        notify(
          "success",
          "Seu anúncio foi criado! Agora ele será analisado por um Administrador."
        );
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Erro ao fazer o POST: ", error);
        notify("error", "Um erro ocorreu ao tentar criar o anúncio.");
      }
    } else if (adModel == "Dinamico") {
      try {
        await axiosApi.post("/Advertisement/CreateDynamicAdvertisement", {
          title: data.title,
          description: data.description,
          urlBanner: await uploadImage(),
          type: getAdType(data.type),
          userId: user.id,
          categoryId: data.category,
          createdAt: new Date(),
          price: data.price,
          status: 0,
          itemAdvertisements: itemFields.filter(
            (item) => item.name && item.price > 0
          ),
          isActive: true,
        });
        notify(
          "success",
          "Seu anúncio foi criado! Agora ele será analisado por um Administrador."
        );
        setItemFields([{ name: "", price: 0 }]);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Erro ao fazer o POST: ", error);
        notify("error", "Um erro ocorreu ao tentar criar o anúncio.");
      }
    }
  };

  const handleAddMoreItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItemFields((prev) => [...prev, { name: "", price: 0 }]);
  };

  const handleRemoveItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setItemFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFieldChange = (
    index: number,
    field: keyof ItemAdvertisement,
    value: string | number
  ) => {
    const newFields = [...itemFields];
    if (field === "price") {
      newFields[index][field] =
        typeof value === "string" ? parseFloat(value) : value;
    } else {
      newFields[index][field] = value as string;
    }
    setItemFields(newFields);
  };

  return (
    <form
      className="border-2 rounded border-primary-darkgray p-5 my-14 lg:w-2/3"
      onSubmit={handleSubmit(onSubmitFunc)}
    >
      <div className="flex flex-col gap-2">
        <p className="text-primary-darkgray font-black">Título do anúncio</p>
        <input
          type="text"
          className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-black"
          {...register("title")}
        />
        {errors.title && (
          <small className="text-primary-red font-semibold">
            {errors.title.message}*
          </small>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <p className="text-primary-darkgray font-black mb-4">
          Imagem de capa do anúncio
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

        <small className="font-semibold mt-3">
          Obs: A imagem deve ter no máximo 5 MB de tamanho.
        </small>
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
              className={`font-medium group-hover:text-primary-white text-center ${
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
              className={`font-medium group-hover:text-primary-white text-center ${
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
              onWheel={(e) => e.currentTarget.blur()}
              {...register("price")}
            />
          </div>
          {errors.price && (
            <small className="text-primary-red font-semibold">
              {errors.price.message}*
            </small>
          )}
        </div>
      ) : (
        <div>
          {itemFields.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col gap-2 mt-6">
                <p className="text-primary-darkgray font-black">
                  Título do Item #{index + 1}
                </p>
                <input
                  type="text"
                  className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-bold"
                  value={item.name}
                  onChange={(e) =>
                    handleFieldChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <p className="text-primary-darkgray font-black">
                  Valor do Item #{index + 1}:
                </p>
                <div className="flex items-center">
                  <span className="ml-4 absolute font-bold text-primary-darkgray">
                    R$
                  </span>
                  <input
                    type="number"
                    className="input-number border-2 rounded-lg border-primary-darkgray py-2 px-10 text-primary-darkgray font-bold w-full"
                    onWheel={(e) => e.currentTarget.blur()}
                    value={item.price}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={(e) => handleRemoveItem(e, index)}
                  className="mt-3 bg-primary-darkgray rounded text-primary-white p-2"
                >
                  Remover Item
                </button>
              )}
            </div>
          ))}

          {itemFields.length <= 4 && (
            <button
              className="mt-6 bg-primary-darkgray rounded text-primary-white p-2 w-full"
              onClick={handleAddMoreItems}
            >
              Adicionar item
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-primary-darkgray font-black mt-3">
          Categoria do anúncio
        </p>
        <select
          id="adCategory"
          className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-bold"
          {...register("category")}
        >
          <option value="select" hidden>
            Selecione
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.description}
            </option>
          ))}
        </select>
        {errors.category && (
          <small className="text-primary-red font-semibold">
            {errors.category.message}*
          </small>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-primary-darkgray font-black">Descrição do anúncio</p>
        <textarea
          className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-bold resize-none h-52"
          maxLength={200}
          {...register("description")}
        ></textarea>
        {errors.description && (
          <small className="text-primary-red font-semibold">
            {errors.description.message}*
          </small>
        )}
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
                className="hidden"
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
                className={`font-medium group-hover:text-primary-white text-center ${
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
                className="hidden"
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
                className={`font-medium group-hover:text-primary-white text-center ${
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
                className="hidden"
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
                className={`font-medium group-hover:text-primary-white text-center ${
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
        {errors.type && (
          <small className="text-primary-red font-semibold">
            {errors.type.message}*
          </small>
        )}
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
            <a
              className="text-primary-yellow cursor-pointer hover:underline"
              href={TermsLink}
              target="_blank"
            >
              Termos de Contrato
            </a>
          </p>
        </div>
        {errors.agree && (
          <small className="text-primary-red font-semibold">
            {errors.agree.message}*
          </small>
        )}
      </div>
      <div className="mb-6 mt-3 flex justify-end">
        <button
          type="submit"
          className="cursor-pointer bg-primary-yellow font-semibold text-primary-darkgray rounded px-3 py-1 hover:bg-primary-yellow/70 transition disabled:bg-primary-white/50 disabled:hover:opacity-100 disabled:cursor-not-allowed"
          disabled={disabledButton}
        >
          {disabledButton ? (
            <AiOutlineLoading3Quarters
              color="black"
              className="animate-spin m-2"
            />
          ) : (
            "Anunciar"
          )}
        </button>
      </div>
    </form>
  );
}

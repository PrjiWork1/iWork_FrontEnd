import { useState } from "react";

type Image = {
  name: string;
  size: number;
  lastModified: number;
  type: string;
};

export function AdForm() {
  const [image, setImage] = useState<Image | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image: Image | undefined = e.target.files?.[0];
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

  return (
    <form className="border-2 rounded border-primary-darkgray p-5 my-14 lg:w-2/3">
      <div className="flex flex-col gap-2">
        <p className="text-primary-darkgray font-black">Nome do anúncio</p>
        <input
          type="text"
          className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-black"
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
              name="adImageInput"
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
            className="border-2 rounded-lg border-primary-darkgray flex flex-col p-3 gap-3 items-center justify-center lg:w-1/4 cursor-pointer group hover:bg-primary-darkgray"
          >
            <p className="text-primary-darkgray font-black group-hover:text-primary-white">
              Normal
            </p>
            <span className="text-primary-darkgray font-medium group-hover:text-primary-white">
              O item vendido será exatamente o do título do anúncio cadastrado
              neste formulário
            </span>
          </label>

          <label
            htmlFor="adModel2"
            className="border-2 rounded-lg border-primary-darkgray flex flex-col p-3 gap-3 items-center justify-center lg:w-1/4 lg:p-4 lg:h-[11.5rem] cursor-pointer group hover:bg-primary-darkgray"
          >
            <p className="text-primary-darkgray font-black group-hover:text-primary-white">
              Dinâmico
            </p>
            <span className="text-primary-darkgray font-medium group-hover:text-primary-white">
              Anuncie vários itens, dando opções para que o cliente escolha qual
              item deseja.
            </span>
          </label>
          <input
            type="radio"
            id="adModel1"
            name="adModel"
            className="hidden"
            value="Normal"
          />
          <input
            type="radio"
            id="adModel2"
            name="adModel"
            className="hidden"
            value="Dinamico"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <p className="text-primary-darkgray font-black">Valor do anúncio</p>
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
      {/* <div className="flex flex-col gap-2 mt-3">
        <p className="text-primary-darkgray font-black">
          Quantidade em estoque
        </p>
        <input
          type="number"
          defaultValue={1}
          className="input-number border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-bold"
        />
      </div> */}
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-primary-darkgray font-black">Categoria do anúncio</p>
        <select
          name="adCategory"
          id="adCategory"
          className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-bold"
        >
          <option value="" hidden>
            Selecione
          </option>
        </select>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-primary-darkgray font-black">Descrição do anúncio</p>
        <textarea className="border-2 rounded-lg border-primary-darkgray py-2 px-4 text-primary-darkgray font-bold resize-none h-52"></textarea>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <p className="text-primary-darkgray font-black mb-4">Tipo do anúncio</p>
        <div className="flex items-center flex-col md:flex-row justify-between gap-3">
          <label
            htmlFor="adType1"
            className="border-2 rounded-lg border-primary-darkgray flex flex-col p-3 items-center justify-between w-full lg:w-1/4 lg:p-4 lg:h-[14.4rem] cursor-pointer group hover:bg-primary-darkgray "
          >
            <div className="flex flex-col items-center h-full">
              <p className="text-primary-darkgray font-black group-hover:text-primary-white lg:mb-5">
                Prata
              </p>
              <span className="text-primary-darkgray font-medium group-hover:text-primary-white">
                Anúncio Prata <br /> Taxa básica de 9,99%
              </span>
            </div>
          </label>

          <label
            htmlFor="adType2"
            className="border-2 rounded-lg border-primary-darkgray flex flex-col p-3 gap-3 items-center justify-center w-full lg:w-1/4 lg:p-4 lg:h-[14.4rem] cursor-pointer group hover:bg-primary-darkgray"
          >
            <div className="flex flex-col items-center h-full">
              <p className="text-primary-darkgray font-black group-hover:text-primary-white lg:mb-5">
                Ouro
              </p>
              <span className="text-primary-darkgray font-medium group-hover:text-primary-white">
                Anúncio Ouro <br />
                Destaque na página principal <br />
                Mais visibilidade <br />
                Taxa de 11,99%
              </span>
            </div>
          </label>

          <label
            htmlFor="adType3"
            className="border-2 rounded-lg border-primary-darkgray flex flex-col p-3 gap-3 items-center justify-center w-full lg:w-1/4 lg:p-4 cursor-pointer group hover:bg-primary-darkgray"
          >
            <div className="flex flex-col items-center h-full">
              <p className="text-primary-darkgray font-black group-hover:text-primary-white lg:mb-1">
                Diamante
              </p>
              <span className="text-primary-darkgray font-medium group-hover:text-primary-white">
                Anúncio Diamante <br />
                Destaque na página principal <br />
                Destaque nas pesquisas <br />
                Máxima visibilidade <br />
                Taxa de 12,99%
              </span>
            </div>
          </label>
          <input
            type="radio"
            id="adType1"
            name="adType"
            className="hidden"
            value="Prata"
          />
          <input
            type="radio"
            id="adType2"
            name="adType"
            className="hidden"
            value="Ouro"
          />
          <input
            type="radio"
            id="adType3"
            name="adType"
            className="hidden"
            value="Diamante"
          />
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
          <input type="checkbox" className="size-6 md:size-5" />
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
          className="cursor-pointer bg-primary-yellow font-semibold text-primary-darkgray rounded px-3 py-1 hover:bg-primary-yellow/70 transition"
        />
      </div>
    </form>
  );
}

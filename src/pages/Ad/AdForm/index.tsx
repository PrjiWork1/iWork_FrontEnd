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
    <form className="border-2 rounded border-primary-darkgray p-5 my-14">
      <div className="flex flex-col gap-2">
        <p className="text-primary-darkgray font-black">Nome do anúncio</p>
        <input
          type="text"
          className="border-2 rounded-lg border-primary-darkgray p-2"
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
              id="fileInput"
              name="fileInput"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="bg-primary-darkgray border-none font-extrabold text-white py-3 px-8 rounded-lg"
            >
              Fazer upload
            </label>
          </div>

          <span id="fileName" className="text-gray-700">
            {image ? image.name : "Envie aqui sua imagem"}
          </span>
        </div>
      </div>
    </form>
  );
}

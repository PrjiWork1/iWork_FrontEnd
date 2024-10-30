import { IoMdCheckmark, IoMdClose } from "react-icons/io";

export function AdminAdRow() {
  return (
    <div className="border p-4 cursor-pointer hover:bg-primary-lightgreen/80 transition-all">
      <div className="flex items-center justify-between cursor-default">
        <div className="bg-primary-lightgray size-20"></div>
        <p className="font-bold text-lg">Nome do Anúncio</p>
        <p className="font-bold text-lg">Categoria</p>
        <p className="font-bold text-lg">Valor do Anúncio</p>
        <div className="flex gap-3 text-3xl">
          <IoMdCheckmark cursor={"pointer"} color="green" />
          <IoMdClose cursor={"pointer"} color="red" />
        </div>
      </div>
    </div>
  );
}

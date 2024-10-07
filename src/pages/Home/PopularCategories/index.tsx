export function PopularCategories() {
  return (
    <div>
      <div className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black my-10 md:text-center lg:text-start md:text-xl text-2xl">
          Categorias Populares
        </p>
        <div className="flex flex-wrap md:justify-center flex-col gap-4 md:flex-row md:gap-20">
          <div className="bg-primary-lightgray h-44 w-36"></div>
          <div className="bg-primary-lightgray h-44 w-36"></div>
          <div className="bg-primary-lightgray h-44 w-36"></div>
          <div className="bg-primary-lightgray h-44 w-36"></div>
          <div className="bg-primary-lightgray h-44 w-36"></div>
        </div>
      </div>
      <div className="mt-10">
        {/* <div className="flex items-center justify-center my-4">
          <div className="flex-grow border-t border-primary-black"></div>
          <span className="mx-4 font-extrabold text-center cursor-pointer">
            Ver todas as categorias
          </span>
          <div className="flex-grow border-t border-primary-black"></div>
        </div> */}
      </div>
    </div>
  );
}

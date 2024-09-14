export function FeaturedItems() {
  return (
    <div className="mb-14">
      <div className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black mb-5 md:text-center lg:text-start md:text-xl text-2xl">
          Em Destaque
        </p>
        <div className="flex flex-wrap md:justify-center lg:flex-nowrap flex-col gap-4 md:flex-row md:gap-20">
          <div className="flex flex-col gap-2">
            <div className="bg-primary-lightgray h-44 w-60"></div>
            <p className="text-black font-black">Nome do anúncio</p>
            <div className="flex flex-col items-center gap-3 mt-2">
              <p className="text-white font-extrabold bg-primary-darkblue p-2 rounded-2xl">
                R$ 000,00
              </p>
              <small className="text-black font-medium">@username</small>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-primary-lightgray h-44 w-60"></div>
            <p className="text-black font-black">Nome do anúncio</p>
            <div className="flex flex-col items-center gap-3 mt-2">
              <p className="text-white font-extrabold bg-primary-darkblue p-2 rounded-2xl">
                R$ 000,00
              </p>
              <small className="text-black font-medium">@username</small>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-primary-lightgray h-44 w-60"></div>
            <p className="text-black font-black">Nome do anúncio</p>
            <div className="flex flex-col items-center gap-3 mt-2">
              <p className="text-white font-extrabold bg-primary-darkblue p-2 rounded-2xl">
                R$ 000,00
              </p>
              <small className="text-black font-medium">@username</small>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-primary-lightgray h-44 w-60"></div>
            <p className="text-black font-black">Nome do anúncio</p>
            <div className="flex flex-col items-center gap-3 mt-2">
              <p className="text-white font-extrabold bg-primary-darkblue p-2 rounded-2xl">
                R$ 000,00
              </p>
              <small className="text-black font-medium">@username</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

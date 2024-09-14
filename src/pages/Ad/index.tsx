import { useEffect } from "react";
import { AdForm } from "./AdForm";

export function Ad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-inter">
      <div className="bg-primary-darkblue text-white font-extrabold text-center py-20 text-3xl">
        Banner Anuncio
      </div>
      <div className="md:px-20">
        <AdForm />
      </div>
    </div>
  );
}

import { AdForm } from "./AdForm";
import { UserProvider } from "@context/UserContext";

export function Ad() {
  return (
    <div className="font-inter">
      <div className="bg-primary-darkblue text-primary-white font-extrabold text-center py-20 text-3xl">
        Banner Anuncio
      </div>
      <section className="md:px-20 px-2 lg:flex lg:justify-center">
        <UserProvider>
          <AdForm />
        </UserProvider>
      </section>
    </div>
  );
}

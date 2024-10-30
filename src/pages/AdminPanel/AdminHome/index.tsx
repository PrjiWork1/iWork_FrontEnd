import { Link } from "react-router-dom";

export function AdminHome() {
  return (
    <div className="w-full h-full flex items-center flex-col justify-around">
      <p className="text-base md:text-xl lg:text-3xl font-extrabold text-center tracking-wide">
        Seja bem-vindo à área administrativa!
      </p>

      <p className="text-base md:text-xl lg:text-3xl font-extrabold text-center tracking-wide w-3/4">
        Aqui você pode gerenciar e revisar os anúncios enviados para a
        plataforma.
        <br />
        <br />
        Avalie cada anúncio cuidadosamente e decida se ele deve ser aprovado ou
        não, garantindo a qualidade e a segurança do conteúdo que será exibido
        no site.
      </p>
      <Link to="/">
        <p className="text-base md:text-xl lg:text-3xl font-extrabold text-center tracking-wide cursor-pointer hover:text-primary-darkgreen transition">
          Retornar à tela home
        </p>
      </Link>
    </div>
  );
}

export function AdminHome() {
  return (
    <div className="flex flex-col items-center m-6 gap-16">
      <p className="text-base md:text-xl lg:text-3xl font-extrabold text-center tracking-wide">
        Seja bem-vindo à área administrativa!
      </p>

      <p className="text-base md:text-xl lg:text-3xl font-extrabold text-center tracking-wide break-words md:w-[50rem]">
        Aqui você pode gerenciar e revisar os anúncios enviados para a
        plataforma.
        <br />
        <br />
        Avalie cada anúncio cuidadosamente e decida se ele deve ser aprovado ou
        não, garantindo a qualidade e a segurança do conteúdo que será exibido
        no site.
      </p>
    </div>
  );
}

export function InfoCards() {
  return (
    <section className="mb-14">
      <div className="flex flex-col gap-12 md:flex-row md:gap-20 px-3 md:px-0">
        <div className="border border-black p-5">
          <p className="text-primary-black font-black text-lg text-center">
            Compra segura
          </p>
          <span className="text-primary-black">
            entrega garantida ou o seu dinheiro de volta.
          </span>
        </div>
        <div className="border border-black p-5">
          <p className="text-primary-black font-black text-lg text-center">
            Suporte 24 horas
          </p>
          <span className="text-primary-black">
            equipe pronta para te atender sempre que precisar.
          </span>
        </div>
        <div className="border border-black p-5">
          <p className="text-primary-black font-black text-lg text-center">
            Programa de recompensa
          </p>
          <span className="text-primary-black">
            seja recompensado pelas suas compras e vendas.
          </span>
        </div>
      </div>
    </section>
  );
}

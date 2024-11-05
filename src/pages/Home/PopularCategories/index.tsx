import category1 from "@assets/Categories/DesignDigital.svg";
import category2 from "@assets/Categories/DesignGrafico.svg";
import category3 from "@assets/Categories/Marketing.svg";
import category4 from "@assets/Categories/Edicao.svg";
import category5 from "@assets/Categories/Web.svg";
import { Link } from "react-router-dom";

export function PopularCategories() {
  return (
    <section>
      <div className="flex flex-col items-center md:block">
        <p className="text-primary-darkgreen font-black my-10 md:text-center lg:text-start md:text-xl text-2xl">
          Categorias Populares
        </p>
        <div className="flex flex-wrap md:justify-center flex-col gap-4 md:flex-row md:gap-20">
          <Link to="/category/Design_Digital">
            <img
              src={category1}
              alt="Design Digital"
              className="categorycard"
            />
          </Link>
          <Link to="/category/Design_Gráfico">
            <img
              src={category2}
              alt="Design Gráfico"
              className="categorycard"
            />
          </Link>
          <Link to="/category/Marketing_Digital">
            <img
              src={category3}
              alt="Marketing Digital"
              className="categorycard"
            />
          </Link>
          <Link to="/category/Edição_de_Vídeo_e_Áudio">
            <img
              src={category4}
              alt="Edição de Vídeo e Áudio"
              className="categorycard"
            />
          </Link>
          <Link to="/category/Desenvolvimento_Web">
            <img
              src={category5}
              alt="Desenvolvimento para Web"
              className="categorycard"
            />
          </Link>
        </div>
      </div>
      <div className="mt-14">
        {/* <div className="flex items-center justify-center my-4">
          <div className="flex-grow border-t border-primary-black"></div>
          <span className="mx-4 font-extrabold text-center cursor-pointer">
            Ver todas as categorias
          </span>
          <div className="flex-grow border-t border-primary-black"></div>
        </div> */}
      </div>
    </section>
  );
}

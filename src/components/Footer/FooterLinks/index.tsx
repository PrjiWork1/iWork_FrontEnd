import { Link } from "react-router-dom";

export function FooterLinks() {
  return (
    <ul className="text-primary-white flex flex-col gap-4">
      <li className="font-extrabold text-xl">Acesso rápido</li>
      <li>
        <Link to="/create-ad">
          <span className="footer-option">Anunciar</span>
        </Link>
      </li>
      <li>
        <span className="footer-option">Blog</span>
      </li>
      <li>
        <span className="footer-option">Perguntas frequentes</span>
      </li>
      <li>
        <span className="footer-option">Categorias</span>
      </li>
      <li>
        <span className="footer-option">Central de ajuda</span>
      </li>
    </ul>
  );
}

import { TermsLink } from "@utils/links";

export function FooterInstitutionalLinks() {
  return (
    <ul className="text-primary-white flex flex-col gap-4">
      <li className="font-extrabold text-xl">Institucional</li>
      <li>
        <a className="footer-option" href={TermsLink} target="_blank">
          Termos de uso
        </a>
      </li>
      <li>
        <span className="footer-option">Política de privacidade</span>
      </li>
      <li>
        <span className="footer-option">Política de reembolso</span>
      </li>
      <li>
        <span className="footer-option">Trabalhe conosco</span>
      </li>
    </ul>
  );
}

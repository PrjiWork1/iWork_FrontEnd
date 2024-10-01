import { FooterAbout } from "./FooterAbout";
import { FooterInstitutionalLinks } from "./FooterInstitutionalLinks";
import { FooterLinks } from "./FooterLinks";

export function Footer() {
  return (
    <div className="font-inter bg-primary-darkgreen">
      <div className="flex flex-col md:flex-row justify-around bg-primary-darkgreen py-8 w-[85%] gap-10 md:gap-0 ml-10 md:ml-0">
        <div className="md:w-1/4">
          <FooterAbout />
        </div>
        <div>
          <FooterLinks />
        </div>
        <div>
          <FooterInstitutionalLinks />
        </div>
      </div>
      <div className="bg-primary-black flex justify-center py-5">
        <p className="text-primary-white font-light text-center text-sm md:text-base">
          © iWORK 2024 | TODOS OS DIREITOS RESERVADOS
        </p>
      </div>
    </div>
  );
}

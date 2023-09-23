import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src="/logo-purple.svg"
            width={115}
            height={38}
            alt="Flexibble"
          />

          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Flexibble is the world's leading community for creatives to share,
            grow, and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {footerLinks.map((footerLink, index) => (
            <div key={index} className="footer_column">
              <h4 className="font-semibold">{footerLink.title}</h4>
              {footerLink.links.map((link, index) => (
                <ul key={index} className="flex flex-col gap-2 font-normal">
                  <Link href="/">{link}</Link>
                </ul>
              ))}
            </div>
          ))}
        </div>

        <div className="flexBetween footer_copyright">
          <p>@ 2023 Flexibble. All rights reserved</p>
          <p className="text-gray">
            <span className="text-black font-semibold">10,214</span> projects
            submitted
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

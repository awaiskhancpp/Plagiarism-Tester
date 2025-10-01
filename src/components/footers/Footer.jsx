import { Berkshire_Swash } from "next/font/google";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";

const bs = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

const dmSans_lighter = DM_Sans({
  subsets: ["latin"],
  weight: ["300"],
});

export default function Footer() {
  return (
    <>
      <div className=" bg-[#E4E4E4]">
        <div
          className={`${dmSans_lighter.className} w-full bg-black text-[#E4E4E4] `}
        >
          <div className="max-w-7xl mx-auto px-9 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <h3 className={`${bs.className} text-4xl mb-4`}>SleuthInk</h3>
              <p className="text-lg">
                Your trusted partner for document integrity and plagiarism
                detection.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-2xl font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#F8D56B] transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="hover:text-[#F8D56B] transition"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-[#F8D56B] transition"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#F8D56B] transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-2xl font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-[#F8D56B] transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-[#F8D56B] transition"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-[#F8D56B] transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-2xl font-semibold">Connect With Us</h4>
              <div className="flex justify-start items-center  space-x-4">
                <Link href="#" className="hover:text-[#F8D56B] transition">
                  <BsTwitter />
                </Link>
                <Link href="#" className="hover:text-[#F8D56B] transition">
                  <BsLinkedin />
                </Link>
                <Link href="#" className="hover:text-[#F8D56B] transition">
                  <BsInstagram />
                </Link>
              </div>
              <p className="text-lg mt-4">support@sleuthink.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#E4E4E4] pt-0 "></div>
    </>
  );
}

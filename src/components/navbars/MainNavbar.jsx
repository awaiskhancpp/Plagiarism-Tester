import { Raleway, DM_Sans } from "next/font/google";
import { LiaHomeSolid } from "react-icons/lia";
import { CiLogin } from "react-icons/ci";

import Link from "next/link";

const rw = Raleway({
  subsets: ["latin"],
  weight: ["500"],
});

const ds = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar() {
  return (
    <>
      <div className={`${ds.className} w-full h-20  top-0 right-0 z-50 fixed`}>
        <div className="flex justify-between items-center h-20 px-6  backdrop-blur-sm bg-white/0  py-2">
          <Link
            href="/"
            className=" tracking-widest border-none relative text-sm md:text-base text-gray-300 font-extralight"
          >
            <LiaHomeSolid className="text-4xl" />
          </Link>

          <Link
            href="/login"
            className="tracking-widest border-none relative text-sm md:text-base text-gray-300"
          >
            <CiLogin className="text-4xl" />
          </Link>
        </div>
      </div>
    </>
  );
}

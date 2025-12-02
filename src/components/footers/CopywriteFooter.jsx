import { DM_Sans } from "next/font/google";

const dmSans_lighter = DM_Sans({
  subsets: ["latin"],
  weight: ["300"],
});

export default function CopywriteFooter() {
  return (
    <>
      <div
        className={`${dmSans_lighter.className} w-full bg-black text-white py-4 text-center md:text-left `}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-base">
          <div className="mb-2 md:mb-0">
            © {new Date().getFullYear()} SleuthInk. All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { LiaSearchSolid } from "react-icons/lia";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";
import RotatingBox from "@/components/RotatingBox";
import { Berkshire_Swash, DM_Sans, Raleway, Roboto } from "next/font/google";
import Grid from "@/components/Grid";
import TestimonialsSection from "@/components/TestimonialsSection";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["1000"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

const dmSans_light = DM_Sans({
  subsets: ["latin-ext"],
  weight: ["900"],
});

const dmSans_lighter = DM_Sans({
  subsets: ["latin"],
  weight: ["200"],
});

const bs = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

const rw = Raleway({
  subsets: ["latin"],
  weight: ["200"],
});

const rw_bold = Raleway({
  subsets: ["latin"],
  weight: ["900"],
});

const rw_less_bold = Raleway({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  return (
    <>
      <title>SleuthInk - Plagiarism Detection</title>
      <Grid height={485} />
      {/* <CustomCursor /> */}
      <div className="w-full h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 flex items-center justify-center border-black relative overflow-hidden">
        <div className="text-center px-4 relative z-10">
          <h2 className={`${rw.className} text-3xl mb-20 tracking-[15px]`}>
            INTRODUCING
          </h2>
          <h1
            className={`${bs.className} text-7xl md:text-8xl lg:text-9xl xl:text-[16rem] tracking-tighter leading-tight drop-shadow-[0_5px_15px_rgba(255,255,255,0.3)]`}
          >
            SleuthInk.
          </h1>
          <h2 className={`${rw.className} text-3xl mt-20 tracking-[15px]`}>
            POWERFUL PLAGIARISM DETECTION
          </h2>
        </div>
      </div>

      <div
        id="header"
        className="w-full h-auto bg-gradient-to-r from-black to-gray-900  flex items-center justify-center"
      >
        <h1
          className={`${rw.className} text-center text-4xl md:text-5xl lg:text-[6rem] tracking-tighter  text-white`}
        >
          Your Partner in{" "}
          <div className="bg-gradient-to-r from-purple-300  via-purple-500 p-2 to-purple-300 bg-clip-text text-transparent">
            Academic Integrity
          </div>
        </h1>
      </div>

      <div className="w-full lg:h-auto flex flex-col lg:flex-row bg-gradient-to-r from-black to-gray-900">
        {/* Text Content */}
        <div className="w-full lg:w-2/3 flex items-center lg:pt-24 lg:px-24">
          <div className="text-white border-white border-l-4 pl-10 pt-15 pb-8  bg-gradient-to-r from-gray-900 to-transparent">
            <p
              className={`${dmSans_lighter.className} tracking-tight text-lg md:text-xl lg:text-3xl mb-8 text-gray-300`}
            >
              SleuthInk stands out with cutting-edge plagiarism detection
              tailored for students, teachers, and developers. Our platform
              leverages AI to deliver precise, real-time results, surpassing
              free tools in{" "}
              <span className="bg-gradient-to-r from-purple-300 to-purple-600 bg-clip-text text-transparent px-1">
                accuracy and reliability
              </span>
              . With a strong focus on privacy, usability, and originality,
              SleuthInk helps you maintain integrity in assignments, grading,
              and research. Its intuitive dashboard and detailed reports make
              tracking sources and citations effortless. By integrating
              seamlessly with existing workflows, it ensures every submission
              remains{" "}
              <span className="bg-gradient-to-r from-purple-300 to-purple-600 bg-clip-text text-transparent px-1">
                authentic and trustworthy
              </span>
              .
            </p>

            <Link
              href="/register"
              className={`${roboto.className} underline  tracking-tight px-14 py-8 text-center mt-4 text-purple-200 bg-gradient-to-r from-purple-900 to-purple-500 hover:to-purple-500 hover:from-purple-600 hover:text-gray-300 text-2xl   inline-flex items-center transition-colors duration-700 ease-in-out justify-center`}
            >
              Try It Now
            </Link>
          </div>
        </div>
        <div className="w-full pt-24 pr-20 lg:w-1/3 flex items-center justify-center">
          <div className="relative w-62 h-62 group">
            {/* Outer rotating gradient ring with trail */}
            <div className="absolute inset-0 rounded-full border border-gray-200/20 animate-[spin_26s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,255,255,0.04)_0%,transparent_60%,rgba(255,255,255,0.06)_100%)] shadow-[0_0_30px_rgba(255,255,255,0.05)] blur-[0.3px]">
              <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1 shadow-[0_0_10px_rgba(255,255,255,0.9)] blur-[3px]"></div>
            </div>

            {/* Middle ring - counter rotation with motion blur */}
            <div className="absolute inset-6 rounded-full border border-gray-200/20 animate-[spin_18s_linear_infinite_reverse] bg-[conic-gradient(from_180deg,rgba(255,255,255,0.02),transparent_70%)] shadow-[0_0_20px_rgba(255,255,255,0.03)]">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2 -translate-y-1 shadow-[0_0_3px_rgba(255,255,255,0.4)]"></div>
            </div>

            {/* Inner pulse ring */}
            <div className="absolute inset-12 rounded-full border border-gray-100/10 animate-[pulse_3s_ease-in-out_infinite] blur-[3px]"></div>

            {/* Floating reactive orbs */}
            <div
              className="absolute top-16 right-14 w-3.5 h-3.5 bg-purple-400/80 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.8)] backdrop-blur-md animate-[floatY_4s_ease-in-out_infinite]"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute bottom-20 left-12 w-2.5 h-2.5 bg-purple-300/70 rounded-full shadow-[0_0_13px_rgba(192,132,252,0.6)] backdrop-blur-sm animate-[floatY_4s_ease-in-out_infinite]"
              style={{ animationDelay: "2s" }}
            ></div>

            {/* Orbiting small particle */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-[orbit_8s_linear_infinite]"></div>
            </div>

            {/* Center core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Ambient diffusion glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] rounded-full blur-2xl scale-150 animate-[pulse_5s_ease-in-out_infinite]"></div>

                {/* Glassy holographic core */}
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_30px_rgba(255,255,255,0.06),inset_0_0_15px_rgba(255,255,255,0.05)] hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]">
                  <div className="absolute w-10 h-10 border-2 border-gray-200/40 rounded-full"></div>
                  <div className="absolute w-6 h-0.5 bg-gray-200/30 rotate-45 translate-x-6 translate-y-5"></div>
                </div>
              </div>
            </div>

            {/* Minimal sleek corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-gray-400/20 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-gray-400/20 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-gray-400/20 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-gray-400/20 rounded-br-xl"></div>

            {/* Custom keyframes */}
            <style jsx>{`
              @keyframes floatY {
                0%,
                100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-6px);
                }
              }
              @keyframes orbit {
                0% {
                  transform: rotate(0deg) translateX(23px) rotate(0deg);
                }
                100% {
                  transform: rotate(360deg) translateX(23px) rotate(-360deg);
                }
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* detection-methods */}
      <div
        id="detection-methods"
        className="w-full h-[35vh] bg-gradient-to-r from-black to-gray-900  flex items-center justify-center"
      >
        <h1
          className={`${rw.className} text-center text-4xl md:text-5xl lg:text-[7rem] tracking-tighter bg-gradient-to-r from-purple-300  via-purple-500 to-purple-300 bg-clip-text text-transparent p-1`}
        >
          Detection Methods
        </h1>
      </div>

      <div className="p-1 bg-gradient-to-r from-black to-gray-900 text-black">
        <div className="w-full lg:h-[120vh]  flex justify-center rounded-4xl ">
          <div className="w-5/5  h-full p-4 md:p-6 lg:px-48 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-4 md:grid-rows-2 lg:grid-rows-2 gap-3 md:gap-4 lg:gap-2">
            <div className="flex items-center justify-center  aspect-square w-full h-full border-gray-200 border-r-[2px] border-b-[2px] transition-all duration-300">
              <div className="text-center p-2 md:p-3 lg:p-4">
                <h1
                  className={`${dmSans_light.className} tracking-tighter text-2xl md:text-xl lg:text-5xl font-bold text-gray-200 m-2 md:m-3`}
                >
                  Surface Similarity Analysis
                </h1>
                <p
                  className={`${dmSans_lighter.className} tracking-tight text-xl md:text-lg lg:text-3xl text-gray-200 p-2 md:p-3 lg:py-4 lg:px-14`}
                >
                  Detects{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                    exact and near{" "}
                  </span>
                  word-level matches, rating overlap as high, medium, or low.
                </p>
              </div>
            </div>

            {/* Levenshtein Box */}

            <div className=" flex items-center justify-center   transition-all duration-300  aspect-square w-full h-full  ">
              <div className="text-center p-2 md:p-3 lg:p-4 ">
                <h1
                  className={`${dmSans_light.className} tracking-tighter text-2xl md:text-xl lg:text-5xl  m-2 md:m-3 text-gray-200`}
                >
                  Contextual Meaning Analysis
                </h1>
                <p
                  className={`${dmSans_lighter.className} tracking-tight text-xl md:text-lg lg:text-3xl p-2 md:p-3 lg:px-14 text-gray-200`}
                >
                  Understands{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                    semantics and phrasing
                  </span>{" "}
                  to identify paraphrased or AI-generated text.
                </p>
              </div>
            </div>

            {/* N-Gram Box */}

            <div className=" flex items-center justify-center transition-all duration-300  aspect-square w-full h-full">
              <div className="text-center p-2 md:p-3 lg:p-4">
                <h1
                  className={`${dmSans_light.className} tracking-tighter text-2xl md:text-xl lg:text-5xl m-2 md:m-3 text-gray-200`}
                >
                  Cross-Document Comparison
                </h1>
                <p
                  className={`${dmSans_lighter.className} tracking-tight text-xl md:text-lg lg:text-3xl  p-2 md:p-3 lg:px-14 text-gray-200`}
                >
                  Compares{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                    multiple documents
                  </span>{" "}
                  at once to uncover shared or duplicated content.
                </p>
              </div>
            </div>

            {/* BERT Box */}

            <div className="flex items-center justify-center border-gray-200 border-l-[2px] border-t-[2px] transition-all duration-300 aspect-square w-full h-full">
              <div className="text-center p-2 md:p-3 lg:p-4">
                <h1
                  className={`${dmSans_light.className} tracking-tighter text-2xl md:text-xl lg:text-5xl  m-2 md:m-3 text-gray-200`}
                >
                  Internal Database Matching
                </h1>
                <p
                  className={`${dmSans_lighter.className} tracking-tight text-xl md:text-lg lg:text-3xl  p-2 md:p-3 lg:px-14 text-gray-200`}
                >
                  Checks submissions against your{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                    private database
                  </span>{" "}
                  to detect reused or previously uploaded material.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* privacy-and-ethics */}
      <div
        id="why-choose"
        className="w-full h-[35vh] bg-gradient-to-r from-black to-gray-900  flex items-center justify-center pt-20"
      >
        <h1
          className={`${rw.className} text-center text-4xl md:text-5xl lg:text-[7rem] tracking-tighter bg-gradient-to-r from-purple-300  via-purple-500 to-purple-300 bg-clip-text text-transparent p-1`}
        >
          Privacy & Ethics
        </h1>
      </div>
      <div className="h-auto pt-20 w-full bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-gray-200 text-center grid grid-cols-3 gap-x-6 gap-y-12 px-44">
          {/* Left Box */}
          <div
            className="border-white w-full h-[55vh] p-8 bg-gradient-to-r from-gray-900 to-transparent 
      flex flex-col justify-center items-center text-center translate-y-16"
          >
            <div
              className={`${dmSans_light.className} text-4xl font-bold tracking-tighter`}
            >
              Locked Tight
            </div>
            <h1
              className={`${dmSans_lighter.className} tracking-tight text-3xl mt-6 leading-snug`}
            >
              Your documents are{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                encrypted
              </span>{" "}
              during upload and analysis, keeping them safe from prying eyes.
            </h1>
          </div>

          {/* Middle Box (higher) */}
          <div
            className="border-white w-full h-[55vh] p-8 bg-gradient-to-r from-gray-900 to-transparent
      flex flex-col justify-center items-center text-center -translate-y-14"
          >
            <div
              className={`${dmSans_light.className} text-4xl font-bold tracking-tighter`}
            >
              Gone in a Flash
            </div>
            <h1
              className={`${dmSans_lighter.className} tracking-tight text-3xl mt-6 leading-snug`}
            >
              We delete your data right after generating your report, leaving
              <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                {" "}
                no trace behind
              </span>
              .
            </h1>
          </div>

          {/* Right Box */}
          <div
            className="border-white w-full h-[55vh] p-8 bg-gradient-to-r from-gray-900 to-transparent
      flex flex-col justify-center items-center text-center translate-y-16"
          >
            <div
              className={`${dmSans_light.className} text-4xl font-bold tracking-tighter`}
            >
              Fair and Square
            </div>
            <h1
              className={`${dmSans_lighter.className} tracking-tight text-3xl mt-6 leading-snug`}
            >
              We use only open, trusted sources, ensuring honest and{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                ethical plagiarism
              </span>{" "}
              checks.
            </h1>
          </div>
        </div>
      </div>
      {/* User Profiles Section */}
      <div className="w-full h-auto py-24 bg-gradient-to-r from-black to-gray-900 flex flex-col items-center justify-center">
        <TestimonialsSection />
      </div>
    </>
  );
}

"use client";
import { LiaSearchSolid } from "react-icons/lia";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";
import RotatingBox from "@/components/RotatingBox";
import { Berkshire_Swash, DM_Sans, Raleway } from "next/font/google";
import Grid from "@/components/Grid";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["1000"],
});

const dmSans_light = DM_Sans({
  subsets: ["latin"],
  weight: ["600"],
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
      <Grid height={550} />
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
      {/* <div
        id="why-choose"
        className="w-full h-[35vh]  flex items-center justify-center bg-gradient-to-r from-black to-gray-800"
      >
        <h1
          className={`${rw_bold.className} text-center p-1 text-4xl md:text-5xl lg:text-[7rem] tracking-tighter  text-gray-200 `}
        >
          Why Choose SleuthInk?
        </h1>
      </div> */}
      <div className="w-full lg:h-[120vh] flex flex-col lg:flex-row bg-gradient-to-r from-black to-gray-900">
        {/* Text Content */}
        <div className="w-full lg:w-2/3 flex items-center p-8 md:p-12 lg:p-24">
          <div className="text-white">
            <h1
              className={`${rw.className} text-4xl md:text-5xl lg:text-8xl mb-6 md:mb-8 lg:mb-10 tracking-tighter leading-tight`}
            >
              Your Partner in{" "}
              <span className="bg-gradient-to-r from-purple-300  via-purple-500 to-purple-300 bg-clip-text text-transparent">
                Academic Integrity
              </span>
            </h1>

            <p
              className={`${dmSans_lighter.className}  text-lg md:text-xl lg:text-4xl mb-8 text-gray-300`}
            >
              SleuthInk stands out with cutting-edge plagiarism detection
              tailored for students, teachers, and researchers. Our platform
              leverages AI to deliver precise, real-time results, surpassing
              free tools in{" "}
              <span className="bg-gradient-to-r from-purple-300 to-purple-600 bg-clip-text text-transparent px-1  ">
                accuracy and reliability
              </span>
              . With a focus on privacy and ease of use, SleuthInk helps you
              maintain originality in assignments, grading, and research.
            </p>

            <Link
              href="/register"
              className={`${rw_less_bold.className} px-17 py-10 text-center mt-4 text-purple-200 bg-gradient-to-r from-purple-700 to-purple-400 hover:to-purple-500 hover:from-purple-900 hover:text-gray-300 text-2xl inline-flex items-center transition-colors duration-700 ease-in-out justify-center`}
            >
              Try It Now
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex items-center justify-center p-8">
          <div className="relative w-80 h-80">
            {/* Outer rotating ring */}
            <div
              className="absolute inset-0 rounded-full border border-gray-400/30 animate-spin"
              style={{ animationDuration: "20s" }}
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1"></div>
            </div>

            {/* Middle rotating ring - opposite direction */}
            <div
              className="absolute inset-4 rounded-full border border-gray-600/50 animate-spin"
              style={{
                animationDuration: "15s",
                animationDirection: "reverse",
              }}
            >
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1"></div>
            </div>

            <div
              className="absolute top-16 right-16 w-3 h-3 bg-purple-400 rotate-45 rounded-full animate-pulse"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute bottom-20 left-12 w-2 h-2 bg-purple-300 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Central icon area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Subtle glow behind icon */}
                <div className="absolute inset-0 bg-white/5 rounded-full blur-md scale-150"></div>

                {/* Modern search/scan icon using CSS */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute w-10 h-10 border-2 border-gray-300/40 rounded-full"></div>
                  <div className="absolute w-6 h-0.5 bg-gray-300/40 rotate-45 translate-x-6 translate-y-5"></div>
                </div>
              </div>
            </div>

            {/* Subtle corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gray-300/40"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gray-300/40"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-gray-300/40"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-gray-300/40"></div>
          </div>
        </div>
      </div>

      {/* how-it-works */}

      {/* detection-methods */}
      <div
        id="why-choose"
        className="w-full h-[35vh] bg-gradient-to-r from-black to-gray-900  flex items-center justify-center"
      >
        <h1
          className={`${rw.className} text-center text-4xl md:text-5xl lg:text-[10rem] tracking-tighter bg-gradient-to-r from-purple-300  via-purple-500 to-purple-300 bg-clip-text text-transparent p-1`}
        >
          Detection Methods
        </h1>
      </div>

      <div className="p-1 bg-gradient-to-r from-black to-gray-900 text-black">
        <div className="w-full lg:h-[140vh]  flex justify-center rounded-4xl ">
          <div className="w-4/5  h-full p-4 md:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-4 md:grid-rows-2 lg:grid-rows-2 gap-3 md:gap-4 lg:gap-2">
            {/* TF-IDF Box */}

            <div className="flex items-center justify-center  aspect-square w-full h-full border-gray-200 border-r-[1px] border-b-[1px] transition-all duration-300">
              <div className="text-center p-2 md:p-3 lg:p-4">
                <h1
                  className={`${rw_less_bold.className} text-2xl md:text-xl lg:text-6xl text-gray-200 m-2 md:m-3`}
                >
                  TF-IDF with Cosine Similarity
                </h1>
                <p
                  className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-4xl text-gray-200 p-2 md:p-3 lg:p-4`}
                >
                  Finds{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                    exact text matches
                  </span>
                  , flagging high, medium, or low in a clear report.
                </p>
              </div>
            </div>

            {/* Levenshtein Box */}

            <div className=" flex items-center justify-center   transition-all duration-300  aspect-square w-full h-full  ">
              <div className="text-center p-2 md:p-3 lg:p-4 ">
                <h1
                  className={`${rw_less_bold.className} text-2xl md:text-xl lg:text-6xl  m-2 md:m-3 text-gray-200`}
                >
                  Levenshtein Distance
                </h1>
                <p
                  className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-4xl p-2 md:p-3 lg:p-4 text-gray-200`}
                >
                  Spots tiny edits, catching{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                    tweaked words
                  </span>{" "}
                  in your report.
                </p>
              </div>
            </div>

            {/* N-Gram Box */}

            <div className=" flex items-center justify-center transition-all duration-300  aspect-square w-full h-full">
              <div className="text-center p-2 md:p-3 lg:p-4">
                <h1
                  className={`${rw_less_bold.className} text-2xl md:text-xl lg:text-6xl m-2 md:m-3 text-gray-200`}
                >
                  N-Gram Overlap with Jaccard Similarity
                </h1>
                <p
                  className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-4xl  p-2 md:p-3 lg:p-4 text-gray-200`}
                >
                  Detects{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                    shuffled or rephrased text
                  </span>
                  , marking reordered bits.
                </p>
              </div>
            </div>

            {/* BERT Box */}

            <div className="flex items-center justify-center border-gray-200 border-l-[1px] border-t-[1px] transition-all duration-300 aspect-square w-full h-full">
              <div className="text-center p-2 md:p-3 lg:p-4">
                <h1
                  className={`${rw_less_bold.className} text-2xl md:text-xl lg:text-6xl  m-2 md:m-3 text-gray-200`}
                >
                  Retrieval Augmented Generation
                </h1>
                <p
                  className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-4xl  p-2 md:p-3 lg:p-4 text-gray-200`}
                >
                  Nabs reworded or{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                    AI-made text
                  </span>{" "}
                  by checking meaning.
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
          className={`${rw.className} text-center text-4xl md:text-5xl lg:text-[10rem] tracking-tighter bg-gradient-to-r from-purple-300  via-purple-500 to-purple-300 bg-clip-text text-transparent p-1`}
        >
          Privacy & Ethics
        </h1>
      </div>
      <div className="h-auto p-20 w-full bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-gray-200 text-center mb-20  px-56">
          <div className="mb-20">
            <div className={`${rw_less_bold.className} text-6xl `}>
              Locked Tight
            </div>
            <h1 className={`${dmSans_lighter.className} text-4xl mt-10`}>
              <span>
                Your documents are{" "}
                <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                  encrypted
                </span>{" "}
                during upload and analysis, keeping them safe from prying eyes.
              </span>
            </h1>
          </div>
          <div className="mb-20">
            <div className={`${rw_less_bold.className} text-6xl mt-10`}>
              Gone in a Flash
            </div>
            <h1 className={`${dmSans_lighter.className} text-4xl my-10 `}>
              <span className="">
                We delete your data right after generating your report, leaving
                <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                  {" "}
                  no trace behind
                </span>
                .
              </span>
            </h1>
          </div>
          <div>
            <div className={`${rw_less_bold.className} text-6xl mt-10`}>
              Fair and Square
            </div>
            <h1 className={`${dmSans_lighter.className} text-4xl mt-10`}>
              <span>
                We use only open, trusted sources, ensuring honest and{" "}
                <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                  ethical plagiarism
                </span>{" "}
                checks.
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

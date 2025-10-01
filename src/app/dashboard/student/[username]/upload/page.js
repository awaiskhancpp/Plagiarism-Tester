// src/app/dashboard/student/report/upload/page.js
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { FiFile, FiX } from "react-icons/fi";
import RotatingBox from "@/components/RotatingBox";
import { DM_Sans, Raleway } from "next/font/google";
import axios from "axios";
import Grid from "@/components/Grid";
import { useSession } from "next-auth/react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

const rw = Raleway({
  subsets: ["latin"],
  weight: ["500"],
});

const rw_bold = Raleway({
  subsets: ["latin"],
  weight: ["700"],
});

async function postPlagiarismCheck(formData) {
  // no need to grab token—cookie is sent automatically
  const response = await axios.post("/api/report/check", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile.type === "application/pdf" ||
      droppedFile.type === "application/msword" ||
      droppedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a PDF, DOC, or DOCX file");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/msword" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Please upload a PDF, DOC, or DOCX file");
      }
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // 1) Upload the file to /check-plagiarism (with token in headers)
      const res = await postPlagiarismCheck(formData);

      localStorage.setItem("report", JSON.stringify(res));
      console.log("saves");
      setTimeout(() => {
        router.push(
          `/dashboard/student/${session.user.name
            .toLowerCase()
            .replace(" ", "-")}/report/${res.id}`
        );
      }, 10000);
    } catch (err) {
      console.error(err);
      setError("An error occurred during upload. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <title>Upload Document - SleuthInk</title>

      <div className="h-auto bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
        <Grid height={151} />
        <div className="max-w-4xl mx-auto">
          <h1 className={`${rw_bold.className} text-8xl mb-6 text-center`}>
            Check for{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">
              Plagiarism
            </span>
          </h1>

          <p
            className={`${rw.className} text-lg md:text-xl text-center mb-12 text-gray-400`}
          >
            Upload your document to analyze it with our advanced plagiarism
            detection system
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`border-[1px] border-dashed p-20 text-center rounded-2xl transition-all 
              ${file ? "border-purple-500" : "border-gray-600 "} 
              ${error ? "border-red-500" : ""}`}
            >
              {!file ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <LiaCloudUploadAltSolid className="text-5xl text-purple-400" />
                  </div>
                  <h2 className={`${rw.className} text-xl`}>
                    Drag & drop your file here
                  </h2>
                  <p className={`${dmSans.className} text-gray-400`}>or</p>
                  <label className="cursor-pointer inline-block">
                    <span
                      className={`${rw.className} bg-gradient-to-r from-purple-400 to-purple-700 text-white px-6 py-3 rounded-lg`}
                    >
                      Browse Files
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                  <p
                    className={`${dmSans.className} text-sm text-gray-500 mt-4`}
                  >
                    Supported formats: PDF, DOC, DOCX
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-3">
                    <FiFile className="text-2xl text-purple-400" />
                    <span className={`${rw.className} text-lg`}>
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-gray-400 hover:text-white"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>
                  <p className={`${dmSans.className} text-sm text-gray-400`}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              {error && (
                <p className={`${dmSans.className} text-red-400 mt-4`}>
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <RotatingBox className="inline-block">
                <button
                  type="submit"
                  disabled={!file || isLoading}
                  className={`${
                    rw.className
                  } px-16 py-8 text-center text-gray-200 bg-gradient-to-r from-purple-300 to-purple-700 hover:to-purple-500 text-xl mt-7 inline-flex items-center justify-center
                  ${!file || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Document"
                  )}
                </button>
              </RotatingBox>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

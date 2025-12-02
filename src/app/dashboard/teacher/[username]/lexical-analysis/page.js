"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { FiFile, FiX } from "react-icons/fi";
import RotatingBox from "@/components/RotatingBox";
import { DM_Sans, Inter, Raleway } from "next/font/google";
import axios from "axios";
import Grid from "@/components/Grid";
import { useSession } from "next-auth/react";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["600"] });
const rw = Raleway({ subsets: ["latin"], weight: ["500"] });
const rw_bold = Raleway({ subsets: ["latin"], weight: ["700"] });
const inter = Inter({ subsets: ["latin"], weight: "400" });

const validTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = Array.from(e.dataTransfer.files || []);
    const valid = dropped.filter((f) => validTypes.includes(f.type));
    if (valid.length) {
      setFiles((prev) => [...prev, ...valid]);
      setError(null);
    } else {
      setError("Please upload PDF, DOC, or DOCX files only");
    }
  }, []);

  const handleChange = (e) => {
    const picked = Array.from(e.target.files || []);
    const valid = picked.filter((f) => validTypes.includes(f.type));
    if (valid.length) {
      setFiles((prev) => [...prev, ...valid]);
      setError(null);
    } else {
      setError("Please upload PDF, DOC, or DOCX files only");
    }
  };

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
    return interval;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      setError("Please select at least 1 file");
      return;
    }

    setIsLoading(true);
    setError(null);
    const progressInterval = simulateProgress();

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      const res = await axios.post(
        "/api/v1/teacher/lexical-analysis",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      clearInterval(progressInterval);
      setProgress(100);

      const data = res.data;
      localStorage.setItem(`lexical:${data.id}`, JSON.stringify(data));

      setTimeout(() => {
        router.push(
          `/dashboard/teacher/${session.user.name
            .toLowerCase()
            .replace(" ", "-")}/lexical-analysis/analysis-report/${data.id}`
        );
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      console.error("Lexical upload error:", err?.response || err);
      setError(
        err?.response?.data?.detail ||
          "Upload failed. Please try again in a moment."
      );
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 pt-48 py-20 px-4">
      <Grid height={140} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-center">
          Lexical{" "}
          <span className="bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">
            Analysis
          </span>
        </h1>

        <p className="text-lg md:text-xl text-center mb-12 text-gray-400 px-4">
          Examine documents at the word and phrase level to detect exact
          matches, repeated patterns, and suspicious keyword usage.
        </p>

        <div className="space-y-8">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed p-12 md:p-20 text-center rounded-lg transition-all 
            ${
              files.length
                ? "border-purple-500 bg-purple-500/5"
                : "border-gray-600"
            } 
            ${error ? "border-red-500" : ""}`}
          >
            {!files.length ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <LiaCloudUploadAltSolid className="text-6xl text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold">
                  Drag & drop your files here
                </h2>
                <p className="text-gray-400">or</p>
                <label className="cursor-pointer inline-block">
                  <span className="bg-gradient-to-r from-purple-400 to-purple-700 text-white px-6 py-3 rounded-md hover:from-purple-500 hover:to-purple-800 transition-all">
                    Browse Files
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    multiple
                  />
                </label>
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: PDF, DOC, DOCX
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                {files.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-lg"
                  >
                    <FiFile className="text-2xl text-purple-400" />
                    <span className="text-lg">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(f.name)}
                      className="text-gray-400 hover:text-white ml-4"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <p className="text-red-400 mt-4 font-semibold">{error}</p>
            )}
          </div>

          <div
            className={`${inter.className} flex flex-col items-center space-y-4`}
          >
            <button
              onClick={handleSubmit}
              disabled={!files.length || isLoading}
              className={`${
                dmSans.className
              } px-12 py-8 mt-10 font-extralight text-xl tracking-tighter transition-all transform hover:scale-105 
                ${
                  !files.length || isLoading
                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-purple-400 to-purple-700 hover:from-purple-500 hover:to-purple-800 text-white shadow-lg shadow-purple-500/50"
                }`}
            >
              {isLoading ? (
                <span className="flex items-center space-x-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Analyzing...</span>
                </span>
              ) : (
                "Analyze Documents"
              )}
            </button>

            {isLoading && (
              <div className="w-full max-w-md space-y-2 px-24">
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-gray-400">
                  {progress < 30 && "Processing documents..."}
                  {progress >= 30 && progress < 60 && "Extracting text..."}
                  {progress >= 60 &&
                    progress < 90 &&
                    "Performing lexical analysis..."}
                  {progress >= 90 && "Finalizing results..."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

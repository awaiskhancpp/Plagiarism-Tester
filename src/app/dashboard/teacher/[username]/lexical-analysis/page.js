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

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["600"] });
const rw = Raleway({ subsets: ["latin"], weight: ["500"] });
const rw_bold = Raleway({ subsets: ["latin"], weight: ["700"] });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      setError("Please select at least 1 file");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      const res = await axios.post(
        "/api/report/teacher/lexical-analysis",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const data = res.data;
      localStorage.setItem(`lexical:${data.id}`, JSON.stringify(data));

      router.push(
        `/dashboard/teacher/${session.user.name
          .toLowerCase()
          .replace(" ", "-")}/lexical-analysis/analysis-report/${data.id}`
      );
    } catch (err) {
      console.error("Lexical upload error:", err?.response || err);
      setError(
        err?.response?.data?.error ||
          "Upload failed. Please try again in a moment."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <title>Upload Documents - Lexical Analysis</title>

      <div className="h-auto bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
        <Grid height={135} />
        <div className="max-w-4xl mx-auto">
          <h1 className={`${rw_bold.className} text-8xl mb-6 text-center`}>
            Lexical{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>

          <p
            className={`${rw.className} px-16 text-lg md:text-xl text-center mb-12 text-gray-400`}
          >
            Examine documents at the word and phrase level to detect exact
            matches, repeated patterns, and suspicious keyword usage.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`border-[1px] border-dashed p-20 text-center rounded-2xl transition-all 
              ${files.length ? "border-purple-500" : "border-gray-600 "} 
              ${error ? "border-red-500" : ""}`}
            >
              {!files.length ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <LiaCloudUploadAltSolid className="text-5xl text-purple-400" />
                  </div>
                  <h2 className={`${rw.className} text-xl`}>
                    Drag & drop your files here
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
                      multiple
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
                  {files.map((f) => (
                    <div key={f.name} className="flex items-center space-x-3">
                      <FiFile className="text-2xl text-purple-400" />
                      <span className={`${rw.className} text-lg`}>
                        {f.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(f.name)}
                        className="text-gray-400 hover:text-white"
                      >
                        <FiX className="text-xl" />
                      </button>
                    </div>
                  ))}
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
                  disabled={!files.length || isLoading}
                  className={`${
                    rw.className
                  } px-16 py-8 text-center text-gray-200 bg-gradient-to-r from-purple-300 to-purple-700 hover:to-purple-500 text-xl mt-7 inline-flex items-center justify-center ${
                    !files.length || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isLoading ? "Analyzing..." : "Analyze Documents"}
                </button>
              </RotatingBox>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

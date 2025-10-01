"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Users,
  Download,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Grid from "@/components/Grid";
import { DM_Sans, Inter, Raleway } from "next/font/google";
import { Repeat } from "lucide-react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
});

const rw = Raleway({
  subsets: ["latin"],
  weight: ["500"],
});

const rw_bold = Raleway({
  subsets: ["latin"],
  weight: ["700"],
});

const dmSans_light = DM_Sans({
  subsets: ["latin"],
  weight: ["500"],
});

export default function InternalAnalysisReport() {
  const params = useParams();
  const [analysisData, setAnalysisData] = useState(null);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  useEffect(() => {
    const id = params?.id;
    if (!id) return;
    const cached = localStorage.getItem(`internal:${id}`);
    if (cached) {
      const data = JSON.parse(cached);
      setAnalysisData(data);
      setCurrentPairIndex(0);
    }
  }, [params]);

  const navigateToPair = (direction) => {
    if (!analysisData?.comparisons) return;

    const newIndex =
      direction === "next"
        ? (currentPairIndex + 1) % analysisData.comparisons.length
        : (currentPairIndex - 1 + analysisData.comparisons.length) %
          analysisData.comparisons.length;

    setCurrentPairIndex(newIndex);
  };

  const currentPair = analysisData?.comparisons?.[currentPairIndex];

  const OverlapCard = ({ overlap }) => (
    <div className="p-4 rounded-md bg-gray-800/40 border-l-4 border-red-500">
      <p className={`${dmSans_light.className} text-white font-medium mb-2`}>
        "{overlap.text}"
      </p>
      <div className="text-sm text-gray-300 space-y-1">
        <p>
          <span className="text-red-400 font-semibold">
            {overlap.similarity}% match
          </span>{" "}
          between:
        </p>
        <p>
          <FileText className="inline w-4 h-4 text-blue-400 mr-1" />
          {overlap.fromDoc}{" "}
        </p>
        <p>
          <FileText className="inline w-4 h-4 text-green-400 mr-1" />
          {overlap.toDoc}{" "}
        </p>
        <p className="text-gray-400 italic">{overlap.context}</p>
      </div>
    </div>
  );

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading internal analysis...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
      <Grid height={151} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1
              className={`${rw_bold.className} text-3xl md:text-7xl font-bold`}
            >
              Internal{" "}
              <span className="bg-gradient-to-r  from-red-300 to-red-700 bg-clip-text text-transparent">
                Analysis
              </span>
            </h1>
            <p className="text-gray-400 mt-1">
              Pairwise plagiarism detection •{" "}
              {new Date(analysisData.uploadDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <button
              onClick={() => history.back()}
              className="flex items-center gap-2 underline mb-10 text-purple-400 hover:text-purple-300"
            >
              Back to Reports
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-center mb-20">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 aspect-square flex flex-col justify-center items-center">
              <div
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-red-300 to-red-700 bg-clip-text text-transparent`}
              >
                {analysisData.summary.totalDocuments}
              </div>
              <span className="text-gray-400 text-sm">Documents</span>
            </div>
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 aspect-square flex flex-col justify-center items-center">
              <div
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-red-300 to-red-700 bg-clip-text text-transparent`}
              >
                {analysisData.comparisons.length}
              </div>
              <span className="text-gray-400 text-sm">Comparisons ≥85%</span>
            </div>
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 aspect-square flex flex-col justify-center items-center">
              <div
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-red-300 to-red-700 bg-clip-text text-transparent`}
              >
                {analysisData.summary.highestSimilarity}%
              </div>
              <span className="text-gray-400 text-sm">Highest Similarity</span>
            </div>
          </div>
        </div>

        {/* Navigation and Details */}
        {currentPair && (
          <div className="max-w-5xl mx-auto">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateToPair("prev")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full transition-colors"
                disabled={analysisData.comparisons.length <= 1}
              >
                <ArrowLeft className="h-10" />
              </button>

              <div className={`${inter.className} text-center`}>
                <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2 justify-center">
                  <Users className="w-5 h-5 text-red-400" />
                  Document Pair {currentPairIndex + 1} of{" "}
                  {analysisData.comparisons.length}
                </h2>
                <div className="flex items-center gap-2 justify-center bg-gradient-to-r bg-clip-text text-transparent">
                  <span className="text-lg font-bold from-red-400 to-red-700">
                    {currentPair.similarity}%
                  </span>
                  {currentPair.flagged ? (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </div>

              <button
                onClick={() => navigateToPair("next")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full transition-colors"
                disabled={analysisData.comparisons.length <= 1}
              >
                <ArrowRight className="h-10" />
              </button>
            </div>

            {/* Details Card */}
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 space-y-6">
              <div className="flex justify-between items-start">
                <h3
                  className={`${inter.className} flex items-center text-2xl font-bold text-white`}
                >
                  {currentPair.docA}{" "}
                  <Repeat className="w-4 h-4 mx-2 text-red-400" />{" "}
                  {currentPair.docB}
                </h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-400">
                    {currentPair.similarity}%
                  </div>
                  <p className="text-gray-400 text-sm">Similarity Score</p>
                </div>
              </div>

              <div className="text-gray-300">
                <p className="mb-4">
                  <span className="font-semibold text-white">
                    {currentPair.overlaps.length}
                  </span>{" "}
                  high-similarity overlaps detected
                </p>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {currentPair.overlaps.map((overlap, idx) => (
                  <OverlapCard key={idx} overlap={overlap} />
                ))}
              </div>

              <div className={` flex gap-4 pt-4 border-t border-gray-700/50`}>
                <div className="text-gray-400 text-sm flex items-center">
                  Use the navigation arrows to view other document pairs with
                  high similarity.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentPair && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-800/50 my-32  rounded-md p-12 border border-gray-700/50 text-center">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                No document pairs with high similarity found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

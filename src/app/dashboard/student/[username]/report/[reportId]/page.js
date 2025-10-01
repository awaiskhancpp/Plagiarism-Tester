// src/app/dashboard/student/report/[reportId]/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import { DM_Sans, Raleway } from "next/font/google";
import { PiArrowLeft, PiInfo } from "react-icons/pi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const rw = Raleway({
  subsets: ["latin"],
  weight: ["500"],
});

export default function DocumentAnalysisPage() {
  const [document, setDocument] = useState({
    name: "",
    content: "",
    plagiarismData: [],
    time_spent: "",
    sources: [],
  });

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const contentRef = useRef(null);
  const pathname = usePathname();
  const { reportId } = useParams();

  // Fetch report detail once on mount (when reportId is available)
  useEffect(() => {
    if (!reportId) return;

    const fetchDocument = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("report")); // now a single object, not an array

        setDocument({
          name: data.name || "",
          content: data.content || "",
          plagiarismData: Array.isArray(data.plagiarism_data)
            ? data.plagiarism_data.map((item) => ({
                text: item.matched_text,
                similarity: item.similarity.toFixed(2) * 100, // e.g. 0.87 → "87.00"
                source: item.source_title,
                url: item.source_url,
              }))
            : [],
          time_spent: data.time_spent || "",
          sources: Array.isArray(data.sources) ? data.sources : [],
        });
      } catch (error) {
        console.error("Failed to fetch document:", error);
      }
    };

    fetchDocument();
  }, [reportId]);

  // Helper to HTML‐escape a string
  function escapeForHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    // .replace(/'/g, "&#039;");
  }

  // Helper to turn arbitrary text into a regex‐safe pattern
  function escapeRegex(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  // Highlight plagiarized text by wrapping matches in <span>
  const highlightPlagiarizedText = () => {
    let escapedContent = escapeForHtml(document.content || "");

    // Sort matches by descending similarity
    const sortedMatches = [...(document.plagiarismData || [])].sort(
      (a, b) => b.similarity - a.similarity
    );

    sortedMatches.forEach((matchObj) => {
      if (!matchObj || !matchObj.text) return;

      const rawPhrase = matchObj.text;
      const phraseRegex = new RegExp(escapeRegex(rawPhrase), "gi");

      const colorClass =
        matchObj.similarity > 75
          ? "bg-red-500"
          : matchObj.similarity > 50
          ? "bg-orange-500"
          : "bg-yellow-500";

      escapedContent = escapedContent.replace(
        phraseRegex,
        `<span class="${colorClass} text-white px-1 cursor-pointer hover:opacity-90" data-id="${escapeForHtml(
          rawPhrase
        )}">${escapeForHtml(rawPhrase)}</span>`
      );
    });

    return { __html: escapedContent };
  };

  // Handle click on highlighted spans
  useEffect(() => {
    const handleClick = (e) => {
      const highlightedSpan = e.target.closest("span[data-id]");
      if (highlightedSpan) {
        const text = highlightedSpan.getAttribute("data-id");
        const decodedText = text
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
        const match = document.plagiarismData.find(
          (m) => m.text === decodedText
        );
        setSelectedMatch(match);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("click", handleClick);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("click", handleClick);
      }
    };
  }, [document.plagiarismData]);

  // Summary helpers
  const totalMatches = Array.isArray(document.plagiarismData)
    ? document.plagiarismData.length
    : 0;

  const highestSimilarity =
    totalMatches > 0
      ? Math.max(...document.plagiarismData.map((m) => Number(m.similarity)))
      : 0;

  const averageSimilarity =
    totalMatches > 0
      ? (
          document.plagiarismData.reduce(
            (sum, m) => sum + Number(m.similarity),
            0
          ) / totalMatches
        ).toFixed(3)
      : "0.000";

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
      <title>Plagiarism Report - SleuthInk</title>
      <div className="max-w-7xl mx-auto">
        <h1
          className={`${rw.className} text-3xl md:text-7xl text-center mb-20`}
        >
          Document{" "}
          <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text">
            Analysis
          </span>
        </h1>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
          <Link
            className={`${dmSans.className} flex items-center gap-2 text-purple-400 hover:text-purple-300`}
            href="/dashboard/student/report"
          >
            <PiArrowLeft size={20} /> Back to Reports
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className={`${dmSans.className} text-sm`}>
                  High (76-100%)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className={`${dmSans.className} text-sm`}>
                  Medium (51-75%)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className={`${dmSans.className} text-sm`}>
                  Low (0-50%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Document Viewer */}
          <div className="lg:w-2/3 bg-gray-800 rounded-md border border-gray-700 p-6 overflow-scroll h-screen">
            <div
              ref={contentRef}
              className={`${dmSans.className} leading-relaxed whitespace-pre-wrap`}
              dangerouslySetInnerHTML={highlightPlagiarizedText()}
            />
          </div>

          {/* Sources Panel */}
          <div className="lg:w-1/3 bg-gray-800 rounded-md border border-gray-700 p-6 h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className={`${dmSans.className} text-xl`}>Matched Sources</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`${
                    dmSans.className
                  } text-sm px-3 py-1 rounded-md ${
                    activeTab === "all"
                      ? "bg-purple-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  } transition`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("high")}
                  className={`${
                    dmSans.className
                  } text-sm px-3 py-1 rounded-md ${
                    activeTab === "high"
                      ? "bg-red-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  } transition`}
                >
                  High
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {selectedMatch ? (
                <div className="space-y-4">
                  {/* Selected Match Details */}
                  <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                    <h3 className={`${dmSans.className} text-lg mb-2`}>
                      Selected Text
                    </h3>
                    <p
                      className={`${dmSans.className} bg-gray-600 p-3 rounded-md`}
                    >
                      &quot;{selectedMatch.text}&quot;
                    </p>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                    <h3 className={`${dmSans.className} text-lg mb-2`}>
                      Source
                    </h3>
                    <p className={`${dmSans.className} text-purple-400 mb-1`}>
                      {selectedMatch.source}
                    </p>
                    <a
                      href={selectedMatch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${dmSans.className} text-blue-400 text-sm hover:underline flex items-center gap-1`}
                    >
                      <PiInfo size={16} /> View source
                    </a>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                    <h3 className={`${dmSans.className} text-lg mb-2`}>
                      Similarity
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            selectedMatch.similarity > 75
                              ? "bg-red-500"
                              : selectedMatch.similarity > 50
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                          }`}
                          style={{ width: `${selectedMatch.similarity}%` }}
                        ></div>
                      </div>
                      <span className={`${dmSans.className}`}>
                        {selectedMatch.similarity}%
                      </span>
                    </div>
                    <p
                      className={`${dmSans.className} text-sm mt-2 ${
                        selectedMatch.similarity > 75
                          ? "text-red-400"
                          : selectedMatch.similarity > 50
                          ? "text-orange-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {selectedMatch.similarity > 75
                        ? "High probability of plagiarism"
                        : selectedMatch.similarity > 50
                        ? "Moderate similarity detected"
                        : "Low similarity - likely original"}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedMatch(null)}
                    className={`${dmSans.className} w-full py-2 bg-gray-700 rounded-md border border-gray-600 hover:bg-gray-600 transition`}
                  >
                    Back to all matches
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {document.plagiarismData && document.plagiarismData.length > 0
                    ? document.plagiarismData
                        .filter((match) =>
                          activeTab === "all"
                            ? true
                            : Number(match.similarity) > 70
                        )
                        .map((match, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-md cursor-pointer hover:bg-gray-700 transition ${
                              match.similarity > 75
                                ? "border-l-4 border-red-500 bg-gray-750"
                                : match.similarity > 50
                                ? "border-l-4 border-orange-500 bg-gray-750"
                                : "border-l-4 border-yellow-500 bg-gray-750"
                            }`}
                            onClick={() => setSelectedMatch(match)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3
                                className={`${dmSans.className} line-clamp-2`}
                              >
                                {match.text}
                              </h3>
                              <span
                                className={`${dmSans.className} text-sm ${
                                  match.similarity > 75
                                    ? "text-red-400"
                                    : match.similarity > 50
                                    ? "text-orange-400"
                                    : "text-yellow-400"
                                }`}
                              >
                                {match.similarity}%
                              </span>
                            </div>
                            <p
                              className={`${dmSans.className} text-sm text-gray-400 line-clamp-1`}
                            >
                              {match.source}
                            </p>
                          </div>
                        ))
                    : null}
                </div>
              )}
            </div>

            {/* Fixed Footer */}
            <div className="mt-auto pt-4">
              <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                <h3
                  className={`${dmSans.className} text-lg mb-3 flex items-center gap-2`}
                >
                  <PiInfo size={20} /> Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${dmSans.className}`}>
                      Total Matches:
                    </span>
                    <span className={`${dmSans.className}`}>
                      {totalMatches}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${dmSans.className}`}>
                      Highest Similarity:
                    </span>
                    <span className={`${dmSans.className} text-red-400`}>
                      {highestSimilarity}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${dmSans.className}`}>
                      Average Similarity:
                    </span>
                    <span className={`${dmSans.className}`}>
                      {averageSimilarity}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Eye,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Info,
} from "lucide-react";
import { DM_Sans, Inter, Raleway } from "next/font/google";
import Grid from "@/components/Grid";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["700"] });
const inter = Inter({ subsets: ["latin"], weight: ["500"] });
const rw = Raleway({ subsets: ["latin"], weight: ["500"] });
const rw_bold = Raleway({ subsets: ["latin"], weight: ["700"] });
const dmSans_light = DM_Sans({ subsets: ["latin"], weight: ["500"] });

function pct(n) {
  if (n === undefined || n === null || Number.isNaN(+n)) return 0;
  return +n > 1 ? Math.round(+n) : Math.round(+n * 100);
}

function normalizeReport(api) {
  const documents = (api.documents || []).map((d, idx) => {
    const matches = (d.matches || []).map((m) => ({
      text: m.text || m.matched_text || m.match || "",
      similarity: pct(m.similarity),
      source:
        m.source || m.source_title || m.source_type || m.title || "Unknown",
      url: m.url || m.source_url || "#",
      context: m.context || "Semantic similarity detected",
    }));

    return {
      id: d.id ?? idx + 1,
      name: d.name || d.filename || `Document ${idx + 1}`,
      author: d.author || null,
      similarity: pct(d.similarity || 0),
      aiSimilarity: pct(d.ai_similarity || 0),
      wordCount: d.wordCount || d.word_count || 0,
      flagged: !!d.flagged,
      matches,
      content: d.content || "",
    };
  });

  const summary = {
    totalDocuments: api.summary?.totalDocuments ?? documents.length,
    flaggedDocuments:
      api.summary?.flaggedDocuments ??
      documents.filter((x) => x.flagged).length,
    averageSimilarity: pct(api.summary?.averageSimilarity ?? 0),
    highestSimilarity: pct(api.summary?.highestSimilarity ?? 0),
    totalMatches:
      api.summary?.totalMatches ??
      documents.reduce((acc, d) => acc + (d.matches?.length || 0), 0),
    averageAiSimilarity: pct(api.summary?.averageAiSimilarity ?? 0),
  };

  return {
    id: api.id || "semantic_report",
    name: api.name || "Semantic Analysis",
    uploadDate: api.uploadDate || "",
    processingTime: api.processingTime || "",
    documents,
    summary,
  };
}

export default function TeacherSemanticAnalysisReport() {
  const params = useParams();
  const router = useRouter();
  const reportId = params?.id;

  const [analysisData, setAnalysisData] = useState(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Try localStorage first
        const stored = localStorage.getItem(`semantic:${reportId}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          const normalized = normalizeReport(parsed);
          setAnalysisData(normalized);

          const firstWithMatchesIndex = normalized.documents.findIndex(
            (d) => (d.matches?.length || 0) > 0
          );
          setCurrentDocIndex(
            firstWithMatchesIndex !== -1 ? firstWithMatchesIndex : 0
          );
          return;
        }

        // Fallback to API
        const response = await fetch(
          `/api/report/teacher/crud-report?id=${reportId}`
        );
        if (!response.ok) throw new Error("Failed to fetch report");

        const apiData = await response.json();
        const normalized = normalizeReport(apiData);
        setAnalysisData(normalized);

        const firstWithMatchesIndex = normalized.documents.findIndex(
          (d) => (d.matches?.length || 0) > 0
        );
        setCurrentDocIndex(
          firstWithMatchesIndex !== -1 ? firstWithMatchesIndex : 0
        );
      } catch (err) {
        console.error("Failed to load semantic report:", err);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  const navigateToDoc = (direction) => {
    if (!analysisData?.documents) return;
    const newIndex =
      direction === "next"
        ? (currentDocIndex + 1) % analysisData.documents.length
        : (currentDocIndex - 1 + analysisData.documents.length) %
          analysisData.documents.length;
    setCurrentDocIndex(newIndex);
    setSelectedMatch(null);
  };

  const currentDoc = analysisData?.documents?.[currentDocIndex];

  // Helper to escape HTML
  function escapeForHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Helper to escape regex
  function escapeRegex(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  // Highlight matched text in document
  const highlightMatches = () => {
    if (!currentDoc) {
      return { __html: escapeForHtml("No document content available.") };
    }

    let content = escapeForHtml(currentDoc.content || "No content available");

    if (!currentDoc.matches || currentDoc.matches.length === 0) {
      return { __html: content };
    }

    // ✅ Deduplicate matches by text
    const uniqueMatches = {};
    currentDoc.matches.forEach((match) => {
      const key = match.text.toLowerCase().trim();
      if (
        !uniqueMatches[key] ||
        match.similarity > uniqueMatches[key].similarity
      ) {
        uniqueMatches[key] = match;
      }
    });

    const dedupedMatches = Object.values(uniqueMatches);

    dedupedMatches.forEach((match) => {
      if (!match || !match.text) return;

      const colorClass =
        match.similarity > 85
          ? "bg-red-500"
          : match.similarity > 70
          ? "bg-orange-500"
          : "bg-yellow-500";

      const regex = new RegExp(escapeRegex(match.text), "i");
      content = content.replace(
        regex,
        `<span class="${colorClass} text-white px-1 cursor-pointer hover:opacity-90 transition" data-id="${escapeForHtml(
          match.text
        )}">${escapeForHtml(match.text)}</span>`
      );
    });

    return { __html: content };
  };

  // Handle click on highlighted text
  useEffect(() => {
    const handleClick = (e) => {
      const span = e.target.closest("span[data-id]");
      if (span && currentDoc) {
        const text = span
          .getAttribute("data-id")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"');
        const match = currentDoc.matches.find((m) => m.text === text);
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
  }, [currentDoc]);

  const filteredMatches = Array.isArray(currentDoc?.matches)
    ? activeTab === "all"
      ? currentDoc.matches
      : currentDoc.matches.filter((m) => m.similarity >= 85)
    : [];

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading semantic analysis...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-20 relative">
      {/* AI Detection Badge - Top Right Corner */}

      <div className="max-w-7xl mt-20 mx-auto px-6">
        <Grid height={178} />
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`${rw_bold.className} text-3xl md:text-6xl font-bold mb-2`}
          >
            Semantic{" "}
            <span className="bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          <p className="text-gray-400">
            {new Date(analysisData.uploadDate).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 underline mt-4 text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-3 my-28 px-80">
          <div className="bg-gray-800/50 rounded-md p-4 py-[28px] border border-blue-500 text-center">
            <div
              className={`${dmSans.className} text-3xl font-bold text-white`}
            >
              {currentDoc?.aiSimilarity}%
            </div>
            <span className="text-gray-400 text-sm">AI Similarity</span>
          </div>
          <div className="bg-gray-800/50 rounded-md p-4 py-[28px] border border-gray-700/50 text-center">
            <div
              className={`${dmSans.className} text-3xl font-bold text-white`}
            >
              {analysisData.summary.totalDocuments}
            </div>
            <span className="text-gray-400 text-sm">Documents</span>
          </div>
          <div className="bg-gray-800/50 rounded-md p-4 py-[28px] border border-gray-700/50 text-center">
            <div
              className={`${dmSans.className} text-3xl font-bold text-white`}
            >
              {analysisData.summary.totalMatches}
            </div>
            <span className="text-gray-400 text-sm">Total Matches</span>
          </div>

          <div className="bg-gray-800/50 rounded-md p-4 py-[28px] border border-gray-700/50 text-center">
            <div
              className={`${dmSans.className} text-3xl font-bold text-white`}
            >
              {(analysisData.summary.averageSimilarity +
                currentDoc?.aiSimilarity) /
                2}
              %
            </div>
            <span className="text-gray-400 text-sm">Average</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateToDoc("prev")}
            className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full"
            disabled={analysisData.documents.length <= 1}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-1">
              Document {currentDocIndex + 1} of {analysisData.documents.length}
            </h2>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-lg font-bold text-white">
                {currentDoc?.similarity || 0}%
              </span>
              {currentDoc?.flagged ? (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
          </div>

          <button
            onClick={() => navigateToDoc("next")}
            className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full"
            disabled={analysisData.documents.length <= 1}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-[75vh] lg:flex-row gap-4">
          {/* Document Viewer */}
          <div className="lg:w-2/3 bg-gray-800/50 rounded-md border border-gray-700/50 p-6 max-h-[75vh] overflow-y-auto">
            <h3
              className={`${inter.className} text-white text-lg font-bold mb-4`}
            >
              {currentDoc?.name}
            </h3>
            <div
              ref={contentRef}
              className={`${dmSans_light.className} leading-relaxed whitespace-pre-wrap text-md`}
              dangerouslySetInnerHTML={highlightMatches()}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 bg-gray-800/50 rounded-md border border-gray-700/50 p-6 max-h-[75vh] overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold">Semantic Matches</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`text-xs px-2 py-1 rounded ${
                    activeTab === "all"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("high")}
                  className={`text-xs px-2 py-1 rounded ${
                    activeTab === "high"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  High
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {selectedMatch ? (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-700/50 rounded border border-gray-600">
                    <p className="text-sm text-gray-400 mb-1">Selected Text</p>
                    <p className="text-white text-sm">
                      &quot;{selectedMatch.text.substring(0, 200)}
                      {selectedMatch.text.length > 200 ? "..." : ""}&quot;
                    </p>
                  </div>

                  <div className="p-3 bg-gray-700/50 rounded border border-gray-600">
                    <p className="text-sm text-gray-400 mb-1">Source</p>
                    <p className="text-white text-sm mb-2 break-words">
                      {selectedMatch.source}
                    </p>
                    {selectedMatch.url && selectedMatch.url !== "#" && (
                      <a
                        href={selectedMatch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-xs hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> View source
                      </a>
                    )}
                  </div>

                  <div className="p-3 bg-gray-700/50 rounded border border-gray-600">
                    <p className="text-sm text-gray-400 mb-2">Similarity</p>
                    <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedMatch.similarity > 85
                            ? "bg-red-500"
                            : selectedMatch.similarity > 70
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${selectedMatch.similarity}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-bold">
                      {selectedMatch.similarity}%
                    </span>
                    <p className="text-gray-400 text-xs mt-2">
                      {selectedMatch.context}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedMatch(null)}
                    className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded"
                  >
                    Back to all
                  </button>
                </div>
              ) : (
                <>
                  {filteredMatches.length > 0 ? (
                    filteredMatches.map((match, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedMatch(match)}
                        className={`p-3 rounded cursor-pointer hover:bg-gray-700/50 transition border-l-4 ${
                          match.similarity > 85
                            ? "border-red-500 bg-red-900/10"
                            : match.similarity > 70
                            ? "border-orange-500 bg-orange-900/10"
                            : "border-yellow-500 bg-yellow-900/10"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-white text-sm font-medium line-clamp-2">
                            &quot;{match.text.substring(0, 100)}
                            {match.text.length > 100 ? "..." : ""}&quot;
                          </p>
                          <span
                            className={`text-xs font-bold ml-2 ${
                              match.similarity > 85
                                ? "text-red-400"
                                : match.similarity > 70
                                ? "text-orange-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {match.similarity}%
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs truncate">
                          {match.source}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No matches in this filter
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

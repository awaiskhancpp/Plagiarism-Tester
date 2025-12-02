"use client";

<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
<<<<<<< HEAD
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
=======
  Database,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Grid from "@/components/Grid";
import { DM_Sans, Inter, Raleway } from "next/font/google";

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

export default function SemanticAnalysisReport() {
  const router = useRouter();
  const { username, id } = useParams();

  const [analysisData, setAnalysisData] = useState(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState(null);

  // ---- Transform FastAPI payload -> your UI shape ----
  const transformToUI = (report) => {
    // FastAPI TeacherSemanticReport:
    // { id, name, mode, uploadDate, processingTime, documents: [{id,name}],
    //   comparisons: [{ docA, docB, similarity, flagged, overlaps: [{ textA, textB, cosine, cosine_pct, ... }] }],
    //   summary: {...} }

    const docNames = (report.documents || []).map((d) => d.name);
    const docsMap = {};
    docNames.forEach((n, idx) => {
      docsMap[n] = {
        id: idx + 1,
        name: n,
        author: null,
        similarity: 0,
        wordCount: 0,
        flagged: false,
        matches: [],
      };
    });

    const sourceTally = {};

    (report.comparisons || []).forEach((cmp) => {
      const target = docsMap[cmp.docA];
      if (!target) return;

      target.similarity = Math.max(
        target.similarity,
        Math.round(cmp.similarity || 0)
      );
      target.flagged = target.flagged || Boolean(cmp.flagged);

      (cmp.overlaps || []).forEach((ov) => {
        const simPct = Math.round(ov.cosine_pct || (ov.cosine || 0) * 100);
        const srcTitle = ov.textB || "External Source";

        target.matches.push({
          text: ov.textA || "",
          similarity: simPct,
          source: srcTitle,
          url: "#",
          context: `Semantic overlap with "${srcTitle}".`,
        });

        sourceTally[srcTitle] = (sourceTally[srcTitle] || 0) + 1;
      });
    });

    const documents = Object.values(docsMap);

    const flaggedDocuments = documents.filter((d) => d.flagged).length;
    const highestSimilarity = documents.reduce(
      (m, d) => Math.max(m, d.similarity || 0),
      0
    );
    const averageSimilarity = documents.length
      ? Number(
          (
            documents.reduce((s, d) => s + (d.similarity || 0), 0) /
            documents.length
          ).toFixed(1)
        )
      : 0;
    const totalMatches = documents.reduce(
      (s, d) => s + (d.matches?.length || 0),
      0
    );

    return {
      id: report.id,
      name: report.name || "Semantic Analysis",
      analysisType: "Semantic",
      uploadDate: report.uploadDate || "",
      processingTime: report.processingTime || "",
      status: "completed",
      documents,
      summary: {
        totalDocuments: documents.length,
        flaggedDocuments,
        averageSimilarity,
        highestSimilarity,
        totalMatches,
        databaseSources: sourceTally,
      },
      narrative: report.narrative ?? null,
    };
  };

  // ---- Load the API response saved by the upload page ----
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" && localStorage.getItem(`semantic:${id}`);
      if (!raw) {
        setError("No analysis data found for this report id.");
        return;
      }
      const apiPayload = JSON.parse(raw);
      const ui = transformToUI(apiPayload);
      setAnalysisData(ui);
      setCurrentDocIndex(0);
    } catch (e) {
      console.error("Failed to load semantic report:", e);
      setError("Failed to load analysis data.");
    }
  }, [id]);

  const navigateToDoc = (direction) => {
    if (!analysisData?.documents) return;

>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
    const newIndex =
      direction === "next"
        ? (currentDocIndex + 1) % analysisData.documents.length
        : (currentDocIndex - 1 + analysisData.documents.length) %
          analysisData.documents.length;
<<<<<<< HEAD
    setCurrentDocIndex(newIndex);
    setSelectedMatch(null);
=======

    setCurrentDocIndex(newIndex);
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
  };

  const currentDoc = analysisData?.documents?.[currentDocIndex];

<<<<<<< HEAD
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
=======
  const MatchCard = ({ match }) => (
    <div
      className={`p-4 rounded-md border-l-4 ${
        match.similarity > 85
          ? "border-blue-500 bg-blue-900/10"
          : match.similarity > 70
          ? "border-orange-500 bg-orange-900/10"
          : "border-yellow-500 bg-yellow-900/10"
      } bg-gray-800/30`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p
            className={`${dmSans_light.className} text-white font-medium mb-2`}
          >
            "{match.text}"
          </p>
          <div className="space-y-1">
            <p className="text-blue-400 text-sm font-medium">{match.source}</p>
            <p className="text-gray-400 text-xs">{match.context}</p>
          </div>
        </div>
        <span
          className={`text-lg font-bold ml-4 ${
            match.similarity > 85
              ? "text-blue-400"
              : match.similarity > 70
              ? "text-orange-400"
              : "text-yellow-400"
          }`}
        >
          {match.similarity}%
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-full bg-gray-700 rounded-full h-2 mr-4">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${
              match.similarity > 85
                ? "from-blue-300 to-blue-700"
                : match.similarity > 70
                ? "bg-orange-500"
                : "bg-yellow-500"
            }`}
            style={{ width: `${match.similarity}%` }}
          />
        </div>
        <a
          href={match.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
        >
          <Eye className="w-3 h-3" />
          View Source
        </a>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-white">{error}</div>
      </div>
    );
  }
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
<<<<<<< HEAD
        <div className="text-white">Loading semantic analysis...</div>
=======
        <div className="text-white">Loading Semantic analysis...</div>
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
      </div>
    );
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
      <Grid height={151} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1
              className={`${rw_bold.className} text-3xl md:text-7xl font-bold`}
            >
              Semantic{" "}
              <span className="bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
                Analysis
              </span>
            </h1>
            <p className="text-gray-400 mt-1">
              Documents compared against internal database •{" "}
              {new Date(analysisData.uploadDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <button
              onClick={() => router.back()}
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
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent`}
              >
                {analysisData.summary.totalDocuments}
              </div>
              <span className="text-gray-400 text-sm">Documents</span>
            </div>
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 aspect-square flex flex-col justify-center items-center">
              <div
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent`}
              >
                {analysisData.summary.totalMatches}
              </div>
              <span className="text-gray-400 text-sm">Total Matches</span>
            </div>
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 aspect-square flex flex-col justify-center items-center">
              <div
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent`}
              >
                {analysisData.summary.highestSimilarity}%
              </div>
              <span className="text-gray-400 text-sm">Highest Similarity</span>
            </div>
          </div>
        </div>

        {/* Navigation and Details */}
        {currentDoc && (
          <div className="max-w-5xl mx-auto">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateToDoc("prev")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full transition-colors"
                disabled={analysisData.documents.length <= 1}
              >
                <ArrowLeft className="h-10" />
              </button>

              <div className={`${inter.className} text-center`}>
                <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2 justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Document {currentDocIndex + 1} of{" "}
                  {analysisData.documents.length}
                </h2>
                <div className="flex items-center gap-2 justify-center">
                  <span
                    className={`text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                      currentDoc.similarity > 30
                        ? "from-red-300 to-red-700"
                        : currentDoc.similarity > 15
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {currentDoc.similarity}%
                  </span>
                  {currentDoc.flagged ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </div>

              <button
                onClick={() => navigateToDoc("next")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full transition-colors"
                disabled={analysisData.documents.length <= 1}
              >
                <ArrowRight className="h-10" />
              </button>
            </div>

            {/* Details Card */}
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`${inter.className} text-2xl font-bold text-white`}
                  >
                    {currentDoc.name}
                  </h3>
                  <p className="text-gray-400">
                    {/* by {currentDoc.author ?? "Unknown"} •{" "} */}
                    {/* {currentDoc.wordCount ?? 0} words */}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                      currentDoc.similarity > 30
                        ? "from-red-300 to-red-700"
                        : currentDoc.similarity > 15
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {currentDoc.similarity}%
                  </div>
                  <p className="text-gray-400 text-sm">Database Similarity</p>
                </div>
              </div>

              <div className="text-gray-300">
                <p className="mb-4">
                  <span className="font-semibold text-white">
                    {currentDoc.matches.length}
                  </span>{" "}
                  database matches detected
                </p>
              </div>

              <div className="mb-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {currentDoc.matches
                    .filter((m) => activeTab === "all" || m.similarity >= 85)
                    .map((match, idx) => (
                      <MatchCard key={idx} match={match} />
                    ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-700/50">
                <div className="text-gray-400 text-sm flex items-center">
                  Use the navigation arrows to view other documents in the
                  analysis.
                </div>
              </div>
            </div>

            {/* Summary Section */}
            {analysisData.narrative && (
              <div
                className={`${dmSans_light.className} bg-gray-800/50 rounded-md p-6 border border-gray-700/50 mt-6`}
              >
                <h2 className="text-2xl  text-white mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-yellow-400" />
                  Analysis Summary
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {analysisData.narrative}
                </p>
              </div>
            )}

            {/* Sources Summary */}
            <div
              className={`${inter.className} bg-gray-800/50 rounded-md p-6 border border-gray-700/50 mt-6`}
            >
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-green-400" />
                Database Sources Checked
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(analysisData.summary.databaseSources).map(
                  ([source, count]) => (
                    <div key={source} className="bg-gray-700/50 rounded-md p-3">
                      <div
                        className="text-sm text-gray-300 truncate"
                        title={source}
                      >
                        {source}
                      </div>
                      <div className="text-green-400 font-semibold">
                        {count} matches
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentDoc && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-800/50 rounded-md p-12 border border-gray-700/50 text-center">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                No documents found in the semantic analysis
              </p>
            </div>
          </div>
        )}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
      </div>
    </div>
  );
}

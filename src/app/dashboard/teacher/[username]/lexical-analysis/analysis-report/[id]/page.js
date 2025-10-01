"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
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

// ---------- helpers ----------
function pct(n) {
  // guard for undefined/null
  if (n === undefined || n === null || Number.isNaN(+n)) return 0;
  // some APIs return 0-1, some 0-100
  return +n > 1 ? Math.round(+n) : Math.round(+n * 100);
}

// Convert FastAPI Teacher Lexical response -> UI shape used by this page
function normalizeReport(api) {
  const documents = (api.documents || []).map((d, idx) => {
    const matches = (d.matches || []).map((m) => ({
      // map both lexical + semantic style fields gracefully
      text: m.text || m.matched_text || m.match || "",
      similarity: pct(m.similarity),
      source:
        m.source ||
        m.source_title ||
        m.source_type ||
        m.title ||
        "Unknown source",
      url: m.url || m.source_url || "#",
      context: m.context || "",
      sectionA: m.sectionA || null,
      sectionB: m.sectionB || null,
    }));

    return {
      id: d.id ?? idx + 1,
      name: d.name || d.filename || `Document ${idx + 1}`,
      author: d.author || null,
      similarity: pct(d.similarity || 0),
      wordCount: d.wordCount || d.word_count || 0,
      flagged: !!d.flagged,
      matches,
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
    databaseSources: api.summary?.databaseSources || {}, // optional
  };

  return {
    id: api.id || "lexical_report",
    name: api.name || "Lexical Analysis",
    analysisType: api.analysisType || "lexical",
    uploadDate: api.uploadDate || "",
    processingTime: api.processingTime || "",
    status: api.status || "completed",
    documents,
    summary,
  };
}

export default function LexicalAnalysisReport() {
  const params = useParams();
  const router = useRouter();
  const reportId = params?.id;

  const [analysisData, setAnalysisData] = useState(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  // Load the report saved by the upload page: localStorage.setItem(`lexical:${data.id}`, JSON.stringify(data))
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`lexical:${reportId}`);
      if (!raw) {
        setAnalysisData(null);
        return;
      }
      const parsed = JSON.parse(raw);
      const normalized = normalizeReport(parsed);
      setAnalysisData(normalized);

      // default selection: first doc with matches, else first doc
      const firstWithMatchesIndex = normalized.documents.findIndex(
        (d) => (d.matches?.length || 0) > 0
      );
      setCurrentDocIndex(
        firstWithMatchesIndex !== -1 ? firstWithMatchesIndex : 0
      );
    } catch (err) {
      console.error("Failed to load lexical report:", err);
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
  };

  const currentDoc = analysisData?.documents?.[currentDocIndex];

  const MatchCard = ({ match }) => (
    <div
      className={`p-4 rounded-md border-l-4 ${
        match.similarity > 85
          ? "border-gray-500 bg-gray-900/10"
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
            <p className="text-gray-400 text-sm font-medium">{match.source}</p>
            {match.context ? (
              <p className="text-gray-400 text-xs">{match.context}</p>
            ) : null}
          </div>
        </div>
        <span
          className={`text-lg font-bold ml-4 ${
            match.similarity > 85
              ? "text-gray-400"
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
                ? "from-gray-400 to-gray-800"
                : match.similarity > 70
                ? "bg-orange-500"
                : "bg-yellow-500"
            }`}
            style={{ width: `${match.similarity}%` }}
          />
        </div>
        {match.url && match.url !== "#" ? (
          <a
            href={match.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 text-sm flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            View Source
          </a>
        ) : (
          <span className="text-gray-500 text-xs">No source link</span>
        )}
      </div>
    </div>
  );

  const filteredMatches = useMemo(() => {
    if (!currentDoc) return [];
    const all = currentDoc.matches || [];
    return activeTab === "all" ? all : all.filter((m) => m.similarity >= 85);
  }, [activeTab, currentDoc]);

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading lexical analysis...</div>
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
              Lexical{" "}
              <span className="bg-gradient-to-r from-gray-300 to-gray-700 bg-clip-text text-transparent">
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
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-gray-300 to-gray-700 bg-clip-text text-transparent`}
              >
                {analysisData.summary.totalDocuments}
              </div>
              <span className="text-gray-400 text-sm">Documents</span>
            </div>
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 aspect-square flex flex-col justify-center items-center">
              <div
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-gray-300 to-gray-700 bg-clip-text text-transparent`}
              >
                {analysisData.summary.totalMatches}
              </div>
              <span className="text-gray-400 text-sm">Total Matches</span>
            </div>
            <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 aspect-square flex flex-col justify-center items-center">
              <div
                className={`${dmSans.className} text-5xl my-3 font-bold bg-gradient-to-r from-gray-300 to-gray-700 bg-clip-text text-transparent`}
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
                  <FileText className="w-5 h-5 text-gray-400" />
                  Document {currentDocIndex + 1} of{" "}
                  {analysisData.documents.length}
                </h2>
                <div className="flex items-center gap-2 justify-center">
                  <span
                    className={`text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                      currentDoc.similarity > 30
                        ? "from-red-300 to-red-700 "
                        : currentDoc.similarity > 15
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    {currentDoc.similarity}%
                  </span>
                  {currentDoc.flagged ? (
                    <AlertTriangle className="w-5 h-5 text-red-700" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-gray-400" />
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
                    {/* by {currentDoc.author || "Unknown Author"} •{" "} */}
                    {currentDoc.wordCount} words
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                      currentDoc.similarity > 30
                        ? "from-red-300 to-red-700"
                        : currentDoc.similarity > 15
                        ? "text-yellow-400"
                        : "text-gray-400"
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
                    {currentDoc.matches?.length || 0}
                  </span>{" "}
                  database matches detected
                </p>
              </div>

              <div className="mb-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredMatches.map((match, index) => (
                    <MatchCard key={index} match={match} />
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

            {/* Sources Summary */}
            {analysisData.summary.databaseSources &&
              Object.keys(analysisData.summary.databaseSources).length > 0 && (
                <div className="bg-gray-800/50 rounded-md p-6 border border-gray-700/50 mt-6">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-gray-400" />
                    Database Sources Checked
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(analysisData.summary.databaseSources).map(
                      ([source, count]) => (
                        <div
                          key={source}
                          className="bg-gray-700/50 rounded-md p-3"
                        >
                          <div
                            className="text-sm text-gray-300 truncate"
                            title={source}
                          >
                            {source}
                          </div>
                          <div className="text-gray-400 font-semibold">
                            {count} matches
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Empty State */}
        {!currentDoc && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-800/50 rounded-md p-12 border border-gray-700/50 text-center">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                No documents found in the lexical analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

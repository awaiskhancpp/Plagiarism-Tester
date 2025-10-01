"use client";

import { useState, useEffect } from "react";
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

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading Semantic analysis...</div>
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
      </div>
    </div>
  );
}

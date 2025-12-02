"use client";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Info,
  FileText,
  Brain,
  Users,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Network,
} from "lucide-react";

import Grid from "@/components/Grid";

export default function TeacherAnalysisPage() {
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewMode, setViewMode] = useState("overview");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data
  useEffect(() => {
    const mockData = {
      id: "batch_analysis_001",
      name: "CS101_Assignment1_Analysis",
      analysisType: "batch",
      uploadDate: "2024-01-15",
      processingTime: "8m 45s",
      overallSimilarity: 34.5,
      status: "completed",
      documents: [
        {
          id: 1,
          name: "student1_essay.pdf",
          author: "John Smith",
          similarity: 45,
          wordCount: 2500,
          flagged: true,
          matches: [
            {
              text: "Machine learning algorithms have revolutionized data analysis",
              similarity: 89,
              source: "Wikipedia - Machine Learning",
              matchedWith: ["student3_essay.pdf"],
            },
            {
              text: "The fundamental principles of computer science",
              similarity: 76,
              source: "Academic Journal - CS Fundamentals",
            },
          ],
        },
        {
          id: 2,
          name: "student2_essay.pdf",
          author: "Emma Johnson",
          similarity: 12,
          wordCount: 2800,
          flagged: false,
          matches: [
            {
              text: "Data structures are essential for efficient programming",
              similarity: 68,
              source: "Textbook - Algorithms and Data Structures",
            },
          ],
        },
        {
          id: 3,
          name: "student3_essay.pdf",
          author: "Michael Wilson",
          similarity: 67,
          wordCount: 2300,
          flagged: true,
          matches: [
            {
              text: "Machine learning algorithms have revolutionized data analysis",
              similarity: 89,
              source: "student1_essay.pdf",
              matchedWith: ["student1_essay.pdf"],
            },
            {
              text: "Artificial intelligence represents the future of computing",
              similarity: 82,
              source: "Research Paper - AI Trends",
            },
          ],
        },
      ],
      stats: {
        totalDocuments: 3,
        flaggedDocuments: 2,
        averageSimilarity: 41.3,
        highestSimilarity: 67,
        crossMatches: 1,
        databaseMatches: 4,
      },
    };
    setAnalysisData(mockData);
  }, []);

  const getAnalysisIcon = (type) => {
    switch (type) {
      case "lexical":
        return <FileText className="w-5 h-5" />;
      case "semantic":
        return <Brain className="w-5 h-5" />;
      case "batch":
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getAnalysisLabel = (type) => {
    switch (type) {
      case "lexical":
        return "Lexical Analysis";
      case "semantic":
        return "Semantic Analysis";
      case "batch":
        return "Batch Analysis";
      default:
        return "Analysis";
    }
  };

  const DocumentCard = ({ doc, isSelected, onClick }) => (
    <div
      onClick={() => onClick(doc)}
      className={`cursor-pointer p-5 rounded-md border shadow-md transition-all duration-300 ${
        isSelected
          ? "border-purple-500 bg-purple-900/30 scale-[1.02]"
          : "border-gray-700 bg-gray-800/60 hover:border-purple-400 hover:bg-gray-700/50 hover:scale-[1.01]"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-white font-semibold">{doc.name}</h3>
          <p className="text-gray-400 text-sm">
            {doc.author} • {doc.wordCount} words
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-lg font-bold ${
              doc.similarity > 30
                ? "text-red-400"
                : doc.similarity > 15
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {doc.similarity}%
          </span>
          {doc.flagged ? (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-400" />
          )}
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-md h-2 mb-3 overflow-hidden">
        <div
          className={`h-2 rounded-md ${
            doc.similarity > 30
              ? "bg-red-500"
              : doc.similarity > 15
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${doc.similarity}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>{doc.matches.length} matches found</span>
        <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
          <Eye className="w-3 h-3" />
          View Details
        </button>
      </div>
    </div>
  );

  const MatchCard = ({ match }) => (
    <div
      className={`p-4 rounded-md shadow-sm border-l-4 ${
        match.similarity > 75
          ? "border-red-500 bg-red-900/10"
          : match.similarity > 50
          ? "border-orange-500 bg-orange-900/10"
          : "border-yellow-500 bg-yellow-900/10"
      } bg-gray-800/40 hover:bg-gray-700/40 transition`}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-white font-medium text-sm line-clamp-2">
          "{match.text}"
        </p>
        <span
          className={`text-sm font-bold ml-2 ${
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

      <div className="space-y-1 text-xs">
        <p className="text-gray-400">
          <span className="font-medium">Source:</span> {match.source}
        </p>
        {match.matchedWith && (
          <p className="text-purple-400">
            <span className="font-medium">Cross-match with:</span>{" "}
            {match.matchedWith.join(", ")}
          </p>
        )}
      </div>
    </div>
  );

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading analysis...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
      <Grid height={100} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Reports
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-md bg-purple-600/20">
              {getAnalysisIcon(analysisData.analysisType)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {analysisData.name}
              </h1>
              <p className="text-gray-400">
                {getAnalysisLabel(analysisData.analysisType)} •{" "}
                {analysisData.uploadDate}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Total Documents",
              value: analysisData.stats.totalDocuments,
              icon: <FileText className="w-4 h-4 text-blue-400" />,
              color: "text-white",
            },
            {
              label: "Flagged",
              value: analysisData.stats.flaggedDocuments,
              icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
              color: "text-red-400",
            },
            {
              label: "Avg Similarity",
              value: `${analysisData.stats.averageSimilarity}%`,
              icon: <BarChart3 className="w-4 h-4 text-yellow-400" />,
              color: "text-yellow-400",
            },
            {
              label: "Cross Matches",
              value: analysisData.stats.crossMatches,
              icon: <Network className="w-4 h-4 text-purple-400" />,
              color: "text-purple-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-800/60 backdrop-blur-md rounded-md p-5 border border-gray-700/50 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-10">
          {["overview", "individual", "comparison"].map(
            (mode) =>
              (mode !== "comparison" ||
                analysisData.analysisType === "batch") && (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-5 py-2 rounded-md font-medium transition ${
                    viewMode === mode
                      ? "bg-purple-600 text-white shadow"
                      : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60"
                  }`}
                >
                  {mode === "overview"
                    ? "Overview"
                    : mode === "individual"
                    ? "Individual Results"
                    : "Cross Comparison"}
                </button>
              )
          )}
        </div>

        {/* Overview */}
        {viewMode === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {analysisData.documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                isSelected={false}
                onClick={() => {
                  setSelectedDocument(doc);
                  setViewMode("individual");
                }}
              />
            ))}
          </div>
        )}

        {/* Individual */}
        {viewMode === "individual" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Document list */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Documents</h2>
              {analysisData.documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  isSelected={selectedDocument?.id === doc.id}
                  onClick={setSelectedDocument}
                />
              ))}
            </div>

            {/* Selected doc */}
            <div className="lg:col-span-2">
              {selectedDocument ? (
                <div className="bg-gray-800/60 backdrop-blur-md rounded-md p-6 border border-gray-700/50 shadow-md">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {selectedDocument.name}
                      </h2>
                      <p className="text-gray-400">
                        by {selectedDocument.author} •{" "}
                        {selectedDocument.wordCount} words
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-3xl font-bold ${
                          selectedDocument.similarity > 30
                            ? "text-red-400"
                            : selectedDocument.similarity > 15
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {selectedDocument.similarity}%
                      </div>
                      <p className="text-gray-400 text-sm">Similarity</p>
                    </div>
                  </div>

                  {/* Match tabs */}
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setActiveTab("all")}
                        className={`px-3 py-1 rounded-md text-sm transition ${
                          activeTab === "all"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                        }`}
                      >
                        All Matches ({selectedDocument.matches.length})
                      </button>
                      <button
                        onClick={() => setActiveTab("high")}
                        className={`px-3 py-1 rounded-md text-sm transition ${
                          activeTab === "high"
                            ? "bg-red-600 text-white"
                            : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                        }`}
                      >
                        High Risk
                      </button>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scroll">
                      {selectedDocument.matches
                        .filter(
                          (match) =>
                            activeTab === "all" || match.similarity > 70
                        )
                        .map((match, i) => (
                          <MatchCard key={i} match={match} />
                        ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow transition flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition">
                      View Full Document
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-md p-12 border border-gray-700/50 text-center shadow">
                  <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Select a document to view detailed analysis
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comparison */}
        {viewMode === "comparison" && analysisData.analysisType === "batch" && (
          <div className="bg-gray-800/60 backdrop-blur-md rounded-md p-6 border border-gray-700/50 shadow-md">
            <h2 className="text-2xl font-bold text-white mb-6">
              Cross-Document Comparison
            </h2>
            <div className="space-y-6">
              {analysisData.documents
                .filter((doc) => doc.matches.some((m) => m.matchedWith))
                .map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-gray-700 rounded-md p-4 bg-gray-900/30"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">
                      {doc.name} ↔ Cross Matches
                    </h3>
                    <div className="space-y-3">
                      {doc.matches
                        .filter((m) => m.matchedWith)
                        .map((match, i) => (
                          <div
                            key={i}
                            className="bg-purple-900/20 border border-purple-500/30 rounded-md p-4 hover:bg-purple-800/20 transition"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-white font-medium">
                                "{match.text}"
                              </p>
                              <span className="text-purple-400 font-bold">
                                {match.similarity}%
                              </span>
                            </div>
                            <p className="text-purple-300 text-sm">
                              Also found in: {match.matchedWith.join(", ")}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

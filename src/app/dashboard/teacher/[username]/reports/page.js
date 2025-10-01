"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  Clock,
  Info,
  FileText,
  Users,
  Database,
  Brain,
  BarChart3,
} from "lucide-react";
import Grid from "@/components/Grid";
export default function TeacherReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [viewingReport, setViewingReport] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [analysisFilter, setAnalysisFilter] = useState("all");

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        name: "CS101_Assignment1_Batch",
        analysisType: "batch",
        submittedBy: "System",
        uploadDate: "2024-01-15",
        similarity: 34,
        status: "completed",
        flagged: true,
        fileCount: 25,
        processingTime: "5m 23s",
        avgSimilarity: 28.5,
        sources: ["Internal Database", "Web Sources", "Cross-comparison"],
      },
      {
        id: 2,
        name: "Research_Paper_Ethics.pdf",
        analysisType: "lexical",
        submittedBy: "John Smith",
        uploadDate: "2024-01-14",
        similarity: 12,
        status: "completed",
        flagged: false,
        fileCount: 1,
        processingTime: "2m 15s",
        wordCount: 3200,
        sources: ["Academic Journals", "Web Sources"],
      },
      {
        id: 3,
        name: "Literature_Review_Set.docx",
        analysisType: "semantic",
        submittedBy: "Emma Johnson",
        uploadDate: "2024-01-13",
        similarity: 45,
        status: "processing",
        flagged: true,
        fileCount: 3,
        processingTime: "8m 45s",
        sources: ["Academic Database", "Semantic Analysis Engine"],
      },
      {
        id: 4,
        name: "Final_Essays_Comparison",
        analysisType: "batch",
        submittedBy: "System",
        uploadDate: "2024-01-12",
        similarity: 18,
        status: "completed",
        flagged: false,
        fileCount: 15,
        processingTime: "12m 30s",
        avgSimilarity: 15.8,
        sources: ["Cross-comparison Only"],
      },
    ];

    setReports(mockReports);
  }, []);

  // Calculate statistics
  const totalReports = reports.length;
  const avgSimilarity =
    reports.length > 0
      ? (
          reports.reduce((sum, report) => sum + report.similarity, 0) /
          totalReports
        ).toFixed(1)
      : 0;
  const highSimilarityCount = reports.filter((r) => r.similarity > 30).length;
  const batchReports = reports.filter((r) => r.analysisType === "batch").length;

  // Filter reports
  const filteredReports = reports
    .filter((report) => {
      if (activeTab === "flagged") return report.flagged;
      if (activeTab === "processing") return report.status === "processing";
      return true;
    })
    .filter((report) => {
      if (analysisFilter === "all") return true;
      return report.analysisType === analysisFilter;
    })
    .filter(
      (report) =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    if (sortBy === "oldest")
      return new Date(a.uploadDate) - new Date(b.uploadDate);
    if (sortBy === "highest") return b.similarity - a.similarity;
    if (sortBy === "lowest") return a.similarity - b.similarity;
    return 0;
  });

  const getAnalysisIcon = (type) => {
    switch (type) {
      case "lexical":
        return <FileText className="w-4 h-4" />;
      case "semantic":
        return <Brain className="w-4 h-4" />;
      case "batch":
        return <Users className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
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

  const getAnalysisColor = (type) => {
    switch (type) {
      case "lexical":
        return "text-blue-400";
      case "semantic":
        return "text-green-400";
      case "batch":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "purple",
  }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-md p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-md bg-${color}-600/20`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  const ReportCard = ({ report }) => (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-md p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`p-1.5 rounded-md bg-gray-700/50 ${getAnalysisColor(
                report.analysisType
              )}`}
            >
              {getAnalysisIcon(report.analysisType)}
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full bg-gray-700/50 ${getAnalysisColor(
                report.analysisType
              )}`}
            >
              {getAnalysisLabel(report.analysisType)}
            </span>
          </div>

          <h3 className="text-white font-bold text-lg mb-1">{report.name}</h3>
          <p className="text-gray-400 text-sm">
            {report.analysisType === "batch"
              ? "System Generated"
              : `by ${report.submittedBy}`}{" "}
            • {report.uploadDate}
          </p>

          {report.analysisType === "batch" && (
            <p className="text-gray-500 text-xs mt-1">
              {report.fileCount} files • Avg: {report.avgSimilarity}%
            </p>
          )}
          {report.wordCount && (
            <p className="text-gray-500 text-xs mt-1">
              {report.wordCount.toLocaleString()} words
            </p>
          )}
        </div>

        <button
          className="text-gray-400 hover:text-red-400 transition-colors p-2"
          onClick={() => console.log("Delete report", report.id)}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Similarity Score */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">
            {report.analysisType === "batch"
              ? "Highest Similarity"
              : "Similarity Score"}
          </span>
          <span
            className={`font-bold ${
              report.similarity > 30
                ? "text-red-400"
                : report.similarity > 15
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {report.similarity}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              report.similarity > 30
                ? "bg-red-500"
                : report.similarity > 15
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${report.similarity}%` }}
          />
        </div>
      </div>

      {/* Status and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{report.processingTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>{report.sources.length} sources</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {report.status === "processing" ? (
            <span className="text-yellow-400 text-xs flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              Processing
            </span>
          ) : report.flagged ? (
            <span className="text-red-400 text-xs flex items-center gap-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              Flagged
            </span>
          ) : (
            <span className="text-green-400 text-xs flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Clear
            </span>
          )}

          <button
            onClick={() => setViewingReport(report)}
            className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 rounded-md transition-colors text-xs flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            View
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
      <Grid height={151} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            Analysis{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">
              Reports
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive plagiarism analysis results from lexical, semantic,
            and batch processing
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Reports"
            value={totalReports}
            subtitle="All analysis types"
            icon={FileText}
            color="purple"
          />
          <StatCard
            title="Average Similarity"
            value={`${avgSimilarity}%`}
            subtitle="Across all reports"
            icon={BarChart3}
            color="blue"
          />
          <StatCard
            title="Flagged Reports"
            value={highSimilarityCount}
            subtitle="Requiring attention"
            icon={Database}
            color="red"
          />
          <StatCard
            title="Batch Analyses"
            value={batchReports}
            subtitle="Multi-file comparisons"
            icon={Users}
            color="green"
          />
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white focus:border-purple-500 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Analysis Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={analysisFilter}
                  onChange={(e) => setAnalysisFilter(e.target.value)}
                  className="bg-gray-800/50 px-3 py-2 rounded-md border border-gray-600 text-white focus:border-purple-500 focus:outline-none text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="lexical">Lexical</option>
                  <option value="semantic">Semantic</option>
                  <option value="batch">Batch</option>
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/50 px-3 py-2 rounded-md border border-gray-600 text-white focus:border-purple-500 focus:outline-none text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Similarity</option>
                <option value="lowest">Lowest Similarity</option>
              </select>
            </div>
          </div>

          {/* Tab Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              All Reports
            </button>
            <button
              onClick={() => setActiveTab("flagged")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "flagged"
                  ? "bg-red-600 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              Flagged
            </button>
            <button
              onClick={() => setActiveTab("processing")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "processing"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              Processing
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>

        {/* Empty State */}
        {sortedReports.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-xl mb-2">No reports found</p>
            <p className="text-gray-500">
              Try adjusting your filters or upload some documents to analyze
            </p>
          </div>
        )}

        {/* Modal for viewing report details */}
        {viewingReport && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-md border border-gray-700 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`p-2 rounded-md bg-gray-700/50 ${getAnalysisColor(
                        viewingReport.analysisType
                      )}`}
                    >
                      {getAnalysisIcon(viewingReport.analysisType)}
                    </div>
                    <span
                      className={`text-sm px-3 py-1 rounded-full bg-gray-700/50 ${getAnalysisColor(
                        viewingReport.analysisType
                      )}`}
                    >
                      {getAnalysisLabel(viewingReport.analysisType)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl text-white mb-1">
                    {viewingReport.name}
                  </h2>
                  <p className="text-gray-400">
                    {viewingReport.analysisType === "batch"
                      ? "System Generated"
                      : `Submitted by ${viewingReport.submittedBy}`}{" "}
                    • {viewingReport.uploadDate}
                  </p>
                </div>
                <button
                  onClick={() => setViewingReport(null)}
                  className="text-2xl text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Report Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-3">
                    Analysis Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Similarity Score:</span>
                      <span
                        className={`font-bold ${
                          viewingReport.similarity > 30
                            ? "text-red-400"
                            : viewingReport.similarity > 15
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {viewingReport.similarity}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing Time:</span>
                      <span className="text-white">
                        {viewingReport.processingTime}
                      </span>
                    </div>
                    {viewingReport.fileCount && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Files Analyzed:</span>
                        <span className="text-white">
                          {viewingReport.fileCount}
                        </span>
                      </div>
                    )}
                    {viewingReport.avgSimilarity && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          Average Similarity:
                        </span>
                        <span className="text-white">
                          {viewingReport.avgSimilarity}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-3">
                    Sources Checked
                  </h3>
                  <div className="space-y-2">
                    {viewingReport.sources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-md transition-all duration-300 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
                {viewingReport.analysisType !== "batch" && (
                  <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Analysis
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

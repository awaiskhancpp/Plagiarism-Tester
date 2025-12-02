"use client";
import { useState, useEffect } from "react";
import Grid from "@/components/Grid";
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
import { DM_Sans, Raleway, Inter } from "next/font/google";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

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

export default function TeacherReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [viewingReport, setViewingReport] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [analysisFilter, setAnalysisFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/v1/teacher/crud-report", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      setReports(data.reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `/api/v1/teacher/crud-report?id=${reportId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }

      setReports(reports.filter((r) => r._id !== reportId));

      if (viewingReport?._id === reportId) {
        setViewingReport(null);
      }

      toast.success("Report deleted successfully");
    } catch (error) {
      console.error("Error deleting report:", error);
      toast.error("Failed to delete report");
    }
  };

  const handleDownload = (report) => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const { width, height } = doc.internal.pageSize;

      doc.setFillColor(30, 30, 30);
      doc.rect(0, 0, width, height, "F");

      const centerX = width / 2;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(192, 132, 252);
      doc.text("Analysis Report", centerX, 50, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(180, 180, 180);
      doc.text(report.name || `Report-${report._id}`, centerX, 70, {
        align: "center",
      });

      autoTable(doc, {
        startY: 80,
        head: [[{ content: "Report Details", colSpan: 2 }]],
        body: [
          [
            "Date",
            report.uploadDate
              ? format(new Date(report.uploadDate), "MMMM d, yyyy")
              : "N/A",
          ],
          [
            "Similarity",
            report.similarity != null ? `${report.similarity}%` : "N/A",
          ],
          ["Analysis Type", report.analysisType || "N/A"],
          ["Processing Time", report.processingTime || "N/A"],
          ["Sources", report.sources?.length || 0],
          ["Status", report.flagged ? "Flagged" : "Clear"],
        ],
        theme: "grid",
        headStyles: {
          fillColor: [192, 132, 252],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 12,
          halign: "center",
        },
        styles: {
          font: "helvetica",
          fontSize: 10,
          textColor: [220, 220, 220],
          fillColor: [50, 50, 50],
          lineColor: [100, 100, 100],
          lineWidth: 0.5,
        },
        columnStyles: {
          0: { cellWidth: 150, fontStyle: "bold" },
          1: { cellWidth: 350 },
        },
        margin: { left: 40, right: 40 },
      });

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Generated on ${format(new Date(), "MMMM d, yyyy, h:mm a")}`,
        40,
        height - 20
      );

      const baseName = report.name
        ? report.name.replace(/\.[^/.]+$/, "")
        : `report-${report._id}`;
      doc.save(`${baseName}.pdf`);

      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download report");
    }
  };

  const totalReports = reports.length;
  const avgSimilarity =
    reports.length > 0
      ? (
          reports.reduce((sum, report) => sum + report.similarity, 0) /
          totalReports
        ).toFixed(1)
      : 0;
  const highSimilarityCount = reports.filter((r) => r.similarity > 70).length;
  const lexicalReports = reports.filter(
    (r) => r.analysisType === "lexical"
  ).length;

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
    .filter((report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      case "internal":
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
      case "internal":
        return "Internal Analysis";
      default:
        return "Analysis";
    }
  };

  const getAnalysisColor = (type) => {
    switch (type) {
      case "lexical":
        return "text-blue-300";
      case "semantic":
        return "text-green-300";
      case "internal":
        return "text-purple-300";
      default:
        return "text-gray-300";
    }
  };

  const formatDate = (isoDate) => {
    return format(new Date(isoDate), "MMMM d, yyyy, h:mm a");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-200 py-32 px-4 md:px-8">
      <Grid />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1
            className={`${rw_bold.className} text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tighter`}
          >
            Analysis{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-600 bg-clip-text text-transparent">
              Reports
            </span>
          </h1>
          <p
            className={`${dmSans_light.className} text-lg md:text-xl text-gray-400 max-w-3xl mx-auto`}
          >
            Comprehensive plagiarism analysis results from lexical, semantic,
            and batch processing
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-72 mb-12">
          {/* Total Reports Card */}
          <div className="bg-gradient-to-br from-gray-900/50 h-48 flex items-center justify-center to-transparent border border-gray-800/50 hover:border-purple-500/30 p-6 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <h3
                className={`${dmSans_light.className} text-gray-300  mb-3 text-sm md:text-base`}
              >
                Total Reports
              </h3>
              <p
                className={`${dmSans_light.className} text-4xl md:text-5xl bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent`}
              >
                {totalReports}
              </p>
            </div>
          </div>

          {/* Avg Similarity Card */}
          <div className="bg-gradient-to-br from-gray-900/50 h-48 flex items-center justify-center   to-transparent border border-gray-800/50 hover:border-purple-500/30 p-6 transition-all duration-300 hover:scale-105">
            <div>
              <h3
                className={`${dmSans_light.className} text-gray-300 mb-3 text-center text-sm md:text-base`}
              >
                Avg Similarity
              </h3>
              <p
                className={`${dmSans_light.className} text-4xl md:text-5xl bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent`}
              >
                {avgSimilarity == "NaN" ? 0 : avgSimilarity}%
              </p>
            </div>
          </div>

          {/* High Matches Card */}
          <div className="bg-gradient-to-br from-gray-900/50 h-48 flex items-center justify-center  to-transparent border border-gray-800/50 hover:border-purple-500/30 p-6 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <h3
                className={`${dmSans_light.className} text-gray-300  mb-3 text-sm md:text-base `}
              >
                High Matches
              </h3>
              <p
                className={`${dmSans_light.className} text-4xl md:text-5xl bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent`}
              >
                {highSimilarityCount}
              </p>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-10 px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                className={`${rw.className} w-full pl-12 pr-6 py-3 bg-gray-900/50 border border-gray-700 focus:border-purple-400 focus:outline-none text-gray-200 placeholder-gray-500 transition-colors`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  className={`${dmSans_light.className} bg-gray-900/50 px-4 py-2 border border-gray-700 text-gray-200 focus:border-purple-400 focus:outline-none transition-colors`}
                  value={analysisFilter}
                  onChange={(e) => setAnalysisFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="lexical">Lexical</option>
                  <option value="semantic">Semantic</option>
                  <option value="internal">Batch</option>
                </select>
              </div>

              <select
                className={`${dmSans_light.className} bg-gray-900/50 px-4 py-2 border border-gray-700 text-gray-200 focus:border-purple-400 focus:outline-none transition-colors`}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
              className={`${dmSans_light.className} px-4 py-2 transition-all ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white border border-purple-400/30"
                  : "bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-gray-600"
              }`}
            >
              All Reports
            </button>
            <button
              onClick={() => setActiveTab("flagged")}
              className={`${dmSans_light.className} px-4 py-2 transition-all ${
                activeTab === "flagged"
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white border border-red-400/30"
                  : "bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-gray-600"
              }`}
            >
              Flagged
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-20">
          {sortedReports.map((report) => (
            <div
              key={report._id}
              className="bg-gradient-to-br from-gray-900/50 to-transparent border border-gray-800/50 hover:border-purple-500/30 overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`p-1.5 bg-gray-800/50 rounded ${getAnalysisColor(
                          report.analysisType
                        )}`}
                      >
                        {getAnalysisIcon(report.analysisType)}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full bg-gray-800/50 ${getAnalysisColor(
                          report.analysisType
                        )}`}
                      >
                        {getAnalysisLabel(report.analysisType)}
                      </span>
                    </div>
                    <h3
                      className={`${dmSans_light.className} text-lg text-gray-100 mb-1 line-clamp-2`}
                    >
                      {report.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {formatDate(report.uploadDate)}
                    </p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer ml-2"
                    onClick={() => deleteReport(report._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Similarity</span>
                    <span
                      className={`${dmSans_light.className} ${
                        report.similarity > 70
                          ? "text-red-300"
                          : report.similarity > 30
                          ? "text-yellow-300"
                          : "text-green-300"
                      }`}
                    >
                      {report.similarity}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        report.similarity > 70
                          ? "bg-gradient-to-r from-red-400 to-red-600"
                          : report.similarity > 30
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                          : "bg-gradient-to-r from-green-400 to-green-600"
                      }`}
                      style={{ width: `${report.similarity}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{report.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Info size={14} />
                    <span>{report.sources?.length || 0} sources</span>
                  </div>
                </div>

                <button
                  onClick={() => setViewingReport(report)}
                  className="w-full py-2 bg-gradient-to-r from-purple-600/30 to-purple-500/30 border border-purple-500/50 hover:border-purple-400 text-purple-200 hover:text-purple-100 flex items-center justify-center gap-2 transition-all duration-300 hover:from-purple-600/50 hover:to-purple-500/50"
                >
                  <Eye size={16} /> View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedReports.length === 0 && (
          <div className="text-center py-16">
            <p className={`${dmSans_light.className} text-gray-400 text-xl`}>
              No reports found. Upload documents to get started.
            </p>
          </div>
        )}

        {/* Report Detail Modal */}
        {viewingReport && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900/90 to-transparent rounded-lg border border-gray-700/50 p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2.5 rounded-lg bg-gray-800/50 ${getAnalysisColor(
                        viewingReport.analysisType
                      )}`}
                    >
                      {getAnalysisIcon(viewingReport.analysisType)}
                    </div>
                    <span
                      className={`text-sm px-3 py-1.5 rounded-full bg-gray-800/50 ${getAnalysisColor(
                        viewingReport.analysisType
                      )}`}
                    >
                      {getAnalysisLabel(viewingReport.analysisType)}
                    </span>
                  </div>
                  <h2
                    className={`${rw_bold.className} text-3xl md:text-4xl text-gray-100 mb-2 tracking-tighter`}
                  >
                    {viewingReport.name}
                  </h2>
                  <p className="text-gray-400 text-base">
                    Analyzed on {formatDate(viewingReport.uploadDate)}
                  </p>
                </div>
                <button
                  onClick={() => setViewingReport(null)}
                  className="text-gray-400 hover:text-gray-200 transition-colors p-2"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              {/* Similarity Score Section */}
              <div className="bg-gradient-to-br from-gray-900/50 to-transparent border border-gray-700/50 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`${dmSans_light.className} text-xl text-gray-100`}
                  >
                    Similarity Score
                  </h3>
                  <span
                    className={`text-3xl font-bold ${dmSans_light.className} ${
                      viewingReport.similarity > 70
                        ? "text-red-300"
                        : viewingReport.similarity > 30
                        ? "text-yellow-300"
                        : "text-green-300"
                    }`}
                  >
                    {viewingReport.similarity}%
                  </span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full ${
                      viewingReport.similarity > 70
                        ? "bg-gradient-to-r from-red-400 to-red-600"
                        : viewingReport.similarity > 30
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                        : "bg-gradient-to-r from-green-400 to-green-600"
                    }`}
                    style={{ width: `${viewingReport.similarity}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm">
                  {viewingReport.similarity > 70
                    ? "High probability of plagiarism"
                    : viewingReport.similarity > 30
                    ? "Moderate similarity detected"
                    : "Low similarity - likely original"}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Processing Time */}
                <div className="bg-gradient-to-br from-gray-900/50 to-transparent border border-gray-700/50 p-5 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Clock size={18} className="text-purple-300" />
                    </div>
                    <h4 className="text-gray-100 text-base font-medium">
                      Processing Time
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm ml-11">
                    {viewingReport.processingTime}
                  </p>
                </div>

                {/* Sources Checked */}
                <div className="bg-gradient-to-br from-gray-900/50 to-transparent border border-gray-700/50 p-5 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Info size={18} className="text-blue-300" />
                    </div>
                    <h4 className="text-gray-100 text-base font-medium">
                      Sources Checked
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm ml-11">
                    {viewingReport.sources?.length || 0} sources
                  </p>
                </div>
              </div>

              {/* Matched Sources */}
              {viewingReport.sources && viewingReport.sources.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg text-gray-100 mb-4 font-semibold">
                    Matched Sources
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {viewingReport.sources.map((source, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-900/50 to-transparent border border-gray-700/50 p-4 rounded-lg hover:border-purple-500/30 transition-colors"
                      >
                        <span className="text-gray-300 text-sm break-all">
                          {source}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analyzed Documents */}
              {viewingReport.documents &&
                viewingReport.documents.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg text-gray-100 mb-4 font-semibold">
                      Analyzed Documents
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {viewingReport.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-900/50 to-transparent border border-gray-700/50 p-4 rounded-lg flex justify-between items-center hover:border-purple-500/30 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="text-gray-100 font-medium text-sm">
                              {doc.name}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {doc.matchCount} matches • {doc.wordCount} words
                            </p>
                          </div>
                          <div className="flex items-center gap-4 ml-4">
                            <span
                              className={`font-bold text-sm ${
                                doc.similarity > 70
                                  ? "text-red-300"
                                  : doc.similarity > 30
                                  ? "text-yellow-300"
                                  : "text-green-300"
                              }`}
                            >
                              {doc.similarity}%
                            </span>
                            {doc.flagged && (
                              <span className="text-xs bg-red-500/20 text-red-300 px-2.5 py-1 rounded-lg">
                                Flagged
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t border-gray-700">
                <button
                  onClick={() => handleDownload(viewingReport)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 font-medium"
                >
                  <Download size={18} /> Download Report
                </button>
                <button
                  onClick={() => deleteReport(viewingReport._id)}
                  className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500/50 font-medium"
                >
                  <Trash2 size={18} /> Delete Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { DM_Sans, Raleway, Inter } from "next/font/google";
import Link from "next/link";
import {
  PiMagnifyingGlass,
  PiTrash,
  PiEye,
  PiDownload,
  PiClock,
  PiFunnel,
  PiInfo,
} from "react-icons/pi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Grid from "@/components/Grid";

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

export default function ReportsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [viewingReport, setViewingReport] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/student/crud-report");
      console.log("Fetched reports:", response.data);

      setReports(response.data.reports);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      await axios.delete(`/api/v1/student/crud-report?id=${reportId}`);

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
      doc.setTextColor(120, 80, 255);
      doc.text("Sluethink Report", centerX, 50, { align: "center" });

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
          ["Word Count", report.wordCount?.toLocaleString() || "N/A"],
          ["Processing Time", report.processingTime || "N/A"],
          ["Sources", report.sources?.length || 0],
          ["Status", report.flagged ? "Flagged" : "Clear"],
        ],
        theme: "grid",
        headStyles: {
          fillColor: [120, 80, 255],
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

  const filteredReports = reports
    .filter((report) => {
      if (activeTab === "flagged") return report.flagged;
      if (activeTab === "processing") return report.status === "processing";
      return true;
    })
    .filter((report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === "newest")
      return (
        new Date(b.uploadDate || b.createdAt) -
        new Date(a.uploadDate || a.createdAt)
      );
    if (sortBy === "oldest")
      return (
        new Date(a.uploadDate || a.createdAt) -
        new Date(b.uploadDate || b.createdAt)
      );
    if (sortBy === "highest") return b.similarity - a.similarity;
    if (sortBy === "lowest") return a.similarity - b.similarity;
    return 0;
  });

  const formatDate = (isoDate) => {
    try {
      return format(new Date(isoDate), "MMMM d, yyyy, h:mm a");
    } catch (e) {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44 px-52">
      <title>Your Reports - SleuthInk</title>
      <Grid />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1
            className={`${rw_bold.className} text-5xl md:text-6xl lg:text-7xl mb-4`}
          >
            Your{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">
              Reports
            </span>
          </h1>
          <p
            className={`${dmSans_light.className} text-lg md:text-xl text-gray-400 max-w-3xl mx-auto`}
          >
            Detailed analysis of all your plagiarism checks with comprehensive
            results
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12 px-40">
          <div className="bg-gradient-to-br  from-gray-800 to-gray-900 flex items-center justify-center  border border-gray-700 p-6 text-center h-50 transition-transform hover:scale-105 ">
            <div>
              <h3
                className={`${dmSans_light.className} text-gray-400 mb-2 text-base md:text-lg`}
              >
                Total Checks
              </h3>
              <p
                className={`${dmSans_light.className} text-4xl md:text-5xl bg-gradient-to-r from-purple-200 to-purple-900 bg-clip-text text-transparent`}
              >
                {totalReports}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br  from-gray-800 to-gray-900 flex items-center justify-center h-50 border border-gray-700 p-6 text-center transition-transform hover:scale-105 ">
            <div>
              <h3
                className={`${dmSans_light.className} text-gray-400 mb-2 text-base md:text-lg`}
              >
                Avg Similarity
              </h3>
              <p
                className={`${dmSans_light.className} text-4xl md:text-5xl bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-transparent`}
              >
                {avgSimilarity == "NaN" ? 0 : avgSimilarity}%
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-50  flex justify-center items-center border border-gray-700 p-6 text-center transition-transform hover:scale-105 ">
            <div>
              <h3
                className={`${dmSans_light.className} text-gray-400 mb-2 text-base md:text-lg`}
              >
                High Matches
              </h3>
              <p
                className={`${dmSans_light.className} text-4xl md:text-5xl bg-gradient-to-r from-red-100 to-red-800 bg-clip-text text-transparent`}
              >
                {highSimilarityCount}
              </p>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <div className="relative flex-1 max-w-2xl">
              <PiMagnifyingGlass className="absolute left-4 top-1/2 transform text-2xl -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Search documents..."
                className={`${rw.className} w-full pl-12 pr-6 py-3 bg-gray-800  border border-gray-700 focus:border-purple-500 focus:outline-none text-gray-300`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <PiFunnel className="text-gray-500 text-xl" />
                <select
                  className={`${dmSans_light.className} bg-gray-800 px-4 py-2  border border-gray-700 text-gray-300 focus:border-purple-500 focus:outline-none`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Similarity</option>
                  <option value="lowest">Lowest Similarity</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`${dmSans_light.className} px-4 py-2  ${
                    activeTab === "all"
                      ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("flagged")}
                  className={`${dmSans_light.className} px-4 py-2  ${
                    activeTab === "flagged"
                      ? "bg-gradient-to-r from-red-400 to-red-800 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  Flagged
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {sortedReports.map((report) => (
            <div
              key={report._id}
              className="bg-gradient-to-br h-80  from-gray-800 to-gray-900 border border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-13">
                  <div>
                    <h3
                      className={`${dmSans_light.className} text-2xl text-white mb-1`}
                    >
                      {report.name}
                    </h3>
                    <p
                      className={`${dmSans_light.className} text-gray-400 text-sm`}
                    >
                      {formatDate(report.uploadDate || report.createdAt)} •{" "}
                      {(report.wordCount || 0).toLocaleString()} words
                    </p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-400 cursor-pointer"
                    onClick={() => deleteReport(report._id)}
                  >
                    <PiTrash size={18} />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`${dmSans_light.className} text-gray-400`}>
                      Similarity
                    </span>
                    <span
                      className={`${dmSans_light.className} ${
                        report.similarity > 70
                          ? "text-red-400"
                          : report.similarity > 30
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
                        report.similarity > 70
                          ? "bg-gradient-to-r from-red-300 to-red-700"
                          : report.similarity > 30
                          ? "bg-gradient-to-r from-yellow-300 to-yellow-700"
                          : "bg-gradient-to-r from-green-300 to-green-700"
                      }`}
                      style={{ width: `${report.similarity}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <PiClock size={14} />
                    <span>{report.processingTime || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiInfo size={14} />
                    <span>{(report.sources || []).length} sources</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-9">
                  <button
                    onClick={() => setViewingReport(report)}
                    className={`${dmSans_light.className} flex-1 py-2 bg-gradient-to-r cursor-pointer from-purple-400 to-purple-800  text-gray-300 hover:from-gray-600 hover:to-gray-700 flex items-center justify-center gap-2`}
                  >
                    <PiEye size={16} /> View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedReports.length === 0 && (
          <div className="text-center py-16">
            <p className={`${dmSans_light.className} text-gray-400 text-xl`}>
              No reports found. Upload a document to get started.
            </p>
          </div>
        )}

        {/* Report Detail Modal */}
        {viewingReport && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900  border border-gray-700 p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2
                    className={`${dmSans_light.className} text-2xl md:text-3xl text-white mb-1`}
                  >
                    {viewingReport.name}
                  </h2>
                  <p className={`${dmSans_light.className} text-gray-400`}>
                    Analyzed on{" "}
                    {formatDate(
                      viewingReport.uploadDate || viewingReport.createdAt
                    )}{" "}
                    • {(viewingReport.wordCount || 0).toLocaleString()} words
                  </p>
                </div>
                <button
                  onClick={() => setViewingReport(null)}
                  className="text-2xl text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Similarity Score */}
              <div className="bg-gray-800 p-6  border border-gray-700 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`${dmSans_light.className} text-xl text-white`}
                  >
                    Similarity Score
                  </h3>
                  <span
                    className={`text-2xl font-bold ${dmSans_light.className} ${
                      viewingReport.similarity > 70
                        ? "text-red-400"
                        : viewingReport.similarity > 30
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {viewingReport.similarity}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      viewingReport.similarity > 70
                        ? "bg-red-500"
                        : viewingReport.similarity > 30
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${viewingReport.similarity}%` }}
                  ></div>
                </div>
                <p className={`${dmSans_light.className} text-gray-400 mt-3`}>
                  {viewingReport.similarity > 70
                    ? "High probability of plagiarism"
                    : viewingReport.similarity > 30
                    ? "Moderate similarity detected"
                    : "Low similarity - likely original"}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800 p-4  border border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <PiClock size={20} className="text-purple-400" />
                    <h4 className={`${dmSans_light.className} text-white`}>
                      Processing Time
                    </h4>
                  </div>
                  <p className={`${dmSans_light.className} text-gray-300`}>
                    {viewingReport.processingTime || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-800 p-4  border border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <PiInfo size={20} className="text-blue-400" />
                    <h4 className={`${dmSans_light.className} text-white`}>
                      Sources Checked
                    </h4>
                  </div>
                  <p className={`${dmSans_light.className} text-gray-300`}>
                    {(viewingReport.sources || []).length} sources
                  </p>
                </div>
              </div>

              {/* Matched Sources */}
              {viewingReport.sources && viewingReport.sources.length > 0 && (
                <div className="mb-8">
                  <h3
                    className={`${dmSans_light.className} text-xl text-white mb-4`}
                  >
                    Matched Sources
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {viewingReport.sources.map((source, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 p-4  border border-gray-700 flex justify-between items-center"
                      >
                        <span className={`${dmSans_light.className} break-all`}>
                          {source}
                        </span>
                        <Link
                          href={source}
                          target="_blank"
                          className="text-purple-400 hover:text-purple-300 ml-2"
                        >
                          <PiEye size={18} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => handleDownload(viewingReport)}
                  className={`${dmSans_light.className} px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-800  cursor-pointer text-gray-300 flex items-center justify-center gap-2 hover:from-purple-600 hover:to-purple-700 transition`}
                >
                  <PiDownload size={18} /> Download Report
                </button>
                <button
                  onClick={() => deleteReport(viewingReport._id)}
                  className={`${dmSans_light.className} px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300  transition-colors flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500/50`}
                >
                  <PiTrash size={18} /> Delete Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

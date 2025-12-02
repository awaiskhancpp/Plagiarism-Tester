"use client";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Roboto, DM_Sans } from "next/font/google";
=======
import { useState } from "react";
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
import {
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  BarChart3,
  Database,
  RefreshCw,
} from "lucide-react";
import Grid from "@/components/Grid";
<<<<<<< HEAD
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
=======
// Mock Grid component
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
<<<<<<< HEAD
  const [recentReports, setRecentReports] = useState([]);
  const router = useRouter();
  const pathname = usePathname(); // gives current route

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/v1/teacher/crud-report", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await res.json();
        setRecentReports(data.reports || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchReports();
  }, []);

  const handleDelete = async (reportId) => {
    // if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      const res = await fetch(`/api/v1/teacher/crud-report?id=${reportId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to delete report");

      // Remove deleted report from state
      setRecentReports((prev) => prev.filter((r) => r._id !== reportId));
      toast.info("Report has been deleted.");
    } catch (err) {
      console.error(err);
      alert("Error deleting report");
    }
  };

  const totalDocuments = recentReports.length;
  const flaggedDocuments = recentReports.filter((r) => r.flagged).length;
  const avgPlagiarismScore =
    recentReports.length > 0
      ? (
          recentReports.reduce(
            (sum, r) => sum + Number(r.avgSimilarity) || 0,
            0
          ) / recentReports.length
        ).toFixed(1)
      : 0;

  const documentsToday = recentReports.filter((r) => {
    const today = new Date().toISOString().split("T")[0];
    return r.uploadDate.startsWith(today);
  }).length;

  const stats = {
    totalDocuments,
    flaggedDocuments,
    avgPlagiarismScore,
    documentsToday,
  };

  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-11-20"
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]; // minus 1 day

  const docsToday = recentReports.filter((r) =>
    r.uploadDate.startsWith(today)
  ).length;
  const docsYesterday = recentReports.filter((r) =>
    r.uploadDate.startsWith(yesterday)
  ).length;

  const flaggedToday = recentReports.filter(
    (r) => r.uploadDate.startsWith(today) && r.flagged
  ).length;
  const flaggedYesterday = recentReports.filter(
    (r) => r.uploadDate.startsWith(yesterday) && r.flagged
  ).length;

  function calcTrend(todayCount, yesterdayCount) {
    if (yesterdayCount === 0) return todayCount === 0 ? 0 : 100;
    return Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100);
  }

  const documentsTrend = calcTrend(docsToday, docsYesterday);
  const flaggedTrend = calcTrend(flaggedToday, flaggedYesterday);

  const StatCard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <div
      className={`${dmSans.className} bg-gray-800/50 backdrop-blur-sm h-70 flex items-center  p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3  bg-purple-600/20">
            <Icon className="w-7 h-7 text-purple-400" />
          </div>
          {typeof trend === "number" && (
            <span
              className={`text-sm font-semibold ${
                trend > 0
                  ? "text-green-400"
                  : trend < 0
                  ? "text-red-400"
                  : "text-gray-400"
              }`}
            >
              {trend > 0 ? `+${trend}%` : `${trend}%`}
            </span>
          )}
        </div>
        <h3 className="text-5xl font-bold text-white mb-2">{value}</h3>
        <p className="text-gray-400 text-xl font-medium">{title}</p>
        {subtitle && <p className="text-gray-500 text-md">{subtitle}</p>}
      </div>
=======

  // Mock data
  const recentReports = [
    {
      id: 1,
      fileName: "Essay_Analysis_Smith.pdf",
      submittedBy: "John Smith",
      uploadDate: "2024-01-15",
      plagiarismScore: 23,
      status: "completed",
      flagged: true,
    },
    {
      id: 2,
      fileName: "Research_Paper_Johnson.docx",
      submittedBy: "Emma Johnson",
      uploadDate: "2024-01-14",
      plagiarismScore: 8,
      status: "completed",
      flagged: false,
    },
    {
      id: 3,
      fileName: "Literature_Review_Wilson.pdf",
      submittedBy: "Michael Wilson",
      uploadDate: "2024-01-14",
      plagiarismScore: 45,
      status: "processing",
      flagged: true,
    },
    {
      id: 4,
      fileName: "Case_Study_Brown.docx",
      submittedBy: "Sarah Brown",
      uploadDate: "2024-01-13",
      plagiarismScore: 12,
      status: "completed",
      flagged: false,
    },
  ];

  const stats = {
    totalDocuments: 156,
    flaggedDocuments: 23,
    avgPlagiarismScore: 18.5,
    documentsToday: 7,
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-md p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-md bg-purple-600/20">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
        {trend && (
          <span className="text-green-400 text-sm font-medium">+{trend}%</span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
    </div>
  );

  const DocumentRow = ({ doc }) => (
<<<<<<< HEAD
    <div
      className={`${dmSans.className} bg-gray-800/30 backdrop-blur-sm  p-5 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2  bg-gray-700/50">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-base">{doc.name}</h4>
=======
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-md p-4 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-md bg-gray-700/50">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="text-white font-medium">{doc.fileName}</h4>
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            <p className="text-gray-400 text-sm">
              by {doc.submittedBy} • {doc.uploadDate}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div
<<<<<<< HEAD
              className={`text-xl font-bold ${
                doc.avgSimilarity > 30
                  ? "text-red-400"
                  : doc.avgSimilarity > 15
=======
              className={`text-lg font-bold ${
                doc.plagiarismScore > 30
                  ? "text-red-400"
                  : doc.plagiarismScore > 15
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
<<<<<<< HEAD
              {doc.status === "processing" ? "-" : `${doc.avgSimilarity}%`}
=======
              {doc.status === "processing" ? "-" : `${doc.plagiarismScore}%`}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            </div>
            <p className="text-gray-500 text-xs">Similarity</p>
          </div>

          <div className="flex items-center space-x-1">
            {doc.status === "processing" ? (
              <div className="flex items-center text-yellow-400">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">Processing</span>
              </div>
            ) : doc.flagged ? (
              <div className="flex items-center text-red-400">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span className="text-sm">Flagged</span>
              </div>
            ) : (
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">Clear</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
<<<<<<< HEAD
            <button
              onClick={() => handleDelete(doc._id)}
              className="p-2  bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
            >
=======
            <button className="p-2 rounded-md bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-md bg-gray-600/20 hover:bg-gray-600/40 text-gray-400 transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-md bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors">
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const QuickAction = ({
    icon: Icon,
    title,
    description,
    action,
    variant = "default",
  }) => (
    <div
      onClick={action}
<<<<<<< HEAD
      className={`${
        dmSans.className
      } cursor-pointer p-8  border h-70 flex flex-col justify-between transition-all duration-300 hover:scale-105 ${
=======
      className={`cursor-pointer p-6 rounded-md border transition-all duration-300 hover:scale-105 ${
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
        variant === "primary"
          ? "bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-purple-500/50 hover:border-purple-400"
          : "bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50"
      } backdrop-blur-sm`}
    >
<<<<<<< HEAD
      <div>
        <div className="flex items-center mb-5">
          <div
            className={`p-3  ${
              variant === "primary" ? "bg-purple-600/30" : "bg-gray-700/50"
            }`}
          >
            <Icon
              className={`w-7 h-7 ${
                variant === "primary" ? "text-purple-300" : "text-gray-400"
              }`}
            />
          </div>
        </div>
        <h3 className="text-4xl tracking-tighter font-bold text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-400 text-md leading-relaxed">{description}</p>
      </div>
=======
      <div className="flex items-center mb-4">
        <div
          className={`p-3 rounded-md ${
            variant === "primary" ? "bg-purple-600/30" : "bg-gray-700/50"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              variant === "primary" ? "text-purple-300" : "text-gray-400"
            }`}
          />
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
    </div>
  );

  return (
<<<<<<< HEAD
    <div className=" bg-gradient-to-r from-black to-gray-900 text-gray-300">
=======
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300">
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
      <Grid height={170} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 mt-24">
<<<<<<< HEAD
          <h1
            className={`${roboto.className} text-6xl md:text-7xl font-bold mb-4`}
          >
            <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
              Dashboard.
            </span>
          </h1>
          <p className={`${dmSans.className} text-xl text-gray-400`}>
=======
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-400">
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            Monitor document submissions and plagiarism detection results
          </p>
        </div>

        {/* Stats Cards */}
<<<<<<< HEAD
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 auto-rows-max">
=======
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 mb-12">
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
          <StatCard
            title="Total Documents"
            value={stats.totalDocuments}
            subtitle="All time submissions"
            icon={FileText}
<<<<<<< HEAD
=======
            trend={12}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
          />
          <StatCard
            title="Flagged Documents"
            value={stats.flaggedDocuments}
            subtitle="Requiring attention"
            icon={AlertTriangle}
<<<<<<< HEAD
            trend={flaggedTrend}
=======
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
          />
          <StatCard
            title="Avg. Similarity Score"
            value={`${stats.avgPlagiarismScore}%`}
            subtitle="Across all documents"
            icon={BarChart3}
          />
          <StatCard
            title="Documents Today"
            value={stats.documentsToday}
            subtitle="Processed today"
            icon={Clock}
<<<<<<< HEAD
            trend={documentsTrend}
=======
            trend={5}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
<<<<<<< HEAD
          <h2
            className={`${roboto.className} text-3xl font-bold text-white mb-6`}
          >
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max">
=======
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            <QuickAction
              icon={Upload}
              title="Upload Document"
              description="Check a new document for plagiarism"
              variant="primary"
<<<<<<< HEAD
              action={() => router.push(`${pathname}/lexical-analysis`)}
            />
            <QuickAction
              icon={Database}
              title="Internal Analysis"
              description="Compare multiple documents against each other"
              action={() => router.push(`${pathname}/internal-analysis`)}
            />
            <QuickAction
              icon={BarChart3}
              title="Semantic Analysis"
              description="See detailed plagiarism with respect to semantics."
              action={() => router.push(`${pathname}/semantic-analysis`)}
            />
            <QuickAction
              icon={RefreshCw}
              title="All Reports"
              description="Check and compare all reports."
              action={() => router.push(`${pathname}/reports`)}
=======
              action={() => console.log("Upload document")}
            />
            <QuickAction
              icon={Database}
              title="Batch Analysis"
              description="Compare multiple documents against each other"
              action={() => console.log("Batch analysis")}
            />
            <QuickAction
              icon={BarChart3}
              title="View Analytics"
              description="See detailed plagiarism statistics and trends"
              action={() => console.log("View analytics")}
            />
            <QuickAction
              icon={RefreshCw}
              title="Recheck Documents"
              description="Run plagiarism check again on selected files"
              action={() => console.log("Recheck documents")}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            />
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-6">
<<<<<<< HEAD
            <h2 className={`${roboto.className} text-3xl font-bold text-white`}>
              Recent Documents
            </h2>
=======
            <h2 className="text-2xl font-bold text-white">Recent Documents</h2>
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
<<<<<<< HEAD
                  className={`${dmSans.className} pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600  text-white focus:border-purple-500 focus:outline-none placeholder-gray-400`}
                />
              </div>
              <button
                className={`${dmSans.className} flex items-center px-4 py-2 bg-gray-700/50 border border-gray-600  text-white hover:border-purple-500 transition-colors`}
              >
=======
                  className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:border-purple-500 focus:outline-none placeholder-gray-400"
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white hover:border-purple-500 transition-colors">
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="space-y-4">
<<<<<<< HEAD
            {recentReports.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-sm">
                No reports yet. Upload a document to get started!
              </div>
            ) : (
              recentReports
                .slice(0, 5)
                .map((doc) => <DocumentRow key={doc._id} doc={doc} />)
            )}
=======
            {recentReports.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} />
            ))}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import { Roboto, DM_Sans } from "next/font/google";
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
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentReports, setRecentReports] = useState([]);
  const router = useRouter();
  const pathname = usePathname(); // gives current route

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/v1/student/crud-report", {
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

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleDelete = async (reportId) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      const res = await fetch(`/api/v1/student/crud-report?id=${reportId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);

      if (!res.ok) throw new Error("Failed to delete report");

      // Remove deleted report from state
      setRecentReports((prev) => prev.filter((r) => r._id !== reportId));
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
      <title>Dashboard - Sluethink</title>
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
    </div>
  );

  const DocumentRow = ({ doc }) => (
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
            <p className="text-gray-400 text-sm">
              by {doc.submittedBy} • {doc.uploadDate}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div
              className={`text-xl font-bold ${
                doc.avgSimilarity > 30
                  ? "text-red-400"
                  : doc.avgSimilarity > 15
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {doc.status === "processing" ? "-" : `${doc.avgSimilarity}%`}
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
            <button
              onClick={() => handleDelete(doc._id)}
              className="p-2  bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
=======
import {
  Upload,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Grid from "@/components/Grid";
import RotatingBox from "@/components/RotatingBox";

export default function StudentDashboard() {
  const router = useRouter();
  const [recentReports, setRecentReports] = useState([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    avgSimilarity: 0,
    reportsThisMonth: 0,
    flaggedReports: 0,
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate fetching user's reports
    const mockReports = [
      {
        id: 1,
        name: "Essay_Final_Draft.pdf",
        date: "2024-01-15",
        similarity: 12,
        status: "completed",
        flagged: false,
        wordCount: 2500,
      },
      {
        id: 2,
        name: "Research_Paper.docx",
        date: "2024-01-10",
        similarity: 34,
        status: "completed",
        flagged: true,
        wordCount: 4200,
      },
      {
        id: 3,
        name: "Literature_Review.pdf",
        date: "2024-01-08",
        similarity: 8,
        status: "completed",
        flagged: false,
        wordCount: 3100,
      },
    ];

    setRecentReports(mockReports);
    setStats({
      totalReports: mockReports.length,
      avgSimilarity: Math.round(
        mockReports.reduce((sum, r) => sum + r.similarity, 0) /
          mockReports.length
      ),
      reportsThisMonth: mockReports.filter(
        (r) => new Date(r.date).getMonth() === new Date().getMonth()
      ).length,
      flaggedReports: mockReports.filter((r) => r.flagged).length,
    });
  }, []);

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "purple",
  }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-600/20`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
    </div>
  );

  const QuickAction = ({
    icon: Icon,
    title,
    description,
<<<<<<< HEAD
    action,
    variant = "default",
  }) => (
    <div
      onClick={action}
      className={`${
        dmSans.className
      } cursor-pointer p-8  border h-70 flex flex-col justify-between transition-all duration-300 hover:scale-105 ${
=======
    onClick,
    variant = "default",
  }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
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
=======
      <div className="flex items-center mb-4">
        <div
          className={`p-3 rounded-lg ${
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
    </div>
  );

  const ReportCard = ({ report }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-700/50">
            <FileText className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <h4 className="text-white font-medium text-sm">{report.name}</h4>
            <p className="text-gray-400 text-xs">
              {report.date} • {report.wordCount} words
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-center">
            <div
              className={`text-sm font-bold ${
                report.similarity > 30
                  ? "text-red-400"
                  : report.similarity > 15
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {report.similarity}%
            </div>
            <p className="text-gray-500 text-xs">Similarity</p>
          </div>

          {report.flagged ? (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-400" />
          )}
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${
            report.similarity > 30
              ? "bg-red-500"
              : report.similarity > 15
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${report.similarity}%` }}
        />
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
      </div>
    </div>
  );

  return (
<<<<<<< HEAD
    <div className=" bg-gradient-to-r from-black to-gray-900 text-gray-300">
      <Grid height={170} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 mt-24">
          <h1
            className={`${roboto.className} text-6xl md:text-7xl font-bold mb-4`}
          >
            <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
              Dashboard.
            </span>
          </h1>
          <p className={`${dmSans.className} text-xl text-gray-400`}>
            Monitor document submissions and plagiarism detection results
=======
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
      <Grid height={151} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Track your document submissions and plagiarism check results
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
          </p>
        </div>

        {/* Stats Cards */}
<<<<<<< HEAD
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 auto-rows-max">
          <StatCard
            title="Total Documents"
            value={stats.totalDocuments}
            subtitle="All time submissions"
            icon={FileText}
          />
          <StatCard
            title="Flagged Documents"
            value={stats.flaggedDocuments}
            subtitle="Requiring attention"
            icon={AlertTriangle}
            trend={flaggedTrend}
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
            trend={documentsTrend}
=======
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Reports"
            value={stats.totalReports}
            subtitle="Documents analyzed"
            icon={FileText}
            color="purple"
          />
          <StatCard
            title="Average Similarity"
            value={`${stats.avgSimilarity}%`}
            subtitle="Across all documents"
            icon={BarChart3}
            color="blue"
          />
          <StatCard
            title="This Month"
            value={stats.reportsThisMonth}
            subtitle="Reports generated"
            icon={Calendar}
            color="green"
          />
          <StatCard
            title="Flagged Documents"
            value={stats.flaggedReports}
            subtitle="Requiring attention"
            icon={AlertTriangle}
            color="red"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            <QuickAction
              icon={Upload}
              title="Upload Document"
              description="Check a new document for plagiarism"
              variant="primary"
<<<<<<< HEAD
              action={() => router.push(`${pathname}/upload`)}
            />

            <QuickAction
              icon={BarChart3}
              title="Customize Settings"
              description="Customize settings to get a better user experience."
              action={() => router.push(`${pathname}/settings`)}
            />
            <QuickAction
              icon={RefreshCw}
              title="Previous Reports"
              description="Check and compare all reports."
              action={() => router.push(`${pathname}/report`)}
            />
            <QuickAction
              icon={RefreshCw}
              title="Leave Workspace"
              description="Check and compare all reports."
              action={handleLogout}
=======
              onClick={() => router.push("/dashboard/student/report/upload")}
            />
            <QuickAction
              icon={FileText}
              title="View All Reports"
              description="Browse your complete report history"
              onClick={() => router.push("/dashboard/student/report")}
            />
            <QuickAction
              icon={TrendingUp}
              title="Progress Tracking"
              description="See how your writing has improved"
              onClick={() => console.log("Progress tracking")}
            />
            <QuickAction
              icon={Clock}
              title="Recent Activity"
              description="Check your latest document analyses"
              onClick={() => console.log("Recent activity")}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`${roboto.className} text-3xl font-bold text-white`}>
              Recent Documents
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${dmSans.className} pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600  text-white focus:border-purple-500 focus:outline-none placeholder-gray-400`}
                />
              </div>
              <button
                className={`${dmSans.className} flex items-center px-4 py-2 bg-gray-700/50 border border-gray-600  text-white hover:border-purple-500 transition-colors`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="space-y-4">
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
        {/* Recent Reports */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Reports</h2>
            <button
              onClick={() => router.push("/dashboard/student/report")}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentReports.slice(0, 3).map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          {recentReports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">No reports yet</p>
              <RotatingBox className="inline-block">
                <button
                  onClick={() =>
                    router.push("/dashboard/student/report/upload")
                  }
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Upload Your First Document
                </button>
              </RotatingBox>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-purple-600/10 to-purple-700/10 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-3">
            💡 Tips for Better Results
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-purple-300 mb-1">
                Before Uploading:
              </h4>
              <p>
                Ensure your document is in PDF, DOC, or DOCX format for best
                results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-300 mb-1">
                Understanding Scores:
              </h4>
              <p>
                Similarity scores below 15% are generally considered acceptable
                for academic work.
              </p>
            </div>
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
          </div>
        </div>
      </div>
    </div>
  );
}

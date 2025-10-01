"use client";
import { useState, useEffect } from "react";
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
    </div>
  );

  const QuickAction = ({
    icon: Icon,
    title,
    description,
    onClick,
    variant = "default",
  }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
        variant === "primary"
          ? "bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-purple-500/50 hover:border-purple-400"
          : "bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50"
      } backdrop-blur-sm`}
    >
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
      </div>
    </div>
  );

  return (
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
          </p>
        </div>

        {/* Stats Cards */}
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
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickAction
              icon={Upload}
              title="Upload Document"
              description="Check a new document for plagiarism"
              variant="primary"
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
            />
          </div>
        </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}

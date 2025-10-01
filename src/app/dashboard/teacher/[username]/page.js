"use client";
import { useState } from "react";
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
// Mock Grid component

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

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
    </div>
  );

  const DocumentRow = ({ doc }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-md p-4 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-md bg-gray-700/50">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="text-white font-medium">{doc.fileName}</h4>
            <p className="text-gray-400 text-sm">
              by {doc.submittedBy} • {doc.uploadDate}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div
              className={`text-lg font-bold ${
                doc.plagiarismScore > 30
                  ? "text-red-400"
                  : doc.plagiarismScore > 15
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {doc.status === "processing" ? "-" : `${doc.plagiarismScore}%`}
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
            <button className="p-2 rounded-md bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-md bg-gray-600/20 hover:bg-gray-600/40 text-gray-400 transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-md bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors">
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
      className={`cursor-pointer p-6 rounded-md border transition-all duration-300 hover:scale-105 ${
        variant === "primary"
          ? "bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-purple-500/50 hover:border-purple-400"
          : "bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50"
      } backdrop-blur-sm`}
    >
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300">
      <Grid height={170} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 mt-24">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Monitor document submissions and plagiarism detection results
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 mb-12">
          <StatCard
            title="Total Documents"
            value={stats.totalDocuments}
            subtitle="All time submissions"
            icon={FileText}
            trend={12}
          />
          <StatCard
            title="Flagged Documents"
            value={stats.flaggedDocuments}
            subtitle="Requiring attention"
            icon={AlertTriangle}
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
            trend={5}
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            <QuickAction
              icon={Upload}
              title="Upload Document"
              description="Check a new document for plagiarism"
              variant="primary"
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
            />
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Documents</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:border-purple-500 focus:outline-none placeholder-gray-400"
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white hover:border-purple-500 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {recentReports.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

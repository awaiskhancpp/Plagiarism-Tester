"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Plus, X, Copy, CheckCircle2, Code, Zap, Shield } from "lucide-react";

export default function DeveloperDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [creatingKey, setCreatingKey] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "developer") {
      fetchDashboardData();
    }
  }, [status, session]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsRes = await fetch("/api/v1/developer/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      // Fetch API keys
      const keysRes = await fetch("/api/v1/developer/api-keys");
      if (keysRes.ok) {
        const keysData = await keysRes.json();
        setApiKeys(keysData.apiKeys);
      }

      // Fetch recent requests
      const requestsRes = await fetch("/api/v1/developer/requests?limit=10");
      if (requestsRes.ok) {
        const requestsData = await requestsRes.json();
        setRecentRequests(requestsData.requests);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApiKey = async () => {
    if (!newKeyName || newKeyName.trim().length === 0) {
      alert("Please enter a name for your API key");
      return;
    }

    try {
      setCreatingKey(true);
      
      const response = await fetch("/api/v1/developer/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiKeys([data.apiKey, ...apiKeys]);
        setShowKeyModal(false);
        setNewKeyName("");
        // Show success message with the new key
        setCopiedKey(data.apiKey.key);
        setTimeout(() => setCopiedKey(null), 5000);
      } else {
        alert(`Error: ${data.error}${data.details ? '\nDetails: ' + data.details : ''}`);
      }
    } catch (error) {
      console.error("Error creating API key:", error);
      alert(`Failed to create API key. Error: ${error.message}`);
    } finally {
      setCreatingKey(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const StatCard = ({ title, value, subtitle }) => (
    <div className="h-50 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div>
        <p className="text-gray-500 text-sm mb-2">{title}</p>
        <h3 className="text-4xl font-bold text-white">{value}</h3>
        {subtitle && <p className="text-gray-400 text-xs mt-2">{subtitle}</p>}
      </div>
    </div>
  );

  const RequestRow = ({ req }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                req.method === "POST"
                  ? "bg-green-600/30 text-green-300"
                  : req.method === "GET"
                  ? "bg-blue-600/30 text-blue-300"
                  : "bg-purple-600/30 text-purple-300"
              }`}
            >
              {req.method}
            </span>
            <h4 className="text-white font-semibold text-sm">{req.endpoint}</h4>
          </div>
          <p className="text-gray-400 text-xs">{req.timestamp}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1">Status</p>
            <p
              className={`text-sm font-bold ${
                req.status >= 200 && req.status < 300
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {req.status}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1">Time</p>
            <p className="text-sm font-bold text-white">{req.responseTime}ms</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ApiKeyCard = ({ apiKey }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold">{apiKey.name}</h3>
          <p className="text-gray-400 text-xs mt-1">
            Created: {apiKey.created}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
            apiKey.active
              ? "bg-green-600/30 text-green-300"
              : "bg-gray-600/30 text-gray-300"
          }`}
        >
          {apiKey.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="bg-gray-900/50 rounded p-2 border border-gray-700/50 mb-3 flex items-center justify-between">
        <p className="text-gray-300 font-mono text-xs truncate flex-1">{apiKey.key}</p>
        <button
          onClick={() => copyToClipboard(apiKey.key)}
          className="ml-2 p-1 hover:bg-gray-700/50 rounded transition-colors"
          title="Copy to clipboard"
        >
          {copiedKey === apiKey.key ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex justify-between text-xs">
        <div>
          <p className="text-gray-500 mb-1">Requests</p>
          <p className="text-white font-bold">{apiKey.requests}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 mb-1">Last Used</p>
          <p className="text-white font-bold">{apiKey.lastUsed}</p>
        </div>
      </div>
    </div>
  );

  if (loading || status === "loading") {
    return (
      <div className="bg-gradient-to-r from-black to-gray-900 text-gray-300 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading developer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 text-gray-300 min-h-screen">
      {/* API Key Creation Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Create New API Key</h3>
              <button
                onClick={() => {
                  setShowKeyModal(false);
                  setNewKeyName("");
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-white font-medium mb-2 block">
                API Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production Key, Test Key"
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:border-blue-500 focus:outline-none placeholder-gray-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !creatingKey) {
                    handleCreateApiKey();
                  }
                }}
              />
              <p className="text-gray-400 text-xs mt-2">
                Choose a descriptive name to identify this key
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowKeyModal(false);
                  setNewKeyName("");
                }}
                className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateApiKey}
                disabled={creatingKey || !newKeyName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {creatingKey ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Key"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 mt-24">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-transparent">
              Developer Console.
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Integrate SleuthInc's plagiarism detection API into your applications
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 border-b border-gray-700/50">
          {["overview", "api-keys", "requests", "documentation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold transition-all ${
                activeTab === tab
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* What Developers Get */}
            <div className="mb-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">RESTful API</h3>
                <p className="text-gray-400 text-sm">
                  Easy-to-use REST API with comprehensive documentation. Submit documents and receive detailed plagiarism reports programmatically.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
                <div className="bg-green-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Fast Processing</h3>
                <p className="text-gray-400 text-sm">
                  Powered by advanced AI algorithms. Get plagiarism results in seconds with high accuracy and detailed source matching.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
                <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Secure & Reliable</h3>
                <p className="text-gray-400 text-sm">
                  Enterprise-grade security with API key authentication. Your documents are processed securely and never stored permanently.
                </p>
              </div>
            </div>

            {stats && (
              <div className="grid md:grid-cols-2 text-center lg:grid-cols-3 gap-4 mb-12">
                <StatCard
                  title="Total Requests"
                  value={stats.totalRequests.toLocaleString()}
                  subtitle="All time API calls"
                />
                <StatCard
                  title="Success Rate"
                  value={`${stats.successRate}%`}
                  subtitle="Successful responses"
                />
                <StatCard
                  title="Avg Response Time"
                  value={`${stats.avgResponseTime}ms`}
                  subtitle="Average latency"
                />
                <StatCard
                  title="Active Integrations"
                  value={stats.activeIntegrations}
                  subtitle="Connected applications"
                />
                <StatCard
                  title="Requests Today"
                  value={stats.requestsToday}
                  subtitle="Current day"
                />
                <StatCard
                  title="Errors Today"
                  value={stats.errorsToday}
                  subtitle="Failed requests"
                />
              </div>
            )}
          </>
        )}

        {/* API Keys Tab */}
        {activeTab === "api-keys" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">API Keys</h2>
                <p className="text-gray-400 text-sm mt-1">You can only have one active API key</p>
              </div>
              <button
                onClick={() => setShowKeyModal(true)}
                disabled={apiKeys.length >= 1}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                New Key
              </button>
            </div>
            {apiKeys.length === 0 ? (
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-12 border border-gray-700/30 text-center">
                <p className="text-gray-400 mb-4">
                  You don't have any API keys yet.
                </p>
                <button
                  onClick={() => setShowKeyModal(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Create Your First API Key
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <ApiKeyCard key={key.id} apiKey={key} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Recent Requests</h2>
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition-colors"
              >
                Refresh
              </button>
            </div>
            {recentRequests.length === 0 ? (
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-12 border border-gray-700/30 text-center">
                <p className="text-gray-400">
                  No API requests yet. Start using your API keys to see requests here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentRequests.map((req) => (
                  <RequestRow key={req.id} req={req} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === "documentation" && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">
              API Documentation
            </h2>

            {/* Quick Start */}
            <div className="space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  Getting Started
                </h3>
                <p className="text-gray-300 mb-4">
                  Start by generating an API key above, then use it in your requests. All API requests must include your API key in the Authorization header.
                </p>
                <div className="bg-gray-900/50 rounded p-4 mb-4 border border-gray-700/50 overflow-x-auto">
                  <code className="text-blue-300 font-mono text-sm">
                    curl -X POST https://api.sleuthinc.com/v1/check-plagiarism \<br />
                    &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                    &nbsp;&nbsp;-F "file=@document.pdf"
                  </code>
                </div>
              </div>

              {/* Base URL */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4">Base URL</h3>
                <div className="bg-gray-900/50 rounded p-4 border border-gray-700/50">
                  <code className="text-blue-300 font-mono">https://api.sleuthinc.com/v1</code>
                </div>
              </div>

              {/* Authentication */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4">Authentication</h3>
                <p className="text-gray-300 mb-4">
                  All API requests require authentication using your API key in the Authorization header:
                </p>
                <div className="bg-gray-900/50 rounded p-4 border border-gray-700/50">
                  <code className="text-blue-300 font-mono text-sm">
                    Authorization: Bearer sk_live_your_api_key_here
                  </code>
                </div>
              </div>

              {/* Endpoints */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-6">API Endpoints</h3>
                
                {/* Check Plagiarism */}
                <div className="mb-6 pb-6 border-b border-gray-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-600/30 text-green-300 rounded text-xs font-bold">POST</span>
                    <code className="text-blue-400 font-mono">/api/v1/developer/check-plagiarism</code>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Check a single document for plagiarism
                  </p>
                  <div className="bg-gray-900/50 rounded p-4 border border-gray-700/50 mb-3">
                    <p className="text-gray-400 text-xs mb-2">Request Body:</p>
                    <code className="text-blue-300 font-mono text-sm">
                      file: [Binary file data] (PDF, DOC, DOCX)
                    </code>
                  </div>
                  <div className="bg-gray-900/50 rounded p-4 border border-gray-700/50">
                    <p className="text-gray-400 text-xs mb-2">Response:</p>
                    <pre className="text-green-300 font-mono text-xs overflow-x-auto">
{`{
  "request_id": "req_abc123",
  "status": "processing",
  "message": "Document uploaded successfully"
}`}
                    </pre>
                  </div>
                </div>

                {/* Get Status */}
                <div className="mb-6 pb-6 border-b border-gray-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded text-xs font-bold">GET</span>
                    <code className="text-blue-400 font-mono">/api/v1/developer/status/:requestId</code>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Get the status of a plagiarism check request
                  </p>
                  <div className="bg-gray-900/50 rounded p-4 border border-gray-700/50">
                    <p className="text-gray-400 text-xs mb-2">Response:</p>
                    <pre className="text-green-300 font-mono text-xs overflow-x-auto">
{`{
  "request_id": "req_abc123",
  "status": "completed",
  "similarity_score": 23.5,
  "sources": [
    {
      "url": "https://example.com/article",
      "similarity": 15.2,
      "title": "Example Article"
    }
  ],
  "word_count": 1250
}`}
                    </pre>
                  </div>
                </div>

                {/* Batch Check */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-600/30 text-green-300 rounded text-xs font-bold">POST</span>
                    <code className="text-blue-400 font-mono">/api/v1/developer/batch-check</code>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Check multiple documents in one request
                  </p>
                  <div className="bg-gray-900/50 rounded p-4 border border-gray-700/50 mb-3">
                    <p className="text-gray-400 text-xs mb-2">Request Body:</p>
                    <code className="text-blue-300 font-mono text-sm">
                      files: [Array of binary file data]
                    </code>
                  </div>
                  <div className="bg-gray-900/50 rounded p-4 border border-gray-700/50">
                    <p className="text-gray-400 text-xs mb-2">Response:</p>
                    <pre className="text-green-300 font-mono text-xs overflow-x-auto">
{`{
  "batch_id": "batch_xyz789",
  "request_ids": ["req_abc123", "req_def456"],
  "status": "processing"
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Rate Limits */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4">Rate Limits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>100 requests per hour per API key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Maximum file size: 10MB per document</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Supported formats: PDF, DOC, DOCX, TXT</span>
                  </li>
                </ul>
              </div>

              {/* Error Codes */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4">Error Codes</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <code className="text-red-400 font-mono">400</code>
                    <span className="text-gray-300">Bad Request - Invalid parameters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="text-red-400 font-mono">401</code>
                    <span className="text-gray-300">Unauthorized - Invalid API key</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="text-red-400 font-mono">429</code>
                    <span className="text-gray-300">Too Many Requests - Rate limit exceeded</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="text-red-400 font-mono">500</code>
                    <span className="text-gray-300">Internal Server Error</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
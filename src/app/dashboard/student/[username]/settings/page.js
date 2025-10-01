"use client";
import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  FileText,
  Clock,
  Cog,
} from "lucide-react";

// Mock Grid component
const Grid = ({ height }) => (
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage: `
        linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  />
);

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    // Profile settings
    name: "Alex Johnson",
    email: "alex.johnson@student.university.edu",
    studentId: "ST2024001",
    major: "Computer Science",
    year: "Junior",
    bio: "Computer Science student passionate about learning and academic integrity.",

    // Notifications
    emailNotifications: true,
    reportReady: true,
    weeklyDigest: false,
    reminderNotifications: true,

    // Privacy & Security
    twoFactorAuth: false,
    profileVisibility: "private",
    dataRetention: "2years",

    // Document Preferences
    autoSave: true,
    defaultFormat: "pdf",
    retainReports: true,

    // Appearance
    theme: "dark",
    language: "en",
    timezone: "UTC-8",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "documents", label: "Document Settings", icon: FileText },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const SettingCard = ({ children, title, description }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-gray-400 text-sm mb-4">{description}</p>
      )}
      {children}
    </div>
  );

  const Toggle = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-white font-medium">{label}</p>
        {description && <p className="text-gray-400 text-sm">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          checked ? "bg-purple-600" : "bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  const Select = ({ value, onChange, options, label }) => (
    <div className="mb-4">
      <label className="text-white font-medium mb-2 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const Input = ({
    value,
    onChange,
    label,
    type = "text",
    placeholder,
    disabled = false,
  }) => (
    <div className="mb-4">
      <label className="text-white font-medium mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none placeholder-gray-400 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Personal Information"
              description="Update your profile details"
            >
              <Input
                label="Full Name"
                value={settings.name}
                onChange={(val) => handleSettingChange("name", val)}
              />
              <Input
                label="Email"
                type="email"
                value={settings.email}
                onChange={(val) => handleSettingChange("email", val)}
              />
              <Input
                label="Student ID"
                value={settings.studentId}
                disabled={true}
              />
              <Input
                label="Major"
                value={settings.major}
                onChange={(val) => handleSettingChange("major", val)}
              />
              <Select
                label="Academic Year"
                value={settings.year}
                onChange={(val) => handleSettingChange("year", val)}
                options={[
                  { value: "freshman", label: "Freshman" },
                  { value: "sophomore", label: "Sophomore" },
                  { value: "junior", label: "Junior" },
                  { value: "senior", label: "Senior" },
                  { value: "graduate", label: "Graduate Student" },
                ]}
              />
              <div className="mb-4">
                <label className="text-white font-medium mb-2 block">Bio</label>
                <textarea
                  value={settings.bio}
                  onChange={(e) => handleSettingChange("bio", e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none placeholder-gray-400"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </SettingCard>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Email Notifications"
              description="Choose what notifications you want to receive"
            >
              <Toggle
                checked={settings.emailNotifications}
                onChange={(val) =>
                  handleSettingChange("emailNotifications", val)
                }
                label="Email Notifications"
                description="Receive notifications via email"
              />
              <Toggle
                checked={settings.reportReady}
                onChange={(val) => handleSettingChange("reportReady", val)}
                label="Report Ready Alerts"
                description="Get notified when your plagiarism reports are ready"
              />
              <Toggle
                checked={settings.weeklyDigest}
                onChange={(val) => handleSettingChange("weeklyDigest", val)}
                label="Weekly Digest"
                description="Receive weekly summary of your activity"
              />
              <Toggle
                checked={settings.reminderNotifications}
                onChange={(val) =>
                  handleSettingChange("reminderNotifications", val)
                }
                label="Assignment Reminders"
                description="Get reminders about upcoming deadlines"
              />
            </SettingCard>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Account Security"
              description="Manage your account security settings"
            >
              <Toggle
                checked={settings.twoFactorAuth}
                onChange={(val) => handleSettingChange("twoFactorAuth", val)}
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              />
              <Select
                label="Profile Visibility"
                value={settings.profileVisibility}
                onChange={(val) =>
                  handleSettingChange("profileVisibility", val)
                }
                options={[
                  { value: "public", label: "Public" },
                  { value: "university", label: "University Only" },
                  { value: "private", label: "Private" },
                ]}
              />
              <Select
                label="Data Retention"
                value={settings.dataRetention}
                onChange={(val) => handleSettingChange("dataRetention", val)}
                options={[
                  { value: "1year", label: "1 Year" },
                  { value: "2years", label: "2 Years" },
                  { value: "4years", label: "4 Years (Until Graduation)" },
                  { value: "indefinite", label: "Keep Indefinitely" },
                ]}
              />
            </SettingCard>

            <SettingCard
              title="Change Password"
              description="Update your account password"
            >
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
              />
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Update Password
              </button>
            </SettingCard>
          </div>
        );

      case "documents":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Document Preferences"
              description="Configure how your documents are handled"
            >
              <Toggle
                checked={settings.autoSave}
                onChange={(val) => handleSettingChange("autoSave", val)}
                label="Auto-save Reports"
                description="Automatically save plagiarism reports to your account"
              />
              <Select
                label="Preferred Export Format"
                value={settings.defaultFormat}
                onChange={(val) => handleSettingChange("defaultFormat", val)}
                options={[
                  { value: "pdf", label: "PDF Document" },
                  { value: "docx", label: "Word Document" },
                  { value: "txt", label: "Plain Text" },
                ]}
              />
              <Toggle
                checked={settings.retainReports}
                onChange={(val) => handleSettingChange("retainReports", val)}
                label="Retain Report History"
                description="Keep your plagiarism reports for future reference"
              />
            </SettingCard>

            <SettingCard
              title="Upload Settings"
              description="Configure document upload preferences"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Maximum File Size
                  </label>
                  <p className="text-gray-400 text-sm">
                    Currently set to 10MB per document
                  </p>
                </div>
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Supported Formats
                  </label>
                  <p className="text-gray-400 text-sm">
                    PDF, DOC, DOCX files are supported
                  </p>
                </div>
              </div>
            </SettingCard>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Display Preferences"
              description="Customize your interface"
            >
              <Select
                label="Theme"
                value={settings.theme}
                onChange={(val) => handleSettingChange("theme", val)}
                options={[
                  { value: "dark", label: "Dark Theme" },
                  { value: "light", label: "Light Theme" },
                  { value: "auto", label: "Auto (System)" },
                ]}
              />
              <Select
                label="Language"
                value={settings.language}
                onChange={(val) => handleSettingChange("language", val)}
                options={[
                  { value: "en", label: "English" },
                  { value: "es", label: "Spanish" },
                  { value: "fr", label: "French" },
                  { value: "de", label: "German" },
                ]}
              />
              <Select
                label="Timezone"
                value={settings.timezone}
                onChange={(val) => handleSettingChange("timezone", val)}
                options={[
                  { value: "UTC-8", label: "Pacific Time (UTC-8)" },
                  { value: "UTC-5", label: "Eastern Time (UTC-5)" },
                  { value: "UTC+0", label: "GMT (UTC+0)" },
                  { value: "UTC+1", label: "Central European (UTC+1)" },
                ]}
              />
            </SettingCard>

            <SettingCard
              title="Report Display"
              description="Customize how reports are displayed"
            >
              <Toggle
                checked={true}
                onChange={() => {}}
                label="Show Similarity Colors"
                description="Use color coding for similarity percentages"
              />
              <Toggle
                checked={true}
                onChange={() => {}}
                label="Detailed Analysis View"
                description="Show detailed breakdown in reports by default"
              />
            </SettingCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
      <Grid height={151} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Customize your account and plagiarism checking preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 sticky top-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Cog className="w-5 h-5 mr-2" />
                Settings
              </h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                        activeTab === tab.id
                          ? "bg-purple-600/20 border border-purple-500/50 text-purple-300"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

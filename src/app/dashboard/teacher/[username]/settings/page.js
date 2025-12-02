"use client";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { User, Bell, Shield, Palette, Database, Cog } from "lucide-react";
import Grid from "@/components/Grid";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// ---------------------------
// UI COMPONENTS (Outside main component to fix focus issue)
// ---------------------------
const Input = ({
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  disabled = false,
  onClicked,
}) => (
  <div className="mb-4">
    <label className="text-white font-medium mb-2 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full p-3 bg-gray-700/50 border border-gray-600  text-white focus:outline-none placeholder-gray-400 ${
        disabled ? "opacity-50 cursor-not-allowed" : "focus:border-purple-500"
      }`}
      onClick={onClicked}
    />
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
      className="w-full p-3 bg-gray-700/50 border border-gray-600  text-white focus:border-purple-500 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const SettingCard = ({ children, title, description }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm  p-6 border border-gray-700/50">
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    {description && <p className="text-gray-400 text-sm mb-4">{description}</p>}
    {children}
  </div>
);

// ---------------------------
// MAIN PAGE COMPONENT
// ---------------------------
export default function TeacherSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { data: session, status, update } = useSession();

  const [settings, setSettings] = useState({
    name: "",
    email: "",
    department: "",
    title: "",
    bio: "",
    plagiarismAlerts: false,
    weeklyReports: false,
    profileVisibility: "",
    dataSharing: false,
    strictnessLevel: "",
    autoFlag: false,
    reportFormat: "",
    theme: "",
    language: "",
    timezone: "",
  });

  // ---------------------------
  // 🔥 Load Settings on Page Load
  // ---------------------------
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/teacher/crud-settings");
        if (!res.ok) return;

        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error("Error fetching settings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ---------------------------
  // ❤️ Updating State
  // ---------------------------
  const handleSettingChange = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  // ---------------------------
  // 💾 Save Changes with Immediate Session Update
  // ---------------------------
  const saveSettings = async () => {
    try {
      setSaving(true);

      const res = await fetch("/api/v1/teacher/crud-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        return;
      }

      // Force session update and wait for it to complete
      await update();

      // Optional: Add a small delay to ensure session propagation
      await new Promise((resolve) => setTimeout(resolve, 100));
      toast.info("Settings Saved.");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------
  // Tabs
  // ---------------------------
=======
import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Users,
  BookOpen,
  Cog,
} from "lucide-react";
import Grid from "@/components/Grid";

export default function TeacherSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    // Profile settings
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    department: "Computer Science",
    title: "Associate Professor",
    bio: "Passionate educator with 10+ years of experience in computer science and academic integrity.",

    // Notifications
    emailNotifications: true,
    plagiarismAlerts: true,
    weeklyReports: false,
    studentSubmissions: true,

    // Privacy & Security
    twoFactorAuth: false,
    profileVisibility: "department",
    dataSharing: false,

    // Plagiarism Detection
    strictnessLevel: "medium",
    autoFlag: true,
    reportFormat: "detailed",

    // Class Management
    maxClassSize: 50,
    autoGrading: false,
    lateSubmissionPenalty: 10,

    // Appearance
    theme: "dark",
    language: "en",
    timezone: "UTC-8",
  });

>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "detection", label: "Detection Settings", icon: Database },
<<<<<<< HEAD
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

=======
    { id: "classes", label: "Class Management", icon: Users },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const SettingCard = ({ children, title, description }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-md p-6 border border-gray-700/50">
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
        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:border-purple-500 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const Input = ({ value, onChange, label, type = "text", placeholder }) => (
    <div className="mb-4">
      <label className="text-white font-medium mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:border-purple-500 focus:outline-none placeholder-gray-400"
      />
    </div>
  );

>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
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
<<<<<<< HEAD
                disabled={true}
                onClicked={() => toast.error("Email cannot be changed")}
=======
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              />
              <Input
                label="Department"
                value={settings.department}
                onChange={(val) => handleSettingChange("department", val)}
              />
              <Input
                label="Title"
                value={settings.title}
                onChange={(val) => handleSettingChange("title", val)}
              />
<<<<<<< HEAD
              <Input
                label="Bio"
                value={settings.bio}
                onChange={(val) => {
                  if (val.length <= 70) handleSettingChange("bio", val);
                }}
                placeholder="Max 70 characters"
                type="text"
              />
              <div className="flex justify-between text-gray-400 text-sm -mt-3 mb-3">
                <span></span>
                <span>{settings.bio.length}/70</span>
=======
              <div className="mb-4">
                <label className="text-white font-medium mb-2 block">Bio</label>
                <textarea
                  value={settings.bio}
                  onChange={(e) => handleSettingChange("bio", e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:border-purple-500 focus:outline-none placeholder-gray-400"
                  placeholder="Tell students about yourself..."
                />
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              </div>
            </SettingCard>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <SettingCard
<<<<<<< HEAD
              title="Notifications"
              description="Choose what notifications you want to receive"
            >
              <Toggle
                checked={settings.plagiarismAlerts}
                onChange={(val) => handleSettingChange("plagiarismAlerts", val)}
                label="Plagiarism Alerts"
                description="Get notified on flagged similarity"
=======
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
                checked={settings.plagiarismAlerts}
                onChange={(val) => handleSettingChange("plagiarismAlerts", val)}
                label="Plagiarism Alerts"
                description="Get notified when potential plagiarism is detected"
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              />
              <Toggle
                checked={settings.weeklyReports}
                onChange={(val) => handleSettingChange("weeklyReports", val)}
                label="Weekly Reports"
<<<<<<< HEAD
                description="Receive weekly summary"
=======
                description="Receive weekly summary reports"
              />
              <Toggle
                checked={settings.studentSubmissions}
                onChange={(val) =>
                  handleSettingChange("studentSubmissions", val)
                }
                label="Student Submissions"
                description="Get notified of new student submissions"
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              />
            </SettingCard>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Account Security"
<<<<<<< HEAD
              description="Manage your security settings"
            >
=======
              description="Manage your account security settings"
            >
              <Toggle
                checked={settings.twoFactorAuth}
                onChange={(val) => handleSettingChange("twoFactorAuth", val)}
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              />
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              <Select
                label="Profile Visibility"
                value={settings.profileVisibility}
                onChange={(val) =>
                  handleSettingChange("profileVisibility", val)
                }
                options={[
                  { value: "public", label: "Public" },
<<<<<<< HEAD
=======
                  { value: "department", label: "Department Only" },
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
                  { value: "private", label: "Private" },
                ]}
              />
              <Toggle
                checked={settings.dataSharing}
                onChange={(val) => handleSettingChange("dataSharing", val)}
                label="Data Sharing"
<<<<<<< HEAD
                description="Allow anonymized research usage"
=======
                description="Allow anonymized data to be used for research"
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              />
            </SettingCard>
          </div>
        );

      case "detection":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Plagiarism Detection"
<<<<<<< HEAD
              description="Control detection intensity"
            >
              <Select
                label="Strictness"
                value={settings.strictnessLevel}
                onChange={(val) => handleSettingChange("strictnessLevel", val)}
                options={[{ value: "high", label: "High" }]}
=======
              description="Configure how plagiarism detection works for your classes"
            >
              <Select
                label="Detection Strictness"
                value={settings.strictnessLevel}
                onChange={(val) => handleSettingChange("strictnessLevel", val)}
                options={[
                  { value: "low", label: "Low - Basic detection" },
                  { value: "medium", label: "Medium - Balanced approach" },
                  { value: "high", label: "High - Strict detection" },
                ]}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              />
              <Toggle
                checked={settings.autoFlag}
                onChange={(val) => handleSettingChange("autoFlag", val)}
<<<<<<< HEAD
                label="Auto Flag"
                description="Automatically flag high similarity"
=======
                label="Auto-flag Suspicious Content"
                description="Automatically flag submissions with high similarity scores"
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              />
              <Select
                label="Report Format"
                value={settings.reportFormat}
                onChange={(val) => handleSettingChange("reportFormat", val)}
<<<<<<< HEAD
                options={[{ value: "detailed", label: "Detailed" }]}
=======
                options={[
                  { value: "summary", label: "Summary Only" },
                  { value: "detailed", label: "Detailed Report" },
                  { value: "comprehensive", label: "Comprehensive Analysis" },
                ]}
              />
            </SettingCard>
          </div>
        );

      case "classes":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Class Management"
              description="Set defaults for your classes"
            >
              <Input
                label="Maximum Class Size"
                type="number"
                value={settings.maxClassSize}
                onChange={(val) =>
                  handleSettingChange("maxClassSize", parseInt(val))
                }
              />
              <Toggle
                checked={settings.autoGrading}
                onChange={(val) => handleSettingChange("autoGrading", val)}
                label="Enable Auto-grading"
                description="Automatically grade submissions based on plagiarism scores"
              />
              <Input
                label="Late Submission Penalty (%)"
                type="number"
                value={settings.lateSubmissionPenalty}
                onChange={(val) =>
                  handleSettingChange("lateSubmissionPenalty", parseInt(val))
                }
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              />
            </SettingCard>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <SettingCard
<<<<<<< HEAD
              title="Appearance"
=======
              title="Display Preferences"
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              description="Customize your interface"
            >
              <Select
                label="Theme"
                value={settings.theme}
                onChange={(val) => handleSettingChange("theme", val)}
<<<<<<< HEAD
                options={[{ value: "dark", label: "Dark" }]}
=======
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
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              />
            </SettingCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300">
      <Grid height={110} />
<<<<<<< HEAD
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="mt-24 mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
=======

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mt-24 mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            {" "}
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
            <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-xl text-gray-400">
<<<<<<< HEAD
            Customize your teaching experience
=======
            Customize your teaching experience and manage your preferences
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
<<<<<<< HEAD
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm  p-6 border border-gray-700/50 sticky top-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Cog className="w-5 h-5 mr-2" /> Settings
=======
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-md p-6 border border-gray-700/50 sticky top-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Cog className="w-5 h-5 mr-2" />
                Settings
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              </h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
<<<<<<< HEAD
                      className={`w-full flex items-center px-4 py-3  transition-all duration-200 text-left ${
=======
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-all duration-200 text-left ${
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
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

<<<<<<< HEAD
          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">
            {loading ? (
              <p className="text-gray-400">Loading settings...</p>
            ) : (
              renderTabContent()
            )}

            {/* SAVE BUTTON */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={saveSettings}
                disabled={saving}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold  transition-all duration-300 transform hover:scale-105 disabled:opacity-30"
              >
                {saving ? "Saving..." : "Save Changes"}
=======
          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105">
                Save Changes
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
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
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "detection", label: "Detection Settings", icon: Database },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

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
                disabled={true}
                onClicked={() => toast.error("Email cannot be changed")}
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
              </div>
            </SettingCard>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Notifications"
              description="Choose what notifications you want to receive"
            >
              <Toggle
                checked={settings.plagiarismAlerts}
                onChange={(val) => handleSettingChange("plagiarismAlerts", val)}
                label="Plagiarism Alerts"
                description="Get notified on flagged similarity"
              />
              <Toggle
                checked={settings.weeklyReports}
                onChange={(val) => handleSettingChange("weeklyReports", val)}
                label="Weekly Reports"
                description="Receive weekly summary"
              />
            </SettingCard>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Account Security"
              description="Manage your security settings"
            >
              <Select
                label="Profile Visibility"
                value={settings.profileVisibility}
                onChange={(val) =>
                  handleSettingChange("profileVisibility", val)
                }
                options={[
                  { value: "public", label: "Public" },
                  { value: "private", label: "Private" },
                ]}
              />
              <Toggle
                checked={settings.dataSharing}
                onChange={(val) => handleSettingChange("dataSharing", val)}
                label="Data Sharing"
                description="Allow anonymized research usage"
              />
            </SettingCard>
          </div>
        );

      case "detection":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Plagiarism Detection"
              description="Control detection intensity"
            >
              <Select
                label="Strictness"
                value={settings.strictnessLevel}
                onChange={(val) => handleSettingChange("strictnessLevel", val)}
                options={[{ value: "high", label: "High" }]}
              />
              <Toggle
                checked={settings.autoFlag}
                onChange={(val) => handleSettingChange("autoFlag", val)}
                label="Auto Flag"
                description="Automatically flag high similarity"
              />
              <Select
                label="Report Format"
                value={settings.reportFormat}
                onChange={(val) => handleSettingChange("reportFormat", val)}
                options={[{ value: "detailed", label: "Detailed" }]}
              />
            </SettingCard>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <SettingCard
              title="Appearance"
              description="Customize your interface"
            >
              <Select
                label="Theme"
                value={settings.theme}
                onChange={(val) => handleSettingChange("theme", val)}
                options={[{ value: "dark", label: "Dark" }]}
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="mt-24 mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Customize your teaching experience
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm  p-6 border border-gray-700/50 sticky top-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Cog className="w-5 h-5 mr-2" /> Settings
              </h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3  transition-all duration-200 text-left ${
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

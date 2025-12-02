import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },

  // Profile settings
  name: String,
  email: String,
  department: { type: String, default: "Undeclared Department" },
  title: { type: String, default: "Aspiring Professional" },
  bio: {
    type: String,
    default: "This user hasn't added a bio yet, but they are awesome!",
  },

  // Notifications
  plagiarismAlerts: { type: Boolean, default: true },
  weeklyReports: { type: Boolean, default: false },

  // Security
  profileVisibility: { type: String, default: "public" },
  dataSharing: { type: Boolean, default: true },

  // Detection
  strictnessLevel: { type: String, default: "high" },
  autoFlag: { type: Boolean, default: true },
  reportFormat: { type: String, default: "detailed" },

  // Appearance
  theme: { type: String, default: "dark" },
  language: { type: String, default: "en" },
  timezone: { type: String, default: "UTC" },

  updatedAt: { type: Date, default: Date.now },
});

const Setting =
  mongoose.models.setting || mongoose.model("setting", settingsSchema);

export default Setting;

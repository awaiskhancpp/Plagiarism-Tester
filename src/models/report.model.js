import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  matched_text: { type: String, required: true },
  similarity: { type: Number, required: true },
  source_url: { type: String },
  source_title: { type: String },
  source_type: { type: String },
});

const DocumentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  similarity: { type: Number, required: true },
  aiSimilarity: { type: Number, default: 0 },
  flagged: { type: Boolean, default: false },
  wordCount: { type: Number, required: true },
  matchCount: { type: Number, required: true },
  matches: { type: [MatchSchema], default: [] },
});

const SummarySchema = new mongoose.Schema({
  totalDocuments: { type: Number, required: true },
  flaggedDocuments: { type: Number, required: true },
  highestSimilarity: { type: Number, required: true },
  averageSimilarity: { type: Number, required: true },
  totalMatches: { type: Number, required: true },
  averageAiSimilarity: { type: Number, default: 0 },
});

const ReportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    analysisType: { type: String, required: true },
    submittedBy: { type: String, default: "System" },
    uploadDate: { type: String, required: true }, // stored as YYYY-MM-DD
    similarity: { type: Number, required: true },
    aiSimilarity: { type: Number, default: 0 },
    status: { type: String, default: "completed" },
    flagged: { type: Boolean, default: false },
    fileCount: { type: Number, required: true },
    processingTime: { type: String, required: true },
    avgSimilarity: { type: Number, required: true },
    sources: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },

    // Full analysis details
    documents: { type: [DocumentSchema], default: [] },
    summary: { type: SummarySchema, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);

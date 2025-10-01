// src/models/report.model.js

import mongoose from "mongoose";

const PlagiarismDataSchema = new mongoose.Schema({
  similarity: { type: Number },
  source_type: { type: String },
  source_title: { type: String },
  source_url: { type: String },
});

const ReportSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    similarity: {
      type: Number,
      required: true,
    },
    sources: [
      {
        type: String,
      },
    ],
    word_count: {
      type: Number,
      required: true,
    },
    time_spent: {
      type: String,
      default: "",
    },
    flagged: {
      type: Boolean,
      default: false,
    },
    plagiarism_data: {
      type: [PlagiarismDataSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);

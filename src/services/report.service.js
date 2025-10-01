// src/services/report.service.js

import Report from "@/models/report.model";

export async function fetchUserReports(userId) {
  const rawReports = await Report.find({ user_id: userId })
    .select(
      "name date similarity word_count time_spent flagged plagiarism_data.source_url"
    )
    .sort({ date: -1 })
    .lean()
    .exec();

  return rawReports.map((r) => {
    const urls = Array.isArray(r.plagiarism_data)
      ? r.plagiarism_data.map((e) => e.source_url)
      : [];
    const uniqueUrls = [...new Set(urls.filter((u) => typeof u === "string"))];
    return {
      id: r._id.toString(),
      name: r.name,
      date: r.date,
      similarity: r.similarity,
      word_count: r.word_count,
      time_spent: r.time_spent,
      flagged: r.flagged,
      sources: uniqueUrls,
    };
  });
}

export async function deleteReportById(userId, reportId) {
  // only delete if it belongs to the current user
  const result = await Report.findOneAndDelete({
    _id: reportId,
    user_id: userId,
  }).exec();
  return result; // null if nothing deleted
}

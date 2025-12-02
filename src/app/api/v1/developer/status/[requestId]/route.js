import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import "@/lib/mongodb";

import ApiKey from "@/models/apikey.model";
import ApiRequest from "@/models/apirequest.model";
import Report from "@/models/report.model";

async function validateJwtToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.FASTAPI_SECRET, {
      algorithms: ["HS256"]
    });
    
    const apiKey = await ApiKey.findOne({ key: token, active: true });
    
    if (!apiKey) {
      return null;
    }
    
    return { apiKey, decoded };
  } catch (error) {
    return null;
  }
}

async function logRequest(apiKey, method, endpoint, status, responseTime, size = "0 B") {
  try {
    await ApiRequest.create({
      user_id: apiKey.user_id,
      api_key_id: apiKey._id,
      method,
      endpoint,
      status,
      responseTime,
      size,
    });
  } catch (error) {
    console.error("Error logging request:", error);
  }
}

export async function GET(req, { params }) {
  const startTime = Date.now();
  
  try {
    const validation = await validateJwtToken(req.headers.get("authorization"));
    
    if (!validation) {
      return NextResponse.json(
        { error: "Invalid or expired API key" },
        { status: 401 }
      );
    }

    const { apiKey } = validation;
    const { requestId } = params;

    const report = await Report.findById(requestId);

    if (!report) {
      await logRequest(apiKey, "GET", `/api/v1/developer/status/${requestId}`, 404, Date.now() - startTime);
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    if (report.user_id !== apiKey.user_id) {
      await logRequest(apiKey, "GET", `/api/v1/developer/status/${requestId}`, 403, Date.now() - startTime);
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    await ApiKey.findByIdAndUpdate(apiKey._id, {
      $inc: { requests: 1 },
      lastUsed: new Date(),
    });

    await logRequest(
      apiKey,
      "GET",
      `/api/v1/developer/status/${requestId}`,
      200,
      Date.now() - startTime,
      "512 B"
    );

    const sources = (report.plagiarism_data || []).map((item) => ({
      url: item.source_url || "#",
      similarity: item.similarity || 0,
      title: item.source_title || "Unknown Source",
    }));

    return NextResponse.json(
      {
        request_id: report._id.toString(),
        status: "completed",
        similarity_score: report.similarity,
        sources: sources.slice(0, 5),
        word_count: report.word_count,
        flagged: report.flagged,
        processed_at: report.date,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching status:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
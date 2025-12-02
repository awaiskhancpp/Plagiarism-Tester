import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import "@/lib/mongodb";

import ApiKey from "@/models/apikey.model";
import ApiRequest from "@/models/apirequest.model";

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

export async function POST(req) {
  const startTime = Date.now();

  try {
    // 1) Validate API Key from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Invalid or expired API key" },
        { status: 401 }
      );
    }

    const apiKeyString = authHeader.substring(7);

    // Find API key in database
    const apiKey = await ApiKey.findOne({ key: apiKeyString, active: true });

    if (!apiKey) {
      return NextResponse.json(
        { error: "Invalid or expired API key" },
        { status: 401 }
      );
    }

    // 2) Sign a new HS256 token for FastAPI
    let signed;
    try {
      signed = jwt.sign(
        { sub: apiKey.user_id, key_id: apiKey._id },
        process.env.FASTAPI_SECRET,
        { algorithm: "HS256" }
      );
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to sign token", detail: err.message },
        { status: 500 }
      );
    }

    // 3) Read the incoming multipart form data
    const form = await req.formData();

    // Validate files
    const files = form.getAll("files");
    if (!files || files.length === 0) {
      await logRequest(
        apiKey,
        "POST",
        "/api/v1/developer/internal-analysis",
        400,
        Date.now() - startTime
      );
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    if (files.length > 10) {
      await logRequest(
        apiKey,
        "POST",
        "/api/v1/developer/internal-analysis",
        400,
        Date.now() - startTime
      );
      return NextResponse.json(
        { error: "Maximum 10 files allowed per batch" },
        { status: 400 }
      );
    }

    // 4) Forward to FastAPI
    const upstreamUrl = `${
      process.env.FASTAPI_URL || "http://localhost:8000"
    }/teacher/internal-analysis`;

    let upstream;
    try {
      upstream = await fetch(upstreamUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${signed}`,
        },
        body: form,
      });
    } catch (err) {
      await logRequest(
        apiKey,
        "POST",
        "/api/v1/developer/internal-analysis",
        502,
        Date.now() - startTime
      );
      return NextResponse.json(
        { error: "Bad gateway", detail: err.message },
        { status: 502 }
      );
    }

    // 5) Relay FastAPI response
    const ct = upstream.headers.get("content-type") || "";
    let data;
    try {
      data = ct.includes("application/json")
        ? await upstream.json()
        : await upstream.text();
    } catch {
      data = await upstream.text();
    }

    // Update API key usage
    await ApiKey.findByIdAndUpdate(apiKey._id, {
      $inc: { requests: files.length },
      lastUsed: new Date(),
    });

    // Log request
    await logRequest(
      apiKey,
      "POST",
      "/api/v1/developer/internal-analysis",
      upstream.status,
      Date.now() - startTime
    );

    return new Response(
      typeof data === "string" ? data : JSON.stringify(data),
      {
        status: upstream.status,
        headers: {
          "content-type": ct.includes("json") ? "application/json" : "text/plain",
        },
      }
    );
  } catch (error) {
    console.error("Error in internal-analysis:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
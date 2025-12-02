// src/app/api/report/get-reports/route.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import "@/lib/mongodb"; // your mongoose connector
import { fetchUserReports } from "@/services/report.service";

export async function GET(req) {
  // 1) Auth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2) fetch and return
    const reports = await fetchUserReports(token.sub);
    return NextResponse.json({
      message: "Reports fetched successfully",
      reports,
    });
  } catch (err) {
    console.error("[get-reports]", err);
    return NextResponse.json(
      { message: "Failed to fetch reports", error: err.message },
      { status: 500 }
    );
  }
}

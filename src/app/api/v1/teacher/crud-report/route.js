import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";
import Report from "@/models/report.model";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/sluethink";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

// GET: Fetch reports
export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const reports = await Report.find({ userId: token.sub })
      .sort({ createdAt: -1 })
      .lean();
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

// DELETE: Delete a report
export async function DELETE(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const reportId = searchParams.get("id");

    if (!reportId)
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );

    const report = await Report.findOne({ _id: reportId, userId: token.sub });
    if (!report)
      return NextResponse.json(
        { error: "Report not found or unauthorized" },
        { status: 404 }
      );

    await Report.deleteOne({ _id: reportId });
    return NextResponse.json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error("[delete-report]", err);

    return NextResponse.json(
      { message: "Failed to delete report", error: err.message },
      { status: 500 }
    );
  }
}

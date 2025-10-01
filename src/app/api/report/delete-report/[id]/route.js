// src/app/api/report/delete/[id]/route.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import "@/lib/mongodb";
import { deleteReportById } from "@/services/report.service";

export async function DELETE(req, { params }) {
  // 1) auth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reportId = params.id;

  try {
    const deleted = await deleteReportById(token.sub, reportId);
    if (!deleted) {
      return NextResponse.json(
        { error: "Not found or not yours" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (err) {
    console.error("[delete-report]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

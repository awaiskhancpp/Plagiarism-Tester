import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ApiRequest from "@/models/apirequest.model";
import "@/lib/mongodb";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "developer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 10;

    const requests = await ApiRequest.find({ user_id: session.user.id })
      .sort({ createdAt: -1 })
      .limit(limit);

    // Format the response
    const formattedRequests = requests.map((req) => ({
      id: req._id.toString(),
      method: req.method,
      endpoint: req.endpoint,
      status: req.status,
      responseTime: req.responseTime,
      timestamp: new Date(req.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      size: req.size,
    }));

    return NextResponse.json(
      { requests: formattedRequests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching API requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}
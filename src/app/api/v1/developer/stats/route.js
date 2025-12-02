import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ApiRequest from "@/models/apirequest.model";
import ApiKey from "@/models/apikey.model";
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

    const userId = session.user.id;

    // Get total requests
    const totalRequests = await ApiRequest.countDocuments({ user_id: userId });

    // Get successful requests
    const successfulRequests = await ApiRequest.countDocuments({
      user_id: userId,
      status: { $gte: 200, $lt: 300 },
    });

    // Calculate success rate
    const successRate =
      totalRequests > 0
        ? ((successfulRequests / totalRequests) * 100).toFixed(1)
        : 0;

    // Get average response time
    const avgResponseResult = await ApiRequest.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: null, avgTime: { $avg: "$responseTime" } } },
    ]);
    const avgResponseTime =
      avgResponseResult.length > 0
        ? Math.round(avgResponseResult[0].avgTime)
        : 0;

    // Get active integrations (active API keys)
    const activeIntegrations = await ApiKey.countDocuments({
      user_id: userId,
      active: true,
    });

    // Get today's requests
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const requestsToday = await ApiRequest.countDocuments({
      user_id: userId,
      createdAt: { $gte: startOfDay },
    });

    // Get today's errors
    const errorsToday = await ApiRequest.countDocuments({
      user_id: userId,
      createdAt: { $gte: startOfDay },
      status: { $gte: 400 },
    });

    const stats = {
      totalRequests,
      successRate: parseFloat(successRate),
      avgResponseTime,
      activeIntegrations,
      requestsToday,
      errorsToday,
    };

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error("Error fetching developer stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}


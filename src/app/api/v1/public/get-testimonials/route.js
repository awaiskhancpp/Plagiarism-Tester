import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Settings from "@/models/settings.model";

const MONGODB_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/sluethink";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  }
}

// GET: Fetch public testimonials (no authentication required)
export async function GET() {
  try {
    await connectDB();

    // Fetch users with public visibility
    const testimonials = await Settings.find({
      profileVisibility: "public",
      name: { $exists: true, $ne: "" },
      bio: { $exists: true, $ne: "" },
    })
      .select("name profession department title bio")
      .limit(20)
      .lean();
    return NextResponse.json(testimonials);
  } catch (err) {
    console.error("[get-public-testimonials]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

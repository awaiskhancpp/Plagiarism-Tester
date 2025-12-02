import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";
import Settings from "@/models/settings.model";
import userModel from "@/models/user.model";

const MONGODB_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/sluethink";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  }
}

// GET: Fetch teacher settings
export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    let settings = await Settings.findOne({ userId: token.sub }).lean();

    if (!settings) {
      // Create default settings for the user
      settings = await Settings.create({
        userId: token.sub,
        name: token.name,
        email: token.email,
      });
    }

    return NextResponse.json(settings);
  } catch (err) {
    console.error("[get-settings]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Update teacher settings
export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();

    // Update or create settings
    let settings = await Settings.findOneAndUpdate(
      { userId: token.sub },
      { ...body, userId: token.sub },
      { upsert: true, new: true }
    );

    // Update user model with new name and email
    const updatedUser = await userModel.findByIdAndUpdate(
      token.sub,
      {
        name: body.name || settings.name,
        email: body.email || settings.email,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ Settings and user updated successfully");

    // Return success response
    return NextResponse.json({
      message: "Settings updated successfully",
      settings: settings.toObject(),
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    console.error("[update-settings]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import "@/lib/mongodb";

// Import models
import ApiKey from "@/models/apikey.model";

export async function GET(req) {
  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "developer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const apiKeys = await ApiKey.find({ user_id: token.sub }).sort({
      createdAt: -1,
    });

    // Format the response
    const formattedKeys = apiKeys.map((key) => ({
      id: key._id.toString(),
      name: key.name,
      key: key.key, // This is now the JWT token
      created: key.createdAt.toISOString().split("T")[0],
      lastUsed: key.lastUsed
        ? new Date(key.lastUsed).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Never",
      requests: key.requests,
      active: key.active,
    }));

    return NextResponse.json({ apiKeys: formattedKeys }, { status: 200 });
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return NextResponse.json(
      { error: "Failed to fetch API keys", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "developer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "API key name is required" },
        { status: 400 }
      );
    }

    // Check if user already has an API key
    const existingKey = await ApiKey.findOne({ user_id: token.sub });
    if (existingKey) {
      return NextResponse.json(
        { error: "You can only have one API key. Delete the existing key to create a new one." },
        { status: 400 }
      );
    }

    // Create JWT token with user's information (valid for 1 year)
    const jwtToken = jwt.sign(
      {
        sub: token.sub,
        email: token.email,
        name: token.name,
        role: token.role,
        apiKeyName: name.trim(),
      },
      process.env.FASTAPI_SECRET,
      { 
        algorithm: "HS256",
        expiresIn: "365d" // 1 year expiration
      }
    );

    const newApiKey = await ApiKey.create({
      user_id: token.sub,
      name: name.trim(),
      key: jwtToken, // Store the JWT token
      active: true,
      requests: 0,
    });

    return NextResponse.json(
      {
        message: "API key created successfully",
        apiKey: {
          id: newApiKey._id.toString(),
          name: newApiKey.name,
          key: newApiKey.key,
          created: newApiKey.createdAt.toISOString().split("T")[0],
          lastUsed: "Never",
          requests: 0,
          active: true,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating API key:", error);
    return NextResponse.json(
      { 
        error: "Failed to create API key",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Add DELETE endpoint to allow users to delete their API key
export async function DELETE(req) {
  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "developer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const keyId = searchParams.get("id");

    if (!keyId) {
      return NextResponse.json(
        { error: "API key ID is required" },
        { status: 400 }
      );
    }

    const result = await ApiKey.findOneAndDelete({
      _id: keyId,
      user_id: token.sub, // Ensure user can only delete their own keys
    });

    if (!result) {
      return NextResponse.json(
        { error: "API key not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "API key deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting API key:", error);
    return NextResponse.json(
      { error: "Failed to delete API key", details: error.message },
      { status: 500 }
    );
  }
}
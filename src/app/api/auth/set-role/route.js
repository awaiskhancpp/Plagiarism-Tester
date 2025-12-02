// app/api/auth/set-role/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import "@/lib/mongodb";
import User from "@/models/user.model";

export async function POST(req) {
  try {
    // ✅ get session properly in App Router
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();
    if (
      !role ||
      !["student", "teacher", "developer"].includes(role.toLowerCase())
    ) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { role: role.toLowerCase() } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Role updated", user });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Failed to set role" },
      { status: 500 }
    );
  }
}

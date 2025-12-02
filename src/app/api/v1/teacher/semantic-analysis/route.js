import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  // get NextAuth session token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // sign HS256 for FastAPI
  const signed = jwt.sign(
    { sub: token.sub, email: token.email, name: token.name },
    process.env.FASTAPI_SECRET,
    { algorithm: "HS256", expiresIn: "1h" }
  );

  // forward to FastAPI
  const form = await req.formData();

  const upstream = await fetch(
    `${process.env.FASTAPI_URL}/teacher/semantic-analysis`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${signed}`,
      },
      body: form, // FormData auto-sets Content-Type with boundary
    }
  );

  const data = await upstream.json().catch(async () => {
    const raw = await upstream.text();
    return { error: "Invalid JSON from FastAPI", raw };
  });

  return NextResponse.json(data, { status: upstream.status });
}

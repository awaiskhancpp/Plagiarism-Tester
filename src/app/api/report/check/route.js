import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  let tokenPayload;
  try {
    tokenPayload = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      raw: false,
    });
  } catch (err) {}

  if (!tokenPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let signedHs256;
  try {
    signedHs256 = jwt.sign(tokenPayload, process.env.FASTAPI_SECRET, {
      algorithm: "HS256",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }
  const form = await req.formData();

  const upstreamUrl = `${
    process.env.FASTAPI_URL || "http://localhost:8000"
  }/student/lexical-analysis`;

  let upstream;
  try {
    upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${signedHs256}`,
      },
      body: form,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Bad gateway", detail: err.message },
      { status: 502 }
    );
  }

  let data;
  try {
    data = await upstream.json();
  } catch (err) {
    const text = await upstream.text();

    data = { error: "Invalid JSON from FastAPI", raw: text };
  }
  return NextResponse.json(data, { status: upstream.status });
}

import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  // 1) Make sure user is signed in
  const sessionToken = await getToken({ req, raw: false });
  if (!sessionToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // 2) Sign an HS256 token that FastAPI expects
  let signed;
  try {
    signed = jwt.sign(sessionToken, process.env.FASTAPI_SECRET, {
      algorithm: "HS256",
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to sign token", detail: err.message }),
      { status: 500 }
    );
  }

  // 3) Read the incoming multipart body (keeps file boundaries intact)
  const form = await req.formData();

  // 4) Forward to FastAPI (teacher lexical endpoint expects "files")
  const upstreamUrl = `${
    process.env.FASTAPI_URL || "http://localhost:8000"
  }/student/lexical-analysis`;

  let upstream;
  try {
    upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${signed}`,
        // Do NOT set Content-Type; fetch will set proper multipart boundary
      },
      body: form,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Bad gateway", detail: err.message }),
      { status: 502 }
    );
  }

  // 5) Relay FastAPI response
  const ct = upstream.headers.get("content-type") || "";
  let data;
  try {
    data = ct.includes("application/json")
      ? await upstream.json()
      : await upstream.text();
  } catch {
    data = await upstream.text();
  }

  return new Response(typeof data === "string" ? data : JSON.stringify(data), {
    status: upstream.status,
    headers: {
      "content-type": ct.includes("json") ? "application/json" : "text/plain",
    },
  });
}

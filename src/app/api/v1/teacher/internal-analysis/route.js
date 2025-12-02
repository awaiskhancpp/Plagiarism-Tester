// src/app/api/report/teacher/internal-analysis/route.js
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  // get user session from next-auth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // sign a new HS256 token with your FASTAPI_SECRET
  const signedToken = jwt.sign(
    {
      name: token.name,
      email: token.email,
      sub: token.sub, // include only what you need
    },
    process.env.FASTAPI_SECRET,
    { algorithm: "HS256", expiresIn: "1h" }
  );

  // forward the request body (files) to FastAPI
  const formData = await req.formData();
  console.log("ye hai", signedToken);

  const upstream = await fetch(
    `${process.env.FASTAPI_URL}/teacher/internal-analysis`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${signedToken}`,
      },
      body: formData,
    }
  );

  const data = await upstream.json().catch(async () => {
    return { error: "Invalid JSON", raw: await upstream.text() };
  });

  return new Response(JSON.stringify(data), { status: upstream.status });
}

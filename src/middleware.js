import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get token if user is logged in
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Middleware - Path:", pathname, "Token role:", token?.role);

  // If no token and trying to access protected routes, redirect to login
  if (!token && pathname.startsWith("/dashboard")) {
    console.log("No token, redirecting to login");
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If token exists, handle role-based logic
  if (token) {
    // If user has no role, let them access any dashboard page (modal will handle role selection)
    if (
      !token.role ||
      token.role === null ||
      token.role === undefined ||
      token.role === ""
    ) {
      console.log("User has no role, allowing access for role selection");
      return NextResponse.next();
    }

    // Role-based dashboard access for users WITH roles
    if (pathname.startsWith("/dashboard/")) {
      const pathRole = pathname.split("/")[2]; // Extract role from /dashboard/[role]/...
      console.log("Path role:", pathRole, "User role:", token.role);

      // If trying to access wrong role dashboard, redirect to correct one
      if (
        pathRole &&
        pathRole !== token.role &&
        ["student", "teacher", "developer"].includes(pathRole)
      ) {
        console.log(
          `User with role ${token.role} trying to access ${pathRole} dashboard, redirecting`
        );

        const nameSlug = token.name
          ? token.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "")
          : "user";

        const url = req.nextUrl.clone();
        url.pathname = `/dashboard/${token.role}/${nameSlug}`;
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

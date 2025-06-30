import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin and /dashboard routes
  if (pathname.startsWith("/administrator")) {
    const token = request.cookies.get("access_token");

    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  /* matcher: ["/admin/:path*", "/dashboard/:path*"], */
  matcher: [],
};

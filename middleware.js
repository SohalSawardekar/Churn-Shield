import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If not logged in, redirect to login page
  if (
    !token &&
    (pathname.startsWith("/admin") || pathname.startsWith("/customer"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in and trying to access login page, redirect to respective dashboard
  if (pathname.startsWith("/login") && token) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (token.role === "customer") {
      return NextResponse.redirect(new URL("/customer", req.url));
    }
  }

  // Prevent customers from accessing admin pages
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/customer", req.url));
  }

  // Prevent admins from accessing customer pages
  if (pathname.startsWith("/customer") && token?.role !== "customer") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next(); // Allow request if all checks pass
}

// Apply middleware to relevant paths
export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/login"],
};

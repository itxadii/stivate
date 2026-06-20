import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  const isAdminDomain = hostname.startsWith("admin.");

  if (isAdminDomain) {
    if (url.pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    if (!req.auth && url.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.auth && url.pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (url.pathname === "/login") {
      return NextResponse.next();
    }

    return NextResponse.rewrite(new URL(`/admin${url.pathname === "/" ? "" : url.pathname}`, req.url));
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export const proxy = auth((req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  const isAdminDomain = hostname.startsWith("admin.");
  const isAdminPath = url.pathname.startsWith("/admin") || url.pathname === "/login";
  const isAdmin = isAdminDomain || isAdminPath;

  const requestHeaders = new Headers(req.headers);
  if (isAdmin) {
    requestHeaders.set("x-is-admin", "true");
  }

  if (isAdminDomain) {
    if (url.pathname.startsWith("/api/")) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        }
      });
    }

    if (!req.auth && url.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.auth && url.pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (url.pathname === "/login") {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        }
      });
    }

    return NextResponse.rewrite(new URL(`/admin${url.pathname === "/" ? "" : url.pathname}`, req.url), {
      request: {
        headers: requestHeaders,
      }
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

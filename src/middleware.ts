/**
 * YAN HU HAIR
 *
 * Middleware for the API routes and the pages
 *
 * @author Zhaoyu Guo
 */

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/api/auth/authentication";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/((?!api|_next|_next/static|favicon|_next/image|favicon.ico).*)"],
};

const UNAUTHENTICATED_PAGES = ["", "/login"];

const AUTH_VIEWABLE_PAGES = ["/book"];

const AUTHENTICATED_PAGES = ["/dashboard"];

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const token = request.cookies.get("token")?.value;

  // pathname
  const pathname = request.nextUrl.pathname;

  if (token) {
    const response = await fetch(
      new URL("/api/user/retrieveAuth", request.url),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await response.json();

    if (pathname?.includes("/book") || AUTHENTICATED_PAGES.includes(pathname)) {
      return NextResponse.next();
    }

    if (!data?.user && pathname !== "/onboarding/register") {
      return NextResponse.redirect(
        new URL(`/onboarding/register`, request.url)
      );
    }

    if (data?.user && pathname !== "/dashboard") {
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }
  } else {
    if (
      !UNAUTHENTICATED_PAGES.includes(pathname) &&
      !pathname?.includes("/book")
    ) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }
}

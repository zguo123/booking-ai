/**
 * YAN HU HAIR
 *
 * Middleware for the API routes and the pages
 *
 * @author Zhaoyu Guo
 */

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/api/auth/authentication";
import flagsmith from "flagsmith/next-middleware";
import logger from "./lib/logger";
import { UserResponse } from "./typings/user";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/((?!api|_next|_next/static|favicon|_next/image|favicon.ico).*)"],
};

const UNAUTHENTICATED_PAGES = ["/", "/login"];

const AUTH_VIEWABLE_PAGES = ["/"];

const AUTHENTICATED_PAGES = [""];

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

    const data = (await response.json()) as UserResponse;
    if (!data?.user && pathname !== "/onboarding/register") {
      return NextResponse.redirect(
        new URL(`/onboarding/register`, request.url)
      );
    }

    await flagsmith.init({
      environmentID: process.env.NEXT_PUBLIC_FEATURE_FLAG_CLIENT_KEY || "",
      identity: data?.user?.username as string,
      enableAnalytics: true,
      traits: {
        Email: data?.user?.email as string,
        Username: data?.user?.username as string,
        "Full Name": `${data?.user?.firstName} ${data?.user?.lastName}`,
      },
    });

    if (
      pathname?.includes("/book") ||
      pathname?.includes("/dashboard") ||
      AUTHENTICATED_PAGES.includes(pathname) ||
      AUTH_VIEWABLE_PAGES.includes(pathname)
    ) {
      return NextResponse.next();
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

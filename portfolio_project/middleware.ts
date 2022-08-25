/** @format */

import { NextResponse } from "next/server";
/** @format */

import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ACCESS_TOKEN");

  const url = new URL("/signin", request.url);
  if (token && request.nextUrl.pathname === "/signin") {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  if (!token) {
    return !token && NextResponse.rewrite(url);
  }
}
export const config = {
  matcher: ["/", "/signin"],
};

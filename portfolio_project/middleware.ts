/** @format */

import { NextResponse } from "next/server";
/** @format */

import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.ACCESS_TOKEN;
  console.log(token);
  console.log(request.nextUrl.pathname)
  const url = new URL("/signin", request.url);
  return !token ? NextResponse.rewrite(url) : NextResponse.next();
}
export const config = {
  matcher: ["/"],
};

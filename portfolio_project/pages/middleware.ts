/** @format */

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";

const signedinPages = ["/"];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}

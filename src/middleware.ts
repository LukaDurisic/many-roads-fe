import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") || "";

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini/i.test(ua);

  const pathname = request.nextUrl.pathname;

  if (isMobile && pathname !== "/mobile-blocked") {
    const url = request.nextUrl.clone();
    url.pathname = "/mobile-blocked";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

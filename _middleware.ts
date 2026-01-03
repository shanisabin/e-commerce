import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {

  const token = req.cookies.get("access")?.value;


  if (!token && req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }
  return NextResponse.next();

}
export const config = {
  matcher: ["/profile/:path*"],
};



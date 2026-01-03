import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access")?.value;
    const { pathname } = req.nextUrl;

    // Protect profile routes
    if (pathname.startsWith("/profile") && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect to profile if already logged in and trying to access login
    if (pathname === "/login" && token) {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/profile/:path*"],
};

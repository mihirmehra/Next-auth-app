import next from "next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request:NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/resetpassword';
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/verifyemail',
        '/verifyemail/:path*',
        '/resetpassword',
        '/profile',
        '/profile/:path*',
        '/login',
        '/signup',
    ],
}
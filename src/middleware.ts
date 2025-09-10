import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // console.log(request.nextUrl);
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyEmail";
    const token = request.cookies.get("token")?.value || "";
    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}


export const config = {
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup",
        "/verifyEmail"
    ]
}
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { decrypt } from "./data/constantStore";
import { checkIsAuth } from "./domain/utils/auth.utils";

export async function middleware(request: NextRequest, ev: NextFetchEvent) {
  const url = request.nextUrl.pathname;
  if (url === "/") {
    return null;
  }
  const isLogin = checkIsAuth(
    decrypt(request.cookies.get("token")?.value || "")
  );
  if (url.startsWith("/login") && isLogin) {
    return NextResponse.redirect(new URL("/customer", request.url));
  } else if (
    (url.startsWith("/customer") || url.startsWith("/admin")) &&
    !isLogin
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
}

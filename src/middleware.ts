import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserAuthSchema } from "./domain/schemas/UserAuthSchema";

const ADMIN_URLS = ["/admin", "/admin"];
const USER_URLS = ["/user"];

export async function middleware(req: NextRequest) {
  /*const token = await getToken({ req });
  const currentUrl = req?.nextUrl?.pathname;
  if (currentUrl === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const user = token?.user as UserAuthSchema;
  const isAdmin = user?.isAdmin;
  if (ADMIN_URLS.includes(currentUrl)) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (USER_URLS.includes(currentUrl)) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }*/
}

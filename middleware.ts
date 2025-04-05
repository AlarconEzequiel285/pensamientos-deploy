import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  let anonId = req.cookies.get("anon_id")?.value;

  if (!anonId) {
    anonId = uuidv4();
    res.cookies.set("anon_id", anonId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 año
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

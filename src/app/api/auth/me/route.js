//this is the backend for http://localhost:3000/api/me
import { NextResponse, NextRequest } from "next/server";
//return NextResponse.next()
// setting headers, cookies, or redirecting requests
import { verifyToken } from "../../lib/auth/session";
import { cookies } from "next/headers";
import { verify } from "crypto";
//cookies is an async function that allows you to read the HTTP incoming request cookies in Server Components, and read/write outgoing request cookies in Server Actions or Route Handlers.
export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      const decoded = verifyToken(token);
      return NextResponse.json({ name: decoded.name }, { status: 200 });
    }
  } catch (error) {
    cookies().set("token", "", { maxAge: 0 });
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

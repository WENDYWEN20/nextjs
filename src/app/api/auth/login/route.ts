import { NextResponse } from "next/server";
import { verifyUser } from "../../../../lib/service/user";
import { setLoginCookie } from "../../../../lib/auth/session";
import { signJwt } from "../../../../lib/auth/jwt";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const user = await verifyUser(email, password);
  if (!user) {
    return NextResponse.json(
      {error: "Invalid credentials"}, { status: 401 }
    );
  }
  const token=signJwt({username: user.username})
  await setLoginCookie(token)
  return NextResponse.json({success:true, user})
}

//this is the backend for http://localhost:3000/api/me
import { NextResponse, NextRequest } from "next/server";
//return NextResponse.next()
import { getLoginToken } from "../../../../lib/auth/session";
import { verifyJwt } from "../../../../lib/auth/jwt";
import { prisma } from "../../../../lib/prisma";

//cookies is an async function that allows you to read the HTTP incoming request cookies in Server Components, and read/write outgoing request cookies in Server Actions or Route Handlers.
export async function GET(req: NextRequest) {
  const token=await getLoginToken()
  console.log("token", token)
  if (!token) {return NextResponse.json({ error: "Not authenticated" }, { status: 401 })}
  const payload=verifyJwt(token) as {userId:string}||null;
  if (!payload){return NextResponse.json({ error: "Invalid Token" }, { status: 401 })}
  const user = await prisma.user.findUnique({
      where: {id: payload.userId},
      select:{id:true, username:true, email: true}
    })
  if(!user){return NextResponse.json({error:"User not found"}, {status:404})}
  return NextResponse.json(user);
  
}

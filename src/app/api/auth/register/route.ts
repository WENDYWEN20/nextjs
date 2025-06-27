import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "../../../../lib/service/user";

export async function POST(req:NextRequest){
const {username, email, password}=await req.json()
if(!username||!email||password){
    return NextResponse.json({error: 'missing information'}, {status:400})
}

const existing=await findUserByEmail(email)
if(existing){
    return NextResponse.json({error: "Email already existed"},{status:400})
}
const user=await createUser(username, email,password)
return NextResponse.json(user)
}
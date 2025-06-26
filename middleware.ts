const PUBLIC_PATHS=["/","/login","/register"]
import { NextResponse } from "next/server"
import type { NextResponse } from "next/server"
export function middleware(request: NextRequest){
    const token=request.cookies.get('token')?.value
}
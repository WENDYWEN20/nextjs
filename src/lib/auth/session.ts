import {cookies} from 'next/headers';
//next/headers is a server-only utility module in App Router
export const COOKIE_NAME='token' //import cookie API and define the key
export const setLoginCookie=async(token: string)=>{
  const cookieStore=await cookies() //get the cookie store that's tied to the current req/res cycle
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV==='production', //httpOnly in production
    path:'/', //sent to every route
    maxAge: 60*60*24*7 //one week in time
  })
}
// when the server action/route handler finishes, next.js adds 
// Set-Cookie: token=<jwt>; Path=/; Max-Age=604800; HttpOnly; Secure

export const getLoginToken=async()=>{
  const cookieStore=await cookies()
  return cookieStore.get(COOKIE_NAME)?.value||null
}
export const clearLoginCookie=async()=>{
  const cookieStore=await cookies()
  return cookisStore.set(COOKIE_NAME, '', {maxAge:0, path:"/"})
}
//Setting maxAge: 0 (and an empty value) expires the cookie immediately – the standard way to delete it.
//server component
//ssg: build time, only build once
//ssr: run time
//isr: build then run time
export const dynamic = 'force-dynamic'
import React from 'react'
import { cookies } from 'next/headers'

const ProfilePage=async()=> {
    const cookieStore=cookies()
    const user=await getUserfromToken()
    // const me=await fetch('http://localhost:3000/api/auth/me', {credentials: 'include'})
    // const user=await me.json()


  return (
    <div>
      <h1>username: {user.username}</h1>
      <h1>userid:{user.id}</h1>
      <h1>useremail:{user.email}</h1>
    </div>
  )
}
export default ProfilePage
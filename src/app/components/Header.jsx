import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'
import clsx from 'clsx'

export default function Header() {
  const pathname=usePathname()
  const router=useRouter()

  const linkClass=()=>{
    clsx("hover:underline", pathname===href && 'font-bold underline')
  }
  return (
    
    <div>
      <Link href="/login" className={linkClass("/login")}></Link>
    </div>
  )
}

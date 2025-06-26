'use client'
import React,{useState} from 'react'
const apiURL='http://localhost:3000/api/signup'
export default function RegisterPage() {
  const [userName, setUsername]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const handleSubmit=(e)=>{
  e.preventDefault()
  fetch(apiURL,{method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({userName, email, password})
  }).then(res=>{return res.json()}).then(data=>console.log('data',data)).catch(error=>{console.log('error', error)})
  //  setNewUser({userName, email, password})
  }
  return (
    <div>
      register Page here
      <form className='p-1 m-1'  onSubmit={handleSubmit} >
        <label>username</label><input type="text" placeholder='username' className='border-2 border-indigo-600' onChange={(e)=>setUsername(e.target.value)}/>
        <label>email</label><input type="text" placeholder='email' className='border-2 border-indigo-600' onChange={(e)=>setEmail(e.target.value)}/>
        <label>password</label><input type="text" placeholder='password' className='border-2 border-indigo-600' onChange={(e)=>setPassword(e.target.value)}/>
        <button className='bg-pink-500'>Sign Up</button>
      </form>
      
    </div>
  )
}

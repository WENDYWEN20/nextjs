"use client" 
//means everything below will be run at the client side
import React, {useState, useEffect} from 'react'
export default function CSRpage() {
    const [counter, setCounter]=useState(0)
    useEffect(()=>{fetch('/api/counter').then(res=>res.json())},[])
    console.log("client side")
  return (
    <div>
        <h1>create of virtual DOM count: {counter? "loading" :counter}</h1>
      
    </div>
  )
}

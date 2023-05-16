import React, {useEffect, useState} from 'react'
import './Login.css'
import {auth,provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import Home from './Home'

export default function Login() {
    const [value, setValue] = useState('')
    const handleAuth = () => {
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })

    return (
    <div className='Login-con'>
        <h1 className='logo'>Vlinx.</h1>
        <h1 className='Login-h1'>Welcome. 👋</h1>
        <input type='Email' className='input' placeholder='Email'></input>
        {value?<Home/>:
        <a className='login-btn' href='#' onClick={handleAuth}>Login With Google</a>}
        <a className='login-btn2' href='#'>Login</a>
    </div>
  )
}

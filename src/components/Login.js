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
        <div className='nav'>
            <div className='logo'>Vlinx</div> 
        </div>
        <div className='login-body'>
            <div className='login-h1'>Login to Your Account</div>
            <div className='login-desc'>Vlinx is a Global Chating Platform that faciliaties seamless communcation. With its sleek interface and advanced features. Linx offers sercure messaging, voice/vedio calls, file sharing, and group chats, enhancing your connection experience.</div>
            <input type='email' placeholder='Email' className='input email'></input>
            <input type='password' placeholder='Password' className='input email'></input>
            <a href='#' className='login-btn'>Login To Your Account</a>
        </div>
        <div className='footer'>
            <div className='privacy'>Privacy Policy</div>
            <div className='copyright'>Copyright@Vlix 2023</div>
        </div>
    </div>
  )
}



// {value?<Home/>:
// // <a className='login-btn' href='#' onClick={handleAuth}>Login With Google</a>}

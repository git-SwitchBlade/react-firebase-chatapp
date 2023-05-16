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
            <a href='#' className='signin'>SignIn ---</a>
        </div>
        <div className='login-body'>
            <div className='login-h1'>Login to Your Account</div>
            <div className='login-desc'>Vlinx is a Global Chating Platform that faciliaties seamless communcation.</div>
            <div className='login-desc pad'>With its sleek interface and advanced features.</div>
            <input type='email' placeholder='Email' className='input email'></input>
            <input type='password' placeholder='Password' className='input password'></input>
            <a href='#' className='login-btn'>Login To Your Account</a>
            {value?<Home/>:
            <a className='login-ggl' onClick={handleAuth}>Login In With Google</a>}
            <a href='#' className='forgot'>Forgot Password?</a>
        </div>
        <footer>
            <div className='privacy'>Privacy Policy</div>
            <div className='copyright'>Copyright@Vlix 2023</div>
        </footer>
    </div>
  )
}




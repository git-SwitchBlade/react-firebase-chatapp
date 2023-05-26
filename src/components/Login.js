import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


export default function Login() {
    const { signin } = UserAuth();
    const { googlesignin } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signin(email, password);
            navigate('/home');
        }catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    const handleGoogleSignin = async (e) => {
        e.preventDefault();
        setError('');
        try{
            await googlesignin();
            navigate('/home');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    

    return (
    <div className='Login-con'>
        <div className='nav'>
            <div className='logo'>Vlinx</div> 
            <a href='/signup' className='signin'>SignIn</a>
        </div>
        <div className='login-body'>
            <div className='login-h1'>Login to Your Account</div>
            <div className='login-desc'>Vlinx is a Global Chating Platform that faciliaties seamless communcation.</div>
            <div className='login-desc pad'>With its sleek interface and advanced features.</div>
            <input type='email' placeholder='Email' className='input email' onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='Password' className='input password' onChange={(e) => setPassword(e.target.value)}></input>
            <a className='login-btn' onClick={handleSignin}>Login To Your Account</a>
            <a className='login-ggl' onClick={handleGoogleSignin}>Login In With Google</a>
            <a href='#' className='forgot'>Forgot Password?</a>
        </div>
        <footer>
            <div className='privacy'>Privacy Policy</div>
            <div className='copyright'>Copyright@Vlix 2023</div>
        </footer>
    </div>
  )
}




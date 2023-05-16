import React from 'react'
import './Home.css'

export default function Home() {
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
  return (
    <>
    <div className='home'>
        <a className='logout' href='#' onClick={logout} >Log Out</a>
    </div>
    </>
  )
}

import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uname, setUname] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password, uname);
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="content">
      <div className="nav">
        <div className="logo">Vlinx</div>
        <a href="/" className="login">
          LoginIn
        </a>
      </div>
      <div className="login-body">
        <div className="login-h1">Create Your Account</div>
        <div className="login-desc">
          Vlinx is a Global Chating Platform that faciliaties seamless
          communcation.
        </div>
        <div className="login-desc pad">
          With its sleek interface and advanced features.
        </div>
        <input
          type="email"
          placeholder="Email"
          className="email input"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Username"
          className="username input "
          onChange={(e) => setUname(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="password input"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <a className="signup-btn" onClick={handleSubmit}>
          SignUp
        </a>
      </div>
    </div>
  );
}

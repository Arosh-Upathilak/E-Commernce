import React, { useState } from 'react';
import './LoginPopUp.css'
import { assets } from '../../assets/assets';

const LoginPopUp = ({setShowLogin}) => {
    const [currentState,setCurrentState] = useState("Sign Up");
  return (
    <div className='login-popup'>
      <form  className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Login"?<></>:  <input type="text"  placeholder='Your name' required />}
            <input type="text"  placeholder='Your name' required />
            <input type="password"  placeholder='Password' required />
        </div>
       <button>{currentState==="Sign Up"?"Create account":"Login"}</button>
       <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, eius.</p>
       </div>
       {currentState==="Login"? 
        <p>Create a new accout? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Click here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp

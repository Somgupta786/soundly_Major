import { useState } from "react";
import Logo from "./LogoIcon"
import { Link, NavLink, useNavigate } from 'react-router-dom';
export default function LoginCard(){
   const Navigation = useNavigate();
   const otpHandler=()=>{
      Navigation("/Otp")
   }
    
return(
    
<div className="mainContent"> 
 <div className="loginCard">
    <div className="loginFrame">
    <form onSubmit={otpHandler}>
       <div className="welcome">
       <div className="welcomeText">Welcome to</div>
       <div className="try"><Logo /></div>
        </div>
        <div className="loginText">
        Login to have an access to millions of songs 
        </div>
        <div className="label">
            <input type="text" className="loginField" placeholder="  Email or Phone No." />
            <div className="emailText">Email or Phone No.</div>
        </div>
        <div className="referLogin">
             <NavLink to="/">Signup</NavLink>
        </div>
        <div className="rememberMe">
          <input type="checkbox" className="checkBox" />
          <span className="rememberText">By creating an account, you agree to accept our Privacy Policy.</span>
       </div>
       <div className="submitLogin">
              <button type="submit" className="continueButton" >Continue</button>
            </div>
          </form>  
    </div>
 </div>


</div>



);


}
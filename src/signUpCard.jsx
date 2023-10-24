import Logo from "./LogoIcon"

import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function SignUpCard(){
//    const navRoute=useNavigate()
//     const clickHandler=()=>{
//         navRoute("/Login");
//     }
return(
<div className="mainContent"> 
 <div className="signUpCard">
    <div className="signUpFrame">
       <div className="welcome">
       <div className="welcomeText">Welcome to</div>
       <div className="try"> <Logo /></div>
        </div>
        <div className="loginText">
        Sign Up to have an access to millions of songs 
        </div>
        <div className="label">
            <input type="text" className="loginField" placeholder="  Email or Phone No." />
            <div className="emailText">Email or Phone No.</div>
        </div>
        <div className="label">
            <input type="text" className="loginField" placeholder="  Username" />
            <div className="emailText">Enter Username</div>
        </div>
        <div className="referLogin">
             <NavLink to="/login">Login</NavLink>
        </div>
   
        <div className="rememberMe">
          <input type="checkbox" className="checkBox" />
          <span className="rememberText">By creating an account, you agree to accept our Privacy Policy.</span>
       </div>
       <div className="submitLogin">
        <input type="button" value="Continue" className="continueButton" />
      </div>
    </div>
 </div>


</div>



);


}
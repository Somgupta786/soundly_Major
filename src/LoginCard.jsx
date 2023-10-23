import Logo from "./LogoIcon"

export default function LoginCard(){
return(
<div className="mainContent"> 
 <div className="loginCard">
    <div className="loginFrame">
       <div className="welcome">
       <div className="welcomeText">Welcome to</div>
       <div className="try"><Logo/></div>
        </div>
        <div className="logintext">
        Login to have an access to millions of songs 
        </div>
        <div className="label">
            <input type="text" className="loginField" placeholder="Email or Phone No." />
            <span className="emailText">Email or Phone No.</span>
        </div>
        <div className="rememberMe">
          <input type="checkbox" />
          <span>By creating an account, you agree to accept our Privacy Policy.</span>
       </div>
       <div className="submitLogin">
        <input type="button" value="Continue" />
      </div>
    </div>
 </div>


</div>



);


}
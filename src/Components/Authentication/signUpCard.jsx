import Logo from "./LogoIcon";
import { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function SignUpCard() {
  const Navigation = useNavigate();
  const [isClicked, setClicker] = useState(false);
 const [inputs, setInputs] = useState({
    username: '',
    email: '' 
  });
  const [error, setError] = useState();

  const continueHandler = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://soundly-4pie.onrender.com/api/user/register/email", {
        username: inputs.username,
        email: inputs.email
        // inputs
      });
  
      console.log(response);
      console.log("ram");
      console.log(response.data);
  
    
      setError(response.data);
  
      
      if (response.data.success) {
        Navigation("/Otp",{username:inputs.username,email:inputs.email});
      } else {
        setClicker(true);
      }
    } catch (error) {
      
      setError(error.response.data);
      if (error.response.data.success) {
        Navigation("/Otp");
      } else {
        console.log(error)
        setClicker(true);
      }
    }
  };
  

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    setClicker(false)
  };

  return (
    <div className="mainContent">
      <div className="signUpCard">
        <div className="signUpFrame">
          <form onSubmit={continueHandler}>
            <div className="welcome">
              <div className="welcomeText">Welcome to</div>
              <div className="try">
                <Logo />
              </div>
            </div>
            <div className="loginText">
              Sign Up to have an access to millions of songs
            </div>
            <div className="label">
              <input required
                type="text"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                className="loginField"
                placeholder="  Email "
              />
              <div className="emailText">Email </div>
            </div>
            <div className="label">
              <input required
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleInputChange}
                className="loginField"
                placeholder="  Username"
              />
              <div className="emailText"> Enter Username</div>
              {isClicked && error ? <p >{error.message}</p> : null}


            </div>
            <div className="referLogin">
              <NavLink className="login" to="/login">Login</NavLink>
            </div>
            <div className="rememberMe">
              <input type="checkbox" className="checkBox" required />
              <span className="rememberText">
                By creating an account, you agree to accept our Privacy Policy.
              </span>
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

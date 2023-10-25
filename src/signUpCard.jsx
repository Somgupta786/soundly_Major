import Logo from "./LogoIcon";
import { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

export default function SignUpCard() {
  const [inputs, setInputs] = useState({
    userName: '',
    details: '',
  });
  const [error, setError] = useState("");

  const continueHandler = () => {
    
    axios
      .post("http://127.0.0.1:8000/api/user/register/posts", {
        inputs: inputs,
      })
      .then((response) => {
        setError(response.data);
      })
      .catch((error) => {
        setError(error.response.data); 
      });
      console.log(error);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
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
              <input
                type="text"
                name="details"
                value={inputs.details}
                onChange={handleInputChange}
                className="loginField"
                placeholder="  Email or Phone No."
              />
              <div className="emailText">Email or Phone No.</div>
            </div>
            <div className="label">
              <input
                type="text"
                name="userName"
                value={inputs.userName}
                onChange={handleInputChange}
                className="loginField"
                placeholder="  Username"
              />
              <div className="emailText"> Enter Username</div>
            </div>
            <div className="referLogin">
              <NavLink to="/login">Login</NavLink>
            </div>
            <div className="rememberMe">
              <input type="checkbox" className="checkBox" />
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

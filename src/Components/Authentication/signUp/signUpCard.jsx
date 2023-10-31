import Logo from "../LogoIcon";
import { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

export default function SignUpCard() {
  const Navigation = useNavigate();
  const [isClicked, setClicker] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isEmail, setEmail] = useState(true);
 const [inputs, setInputs] = useState({
    username: '',
    email: '' ,
    phone_number:''
  });
  const [error, setError] = useState();

  const continueHandler = async (e) => {
    setLoad(true)
    e.preventDefault();

  if(isEmail){
    try {
      const response = await axios.post("https://test-mkcw.onrender.com/api/user/register/email/", {
        username: inputs.username,
        email: inputs.email
        
             });
      
  
      console.log(response);
     
  
    
      setError(response.data);
  
      
      if (response.data.success) {
        toast("OTP SENT!");
        Navigation("/Otp",{state:{username:inputs.username,email:inputs.email,id:1,isEmail:{isEmail}
        }});
      } else {
        setClicker(true);
        setLoad(false);
      }
    } catch (error) {
      
      setError(error.response.data);
      if (error.response.data.success) {
        Navigation("/Otp");
      } else {
        console.log(error)
        setClicker(true);
        setLoad(false);
      }
    }
  }
  else{
    try {
      const response = await axios.post("https://test-mkcw.onrender.com/api/user/register/phone/", {
        username: inputs.username,
      phone_number: inputs.phone_number
      });
     setError(response.data);
  
 if (response.data.success) {
  toast("OTP SENT!");
  
        Navigation("/Otp",{state:{username:inputs.username,email:inputs.phone_number,id:1,isEmail:{isEmail}
        }});
      } else {
        setClicker(true);
        setLoad(false);
      }
    } catch (error) {
      
      setLoad(false);
         setClicker(true);
       
        if (error.response) {
         setError(error.response.data);
        } else {
          console.log(error)
          
          setLoad(false);
        }
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
    
      <div className="signUpCard">
        <div  >
          <form className="signUpFrame" id="signUp" onSubmit={continueHandler}>
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
                type={isEmail?"email":"number"}
                name={isEmail?"email":"phone_number"}
                value={isEmail?inputs.email:inputs.phone_number}
                onChange={handleInputChange}
                className="loginField"
                placeholder={isEmail?"Email":"Phone Number"}
              />
              <div className="emailText"> {isEmail?"Email":"Phone no."} </div>
              {isClicked && error ? <p className="errorMsg">{error.message}</p> : null}
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
              


            </div>
           
            <div className="rememberMe">
              <input type="checkbox" className="checkBox" required />
              <span className="rememberText">
                By creating an account, you agree to accept our Privacy Policy.
              </span>
            </div>
            <div className="phoneLogin" onClick={()=>setEmail(!isEmail)}>
            {isEmail?"Sign Up with Phone number?":"Sign Up with Email."}  
            </div>
            <div className="submitLogin">
              <button type="submit" className="continueButton" >{isLoad ?<div className="loader"></div> :"Continue"}</button>
            </div>
          </form>
        </div>
      </div>
    
  );
}

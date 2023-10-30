import Logo from "./LogoIcon";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetOption() {
  const Navigation = useNavigate();
  const [isClicked, setClicker] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isEmail, setEmail] = useState(true);
 const [inputs, setInputs] = useState({
    email: '' ,
    phone_number:''
  });
  const [error, setError] = useState();

  const continueHandler = async (e) => {
    setLoad(true)
    e.preventDefault();

  if(isEmail){
    try {
      const response = await axios.post("https://test-mkcw.onrender.com/api/user/forgot-email/", {
        email: inputs.email 
      });
      
  
      console.log(response);
     
  
    
      setError(response.data);
  
      
      if (response.data.success) {
        Navigation("/Otp",{state:{username:response.data.data,email:inputs.email,id:1,isEmail:{isEmail}
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
      const response = await axios.post("https://test-mkcw.onrender.com/api/user/forgot-phone_number/", {
      phone_number: inputs.phone_number
      });
     setError(response.data);
  
 if (response.data.success) {
        Navigation("/Otp",{state:{username:response.data.data,email:inputs.phone_number,id:1,isEmail:{isEmail}
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
    
      <div className="loginCard">
        <div className="loginFrame">
          <form className="loginFrame" onSubmit={continueHandler}>
            <div className="welcome">
              <div className="welcomeText">Welcome to</div>
              <div className="try">
                <Logo />
              </div>
            </div>
            <div className="favText"> To listen your favorite music</div>
            <div className="loginText">
            Enter your {isEmail?"registered Email":"registered Number"}
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
              {isClicked && error ? <p className="errorMsg" >{error.message}</p> : null}
            </div>
            <div className="phoneLogin" onClick={()=>setEmail(!isEmail)}>
            {isEmail?"Login via Phone number?":"Login via Email."}  
            </div>
            <div className="submitLogin">
              <button type="submit" className="continueButton" >{isLoad ?<div className="loader"></div> :"Continue"}</button>
            </div>
          </form>
        </div>
      </div>
    
  );
}

import Logo from "../LogoIcon";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetOption() {
  const Navigation = useNavigate();
  // const [isClicked, setClicker] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isEmail, setEmail] = useState(true);
 const [inputs, setInputs] = useState({
    email: '' ,
    phone_number:''
  });
  const [error, setError] = useState();
  const email_valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobile_valid = /^((\+91)|(91)|0?)[6-9]\d{9}$/;
  const continueHandler = async (e) => {
    setLoad(true)
    e.preventDefault();

  if(isEmail){
    try {
      const response = await axios.post("https://test-mkcw.onrender.com/api/user/forgot-email/", {
        email: inputs.email 
      });
      
      setLoad(false);
      console.log(response);
     
  
    
      setError(response.data);
  
      
      if (response.data.success) {
       
        Navigation("/Otp",{state:{username:response.data.data,id:2
        }});
      } else {
        // setClicker(true);
        setLoad(false);
      }
    } catch (error) {
      console.log(error.response)
       setLoad(false);
      //  setClicker(true);
     
      if (error.response) {
       setError(error.response.data);
      } else {
        console.log(error)
        
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
     setLoad(false);
 if (response.data.success) {
  // toast("OTP SENT!");
        Navigation("/Otp",{state:{username:response.data.data,id:2
        }});
      } else {
        // setClicker(true);
        setLoad(false);
      }
    } catch (error) {
      setLoad(false);
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
    
    if(e.target.type !=="text"){
      
      if(isEmail){
        if(value.trim() === ""){
          setError()
        }
        else{
        const emailError =
          name === "email" &&
          (value.trim() === "" || !email_valid.test(value.trim()) || value.length > 50)
            ? setError({
              message :"Enter the email correctly!"
            }) : setError() 
          }
            
    
      }
      else {
        if(value.trim() === ""){
          setError()
        }
        else{
        const emailError =
          name === "phone_number" && value.trim() !== "" && !mobile_valid.test(value.trim())
            ? setError({
              message :"10 valid digits needed!"
            }) : setError() 
          }
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
    // setClicker(false)
  };
  const boxStyle = {
    
    border:  error  ? '2px solid red' : null,
  };

  return (
    
      <div className="loginCard" id="forgetCard">
        <div >
          <form className="loginFrame" id="forget" onSubmit={continueHandler}>
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
                style={boxStyle}
              />
              <div className="emailText"> {isEmail?"Email":"Phone no."} </div>
              
            </div>
            {error ? <p className="errorMsg" >{error.message}</p> : null}
            <div className="phoneLogin" onClick={()=>setEmail(!isEmail)}>
            {isEmail?"Login via Phone number?":"Login via Email."}  
            </div>
            <div className="submitLogin">
            <button type={isLoad ? "button" : "submit"} className="continueButton" disabled={error}>
               {isLoad ? <div className="loader"></div> : "Continue"}
                 </button>
            </div>
          </form>
        </div>
      </div>
    
  );
}

import React, { useState, useEffect, useRef, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Resend from "./resendOtp";


export  const Context = createContext("");

export default function Otp(props) {
  
  const [isLoad, setLoad] = useState(false);
  const [error, setError] = useState();
  const [isClicked, setClicker] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const Navigation = useNavigate();

  const [code, setOTP] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOTPChange = (e, index) => {
    setClicker(false);
    const value = e.target.value.replace(/\D/g, '').slice(0, 1);
    const updatedOTP = [...code];
    updatedOTP[index] = value;
    setOTP(updatedOTP);

    
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const verifyHandler = async (e) => {
    setLoad(true);
    e.preventDefault();
    const otp = code.join("");
    try {
      const response = await axios.post('https://test-mkcw.onrender.com/api/user/verify/', {
        otp,
        username: props.username
      });
      setError(response.data);
      setLoad(false);
      if (response.data.success) {
        
        localStorage.setItem('authToken',JSON.stringify(response.data.data.access_token))
        // console.log(JSON.parse(localStorage.getItem('authToken')));
        Navigation('/language');
      } else {
        setClicker(true);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        setLoad(false);
      } else {
        console.log(error.message);
        setLoad(false);
      }

      setClicker(true);
    }
  };

  const handleResendClick = () => {
    setShowResend(!showResend);
    setCountdown(20);
  };
  const boxStyle = {
    
    border: isClicked && error  ? '1px solid red' : null,
  };


  return (
    <div className="mainContent" >
      <div className="loginCard" id="otpCard">
        <div>
          <form className="loginFrame" id="otp" onSubmit={verifyHandler}>
            <div className="welcome">
              <div className="welcomeText">Enter OTP</div>
            </div>
            <div className="loginText">
              Please enter the 4-digit code sent to you at
            </div>
            <div className="verifyEmail">
              {props.id === 1 ? props.email : "Example@gmail.com"}
            </div>
            <div className="otp-input">
              <div className="otpSet">
                {code.map((digit, index) => (
                  <input
                    ref={inputRefs[index]}
                    required
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOTPChange(e, index)}
                    style={boxStyle}
                  />
                ))}
              </div>
              <div className="resendOtp">
                {isClicked && error ? (
                  <p className="errorMsg">{error.message}</p>
                ) : countdown > 0 ? (
                  <>
                    {showResend && <Context.Provider value={{setShowResend}}> <Resend props={props}  /></Context.Provider> }
                    <p>Resend OTP in {countdown} seconds</p>
                  </>
                ) : (
                  <>
                    <button onClick={handleResendClick}>Resend OTP</button>
                  </>
                )}
              </div>
            </div>
            <div className="rememberMe">
              <input required type="checkbox" className="checkBox" />
              <span className="rememberText">
                By creating an account, you agree to accept our Privacy Policy.
              </span>
            </div>
            <div className="submitLogin">
            <button type={isLoad ? "button" : "submit"} className="continueButton" >
               {isLoad ? <div className="loader"></div> : "Verify"}
                 </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



import Navbar from "./Navbar"
import './index.css'
import Logo from "./LogoIcon";
import { useState,useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';


export default function Otp() {
    const [otp, setOTP] = useState(['', '', '', '']);
    const [countdown, setCountdown] = useState(60);
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
      const handleOTPChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 1);
        const updatedOTP = [...otp];
        updatedOTP[index] = value;
        setOTP(updatedOTP);
      };


  return (
    <div className="mainContent">
      <div className="signUpCard">
        <div className="signUpFrame">
          {/* <form > */}
            <div className="welcome">
              <div className="welcomeText">Enter OTP</div>
            </div>
            <div className="loginText">
            Please enter the 4-digit code sent to you at
            </div>
            <div className="verifyEmail">
               Example123@gmail.com
            </div>
            <div className="otp-input">
            <div className="otpSet">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOTPChange(e, index)}
          />
        ))}

      </div>
      <div className="resendOtp">
      {countdown > 0 ? (
        <p>Resend OTP in {countdown} seconds</p>
      ) : (
        <button onClick={() => setCountdown(60)}>Resend OTP</button>
      )}
</div>
      </div>
           
            <div className="rememberMe">
              <input type="checkbox" className="checkBox" />
              <span className="rememberText">
                By creating an account, you agree to accept our Privacy Policy.
              </span>
            </div>
            <div className="submitLogin">
            {otp.every((digit) => digit !== '') && countdown > 0 ? (
        <button className="continueButton" onClick={() => console.log(`Verifying OTP: ${otp.join('')}`)}>Verify OTP</button>
         ) : (
        <button className="continueButton"  disabled>Verify OTP</button>
          )}
            </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

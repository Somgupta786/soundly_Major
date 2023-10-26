

import Navbar from "./Navbar"
// import '../../index.css';
import { useState,useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function Otp(props) {
  console.log(props)
  const [error, setError] = useState();
  const [isClicked, setClicker] = useState(false);
  const Navigation = useNavigate();
 
  
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
      const verifyHandler = async (e) => {
        console.log("raju");
        Navigation('/language');
        e.preventDefault();
        try {
          
          const response = await axios.post('http://127.0.0.1:8000/api/user/verify/', { otp });
        
          setError(response.data);
          if (response.data.success) {
            Navigation('/language');
          } else {
            setClicker(true);
          }
        } 
        catch (error) {
          setError(error.response.data);
          if (error.response.data.success) {
            Navigation('/language');
          } else {
            console.log(error);
            setClicker(true);
          }
        }
      };
      


  return (
    <div className="mainContent">
      <div className="loginCard">
        <div className="loginFrame">
          <form  onSubmit={verifyHandler}>
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
  {isClicked && error ? (
    <p>{error.message}</p>
  ) : countdown > 0 ? (
    <p>Resend OTP in {countdown} seconds</p>
  ) : (
    <button onClick={() => setCountdown(60)}>Resend OTP</button>
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
            {otp.every((digit) => digit !== '') && countdown > 0 ? (
        <button className="continueButton" type="submit">Verify OTP</button>
         ) : (
        <button className="continueButton"  type="submit" disabled>Verify OTP</button>
          )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

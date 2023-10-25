import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import OtpPage from "./otpPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/Otp" element={<OtpPage />} />
    </Routes>
  );
}

export default AppRouter;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import OtpPage from "./Components/Authentication/otpPage";
import Language from "./Components/Authentication/language";
import ArtistSelection from "./Components/Authentication/ArtistSelection";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/Otp" element={<OtpPage />} />
      <Route path="/language" element={<Language />} />
      <Route path="/artist" element={<ArtistSelection />} />
    </Routes>
  );
}

export default AppRouter;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Authentication/login/Login';
import SignUp from './Components/Authentication/signUp/SignUp';
import OtpPage from "./Components/Authentication/otp/otpPage";
import Language from "./Components/Authentication/language/language";
import ArtistSelection from "./Components/Authentication/artist/ArtistSelection";
import Forget from './Components/Authentication/forgetUsername/forget';
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/Otp" element={<OtpPage />} />
      <Route path="/language" element={<Language />} />
      <Route path="/artist" element={<ArtistSelection />} />
      <Route path="/forget" element={<Forget/>} />
    </Routes>
  );
}

export default AppRouter;

import React, { useEffect,useState,createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Authentication/login/Login';
import SignUp from './Components/Authentication/signUp/SignUp';
import OtpPage from "./Components/Authentication/otp/otpPage";
import Language from "./Components/Authentication/language/language";
import ArtistSelection from "./Components/Authentication/artist/ArtistSelection";
import Forget from './Components/Authentication/forgetUsername/forget';
import ProtectedRouter from './ProtectedRouter';
import Landing from './Components/Home_Page/landing';
import Library from './Components/Home_Page/Library/Library';
import Playlist from './Components/Home_Page/Library/Playlist';
import ArtistFollow from './Components/Home_Page/Library/artistFollow';
export const loginContext=createContext("");
function AppRouter() {
  const[isLogged,setLogged]=useState(false)
  useEffect(
    ()=>{
      localStorage.setItem('isLogged',JSON.stringify(isLogged))
    },[isLogged])
  return (
    <loginContext.Provider value={{isLogged,setLogged}}>
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/Otp" element={<ProtectedRouter Component={OtpPage } />}  />
      <Route path="/language" element={<ProtectedRouter Component={Language} />} />
      <Route path="/artist" element={<ProtectedRouter Component={ArtistSelection} />}  />
      <Route path="/forget" element={<Forget/>} />
      <Route path="/home" element={<Landing/>} />
      <Route path="/library" element={<Library/>} />
      <Route path="/playlist" element={<Playlist/>} />
      <Route path="/favArt" element={<ArtistFollow/>} />


    </Routes>
    </loginContext.Provider>
  );
}

export default AppRouter;

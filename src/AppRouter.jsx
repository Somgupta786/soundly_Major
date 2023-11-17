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
import Pop from './Components/Home_Page/Pop';
import HipHop from './Components/Home_Page/HipHop';
import Rock from './Components/Home_Page/Rock';
import R_B from './Components/Home_Page/R&B';
import Rap from './Components/Home_Page/Rap';
import PlaylistAddSongs from './Components/Home_Page/Library/playlistAddSongs';
import ShowPlaylist from './Components/Home_Page/Library/showPlaylist';
import MediaPlayer from './Components/Home_Page/Library/mediaPlayer';
import ArtistSection from './Components/Home_Page/artistSection/artistSection';
import Upload from './Components/Home_Page/artistSection/upload';
import GameSection from './Components/Home_Page/Library/game';
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
      <Route path="/forYou" element={<Landing/>} />
      <Route path="/pop" element={<Pop/>} />
      <Route path="/rock" element={<Rock/>} />
      <Route path="/Hip-Hop" element={<HipHop/>} />
      <Route path="/Rap" element={<Rap/>} />
      <Route path="/R&B" element={<R_B/>} />
      <Route path="/library" element={<Library/>} />
      <Route path="/liked" element={<Library/>} />
      <Route path="/playlist" element={<Playlist/>} />
      <Route path="/favArt" element={<ArtistFollow/>} />
      <Route path="/addSongs" element={<PlaylistAddSongs/>} />
      <Route path="/showPlaylist" element={<ShowPlaylist/>} />
      <Route path="/media" element={<MediaPlayer/>} />
      <Route path="/beArtist" element={<ArtistSection/>} />
      <Route path="/upload" element={<Upload/>} />
      <Route path="/game" element={<GameSection/>} />
    </Routes>
    </loginContext.Provider>
  );
}

export default AppRouter;

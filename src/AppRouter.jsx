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
import FavArtSongs from './Components/Home_Page/favArtSongs';
import Recent from './Components/Home_Page/recentlyPlayed';
import LikedPlay from './Components/Home_Page/likedPlaylist';

export const loginContext=createContext("");
function AppRouter() {

    
  return (
    <loginContext.Provider >
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/Otp" element={<OtpPage />}  />
      <Route path="/language" element={<ProtectedRouter Component={Language} />} />
      <Route path="/artist" element={<ProtectedRouter Component={ArtistSelection} />}  />
      <Route path="/forget" element={<Forget />} />
      <Route path="/home" element={<ProtectedRouter Component={Landing} />} />
      <Route path="/forYou" element={<ProtectedRouter Component={Landing} />} />
      <Route path="/pop" element={<ProtectedRouter Component={Pop} />} />
      <Route path="/rock" element={<ProtectedRouter Component={Rock} />} />
      <Route path="/Hip-Hop" element={<ProtectedRouter Component={HipHop} />} />
      <Route path="/Rap" element={<ProtectedRouter Component={Rap} />} />
      <Route path="/R&B" element={<ProtectedRouter Component={R_B} />} />
      <Route path="/library" element={<ProtectedRouter Component={Library} />} />
      <Route path="/liked" element={<ProtectedRouter Component={Library} />} />
      <Route path="/playlist" element={<ProtectedRouter Component={Playlist} />} />
      <Route path="/favArt" element={<ProtectedRouter Component={ArtistFollow} />} />
      <Route path="/addSongs" element={<ProtectedRouter Component={PlaylistAddSongs} />} />
      <Route path="/showPlaylist" element={<ProtectedRouter Component={ShowPlaylist} />} />
      <Route path="/media" element={<ProtectedRouter Component={MediaPlayer}  />} />
      <Route path="/beArtist" element={<ProtectedRouter Component={ArtistSection}  />} />
      <Route path="/upload" element={<ProtectedRouter Component={Upload}  />} />
      <Route path="/game" element={<ProtectedRouter Component={GameSection}  />} />
      <Route path="/favouriteArtistSongs" element={<ProtectedRouter Component={FavArtSongs}  />} />
      <Route path="/recent" element={<ProtectedRouter Component={Recent}  />} />
      <Route path="/likedPlaylists" element={<ProtectedRouter Component={LikedPlay}  />} />
    </Routes>
    </loginContext.Provider>
  );
}

export default AppRouter;

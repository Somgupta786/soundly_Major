import LoginCard from "./LoginCard";
import Navbar from "../Navbar";
import { playBackContext } from "../../../App";
import { useContext } from "react";

export default function Login() {
  const{setPlayBackData,isLiked,setNavData,setfutureSongData,setHome,setMedia,isMedia,setMediaData,currentSongIndex,setCurrentSongIndex,favArt,setFavArt}=useContext(playBackContext);
  setHome(false)
  return (
    <div className="loginContainer">
      <div className="tryi">
        <Navbar title="SignUp" />
        <LoginCard />
      </div>
    </div>
  );
}

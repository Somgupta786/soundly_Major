import Group from "../../assets/Group.svg";
import Left from "../../assets/left.svg";
import Right from "../../assets/Right.svg";
import Repeat from "../../assets/Repeat.svg";
import Pause from "../../assets/Continue.svg";
import Line from "../../assets/Line.svg";
import Rectangle from "../../assets/Rectangle 14.svg";
import Heart from "../../assets/Unlike.svg";
import Share from "../../assets/Share.svg";
import Continue from "../../assets/pause.svg";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heart2 from "../../assets/Like button (1).svg";
import MediaPlayer from "./Library/mediaPlayer";

import axios from "../../Api/auth";
import { playBackContext } from "../../App";

export default function Playback(props) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);
  const [songs, setSongs] = useState([]);
  const {
    setIsLeftClicked,
    setIsRightClicked,
    setCurrentSongIndex,
    playBackData,
    setPlayBackData,
    setNavData,
    setHome,
    isPlaying,
    isMedia,
    setIsPlaying,
    isLiked,
    setIsLiked,
    currentTime,
    setCurrentTime,
    totalDuration,
    setTotalDuration,
    audio,
    setAudio,
  } = useContext(playBackContext);
 

  const Navigation = useNavigate();
  const token = JSON.parse(localStorage.getItem("authTok"));

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentageClicked = (clickPosition / progressBar.clientWidth) * 100;
    const newCurrentTime = (percentageClicked / 100) * totalDuration;
    setCurrentTime(newCurrentTime);
    audio.currentTime = newCurrentTime;
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setTotalDuration(audio.duration);
    };

    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  useEffect(() => {
    
    if (playBackData.url && playBackData.url !== audio.src) {
      
      audio.pause();
      audio.src = playBackData.url;
      audio.load();
      audio.play();
      setIsPlaying(true);
    } else if (!playBackData.url) {
      audio.pause();
    }
  }, [playBackData.url, audio.src,playBackData]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }

    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    console.log(playBackData.isLiked)
    setIsLiked(playBackData.isLiked);
  }, [playBackData]);

  const likedHandler = async () => {
    if (!isLiked) {
      try {
        const response = await axios.post(
          `favourite/song/${playBackData.id}/`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setIsLiked(!isLiked);
          console.log(isLiked);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("ram");
      try {
        const response = await axios.delete(
          `favourite/song/${playBackData.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setIsLiked(!isLiked);
          console.log(isLiked);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // const leftClickHandler=async ()=>{
  //   try {
  //     const url = "https://test-mkcw.onrender.com/api/recentlyplayed/";
  //      const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     if (response.data.success) {
  //       const fetchedSongs = response.data.data;
  //       setSongs(fetchedSongs);
  //     } else {
  //       console.error('Failed to fetch songs.');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // }
  // useEffect(() => {

  //   if(songs.length>0){

  return (
    <div className={`playBack ${props.className ? props.className : ''}`}>
      <div>
        {props.playBackData.thumbnail && (
          <img src={props.playBackData.thumbnail} />
        )}
        <div>{props.playBackData.name}</div>
      </div>
      <div>
        <div className="controls">
          <img src={Group} />
          <img
            onClick={() => {
              setIsLeftClicked(true);
            }}
            src={Left}
          />
          <img onClick={handlePlayPause} src={isPlaying ? Continue : Pause} />
          <img
            onClick={() => {
              setIsRightClicked(true);
            }}
            src={Right}
          />
          <img src={Repeat} />
        </div>
        {props.playBackData.url ? (
          <audio id="audio-element">
            <source src={props.playBackData.url} type="audio/mpeg" />
          </audio>
        ) : null}
        <div className="musicTimer">
          <div className="time-display">{formatTime(currentTime)}</div>
          <div className="progress-bar" onClick={handleProgressBarClick}>
            <div
              className="progress-fill"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            ></div>
          </div>
          <div className="time-display">{formatTime(totalDuration)}</div>
        </div>
      </div>
      <div className="Share">
        <div>
          <img onClick={likedHandler} src={isLiked ? Heart2 : Heart} />
        </div>
        <div>
          <img onClick={() => Navigation("/media")} src={Share} />

          <div>Share </div>
        </div>
      </div>
    </div>
  );
}

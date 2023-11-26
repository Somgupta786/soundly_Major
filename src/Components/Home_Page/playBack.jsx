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
import Inst from "../../assets/Instagram.svg";
import Whats from "../../assets/whatsa.svg";
import Snake from "../../assets/snake.svg";
import close from "../../assets/Close_LG.svg";
import add from "../../assets/Add_Plus_Circle.svg";
import axios from "../../Api/auth";
import { playBackContext } from "../../App";
import ShowPlaylist from "./Library/showPlaylist";
import repeat1 from "../../assets/repeat2.svg";
import shuf from "../../assets/Shuffle.svg";
import loop from "../../assets/songloop.svg"

export default function Playback(props) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);
  const [songs, setSongs] = useState([]);
  const [shareWindow, setShareWindow] = useState(false);
  const [playlistWindow, setPlaylistWindow] = useState(false);
  const [playListData, setPlayListData] = useState([]);
  const [style, setStyle] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const {
    isSongLoop,setSongLoop,
    clickCount,
   setClickCount,
    currentSongSection,
    setShuffle,
    isShuffle,
    isPlaylistLoop,
    setPlaylistLoop,
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
  console.log(isLiked)

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
    if (playBackData.url && playBackData.url !== audio.src||isSongLoop) {
      console.log(audio.src);
      console.log(playBackData.url)
      audio.pause();
      audio.src = playBackData.url;
      console.log(audio);
      audio.load();
      audio.play();
      setIsPlaying(true);
    } else if (!playBackData.url) {
      audio.pause();
    }
  }, [playBackData.url, audio.src, playBackData]);

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
  useEffect(() => {
    if (playlistWindow) {
      const playListData = async () => {
        try {
          const response = await axios.get("playlists/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setPlayListData(response.data.data);
            console.log(response.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      playListData();
    }
  }, [playlistWindow]);
  const addSongHandler = async () => {
    console.log(currentPlaylist);
    if (currentPlaylist !== null) {
      try {
        const response = await axios.post(
          `playlists/${currentPlaylist}/songs/${playBackData.id}/`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setShareWindow(false);
          setPlaylistWindow(false);
        }
      } catch (error) {}
    }
  };
  const handleLyricClick = () => {
    console.log(clickCount)
    if (clickCount === 0) {
    
      Object.keys(playBackData).length === 0 ? null :
      (setPlaylistLoop(!isPlaylistLoop),
      setShuffle(false) ,
      setSongLoop(false),
      setClickCount((prevClickCount) => prevClickCount + 1));
              
    }
     else if (clickCount === 1) {
      Object.keys(playBackData).length === 0 ? null :
      (setSongLoop(true),
      setPlaylistLoop(false),
        setShuffle(false) ,
        setClickCount((prevClickCount) => prevClickCount + 1));
      
    }
    else if (clickCount === 2) {
      Object.keys(playBackData).length === 0 ? null :
      ( setSongLoop(false),
       setPlaylistLoop(false),
        setShuffle(false) ,
        setClickCount((prevClickCount) => prevClickCount - 2));
       
      
      
    }
    

    // Increment the click count
    
  };

  return (
    <div className={`playBack ${props.className ? props.className : ""}`}>
      <div>
        {props.playBackData.thumbnail && (
          <img src={props.playBackData.thumbnail} />
        )}
        <div>{props.playBackData.name}</div>
       
      </div>
      <div>
        <div className="controls">
          <img
          className="s"
            onClick={() =>{
              Object.keys(playBackData).length === 0 ? null :
              setShuffle(!isShuffle),
              setPlaylistLoop(false) ,
              setSongLoop(false)
              } }
            src={isShuffle?shuf: Group}
          />
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
          <img
          className="s"
            onClick={handleLyricClick}
            src={!isPlaylistLoop&&!isShuffle&&isSongLoop?loop:isPlaylistLoop ? repeat1 : Repeat}
            
          />
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
        <div
          onClick={() => {
            setShareWindow(!shareWindow);
          }}
        >
          <img src={Share} />

          <div>Share </div>
        </div>
      </div>
      {shareWindow && !playlistWindow ? (
        <div className="shareWindow">
          <div>Share this song</div>
          <div>
            <div className="shareOption">
              <div className="shareSame">
                <img src={Whats}></img>
                <a
                  href={`whatsapp://send?text=${encodeURIComponent(
                    "http://localhost:5177/home"
                  )}`}
                  title="Share on WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
              <div className="shareSame">
                <img src={Inst}></img>
                <span>Instagram</span>
              </div>
            </div>
            <div
              onClick={() => {
                setPlaylistWindow(true);
              }}
              className="addOption"
            >
              <img src={add}></img>
              <div>Add to playList</div>
            </div>
          </div>
          <div className="linkShare">
            https://soundly.com/thehavanna....<div>Copy</div>
          </div>
        </div>
      ) : null}
      {playlistWindow ? (
        <div style={{ gap: "15px" }} className="shareWindow">
          <div>
            Add to playlist{" "}
            <img
              onClick={() => {
                setPlaylistWindow(false);
                setShareWindow(false);
              }}
              src={close}
            />
          </div>
          <div className="playlistContain">
            {playListData.map((playlist) => (
              <div
                style={
                  style && currentPlaylist == playlist.id
                    ? { borderRadius: 8, border: "1px solid #B2ACAC" }
                    : {}
                }
                className="playlistName"
                onClick={() => {
                  setStyle(true);
                  setCurrentPlaylist(playlist.id);
                }}
                key={playlist.id}
              >
                <img
                  src={playlist.thumbnail_url}
                  alt={`Thumbnail for ${playlist.name}`}
                />
                <div>
                  <div>{playlist.name}</div>
                  <div>{playlist.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="done" onClick={addSongHandler}>
            Done
          </div>
        </div>
      ) : null}
    </div>
  );
}

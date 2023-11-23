import Group from "../../../assets/shuffles.svg";
import Left from "../../../assets/Skip Back.svg";
import Right from "../../../assets/Group 12.svg";
import Repeat from "../../../assets/Group 14.svg";
import Continue from "../../../assets/medC.png";
import Line from "../../../assets/Line.svg";
import Rectangle from "../../../assets/Rectangle 14.svg";
import Heart from "../../../assets/Like button (1).svg";
import Share from "../../../assets/Share.svg";
import Pause from "../../../assets/Group 11.svg";
import React, { useEffect, useState, useContext, useRef } from "react";
import Heart2 from "../../../assets/Unlike.svg";
import axios from "../../../Api/auth";

import Inst from "../../../assets/Instagram.svg";
import Whats from "../../../assets/whatsa.svg";
import Snake from "../../../assets/snake.svg";
import close from "../../../assets/Close_LG.svg";
import add from "../../../assets/Add_Plus_Circle.svg";
import audioSync from 'audio-sync-with-text';



import { playBackContext } from "../../../App";

export default function MediaPlayer() {
  const [shareWindow, setShareWindow] = useState(false);
  const [playlistWindow, setPlaylistWindow] = useState(false);
  const [playListData, setPlayListData] = useState([]);
  const [style, setStyle] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const {
    setIsLeftClicked,
    setIsRightClicked,
    setCurrentSongIndex,
    playBackData,
    setPlayBackData,
    setNavData,
    setHome,
    isPlaying,
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
  let sync;
  // console.log(playBackData)
  
   
  useEffect(() => {
    const audio_sync = async () => {
      try {
        if (playBackData.lyrics_url) {
          console.log("Lyrics URL:", playBackData.lyrics_url);
  
          const response = await fetch(playBackData.lyrics_url);
          const srtContent = await response.text();
  
          const webVTTContent = `WEBVTT\n\n${srtContent.replace(/\d+\:\d+/g, match => match.replace(':', '.'))}`;
  
          console.log(webVTTContent )
          sync = new audioSync({
            audioPlayer: 'audio-element',
            subtitlesContainer: 'lyricData',
            subtitlesFile: new Blob([webVTTContent], { type: 'text/vtt' }),
          });
        }
      } catch (error) {
        console.error("Error during sync:", error);
      }
    };
  
    audio_sync();
  }, [playBackData.lyrics_url]);
  
  
 
 
  const token = JSON.parse(localStorage.getItem("authTok"));
  useEffect(() => {
    setIsLiked(playBackData.isLiked);
  }, [playBackData]);

  setHome(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setTotalDuration(audio.duration);
     if (sync) {
        sync.updateCurrentTime(audio.currentTime);
      }
    
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
  }, [playBackData.url, audio.src]);

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
  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentageClicked = (clickPosition / progressBar.clientWidth) * 100;
    const newCurrentTime = (percentageClicked / 100) * totalDuration;
    setCurrentTime(newCurrentTime);
    audio.currentTime = newCurrentTime;
  };
  useEffect(()=>{
    if(playlistWindow){
      const playListData = async ()=>{
        try{
        const response = await axios.get("playlists/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(response.data.success){
           setPlayListData(response.data.data)
           console.log(response.data.data)
        }
        }catch(error){
          console.log(error)
        }
      }
      playListData()
    }
     
     },[playlistWindow])
     const addSongHandler = async()=>{
      console.log(currentPlaylist)
      if(currentPlaylist!==null){
        try{
         const response = await  axios.post(`playlists/${currentPlaylist}/songs/${playBackData.id}/`,null,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        }
        catch(error){
   
        }
      }
     
     }

  return (
    <div className="mediaPlayer">
      <div className="mediaImage"></div>
      <div className="musicData">
        <div>
          <div>
            <div className="mediaText">
            <div>{playBackData.name.length > 14 ? playBackData.name.slice(0, 14) + '...' : playBackData.name}</div>
              <div>{playBackData.artist}</div>
            </div>
            <div>
              <img onClick={likedHandler} src={isLiked ? Heart : Heart2} />
            </div>
            <div onClick={() => {
            setShareWindow(!shareWindow);
          }}>
              <img src={Share} />
            </div>
          </div>
          <div>
            <img src={playBackData.thumbnail} />
          </div>
        </div>
        <div className="mediaControls">
          <div className="musicTimer">
            <div className="time-display"> {formatTime(currentTime)}</div>
            <div onClick={handleProgressBarClick} className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              ></div>
            </div>
            <div className="time-display"> {formatTime(totalDuration)}</div>
          </div>
          <div>
            <div>
              <img src={Group} />
            </div>
            <div className="mainControl">
              <div>
                <img
                  onClick={() => {
                    setIsLeftClicked(true);
                    
                  }}
                  src={Left}
                />
              </div>
              <div>
                <img
                  onClick={handlePlayPause}
                  src={isPlaying ? Continue : Pause}
                />
              </div>
              <div>
                <img
                  onClick={() => {
                   
                    setIsRightClicked(true);
                  
                  }}
                  src={Right}
                />
              </div>
            </div>
            <div>
              <img src={Repeat} />
            </div>
          </div>
          {playBackData.url ? (
            <audio id="audio-element">
              <source src={playBackData.url} type="audio/mpeg" />
            </audio>
          ) : null}
        </div>
      </div>
      <div className="lyricData" id="lyricData">
      
      </div>
      {shareWindow&&!playlistWindow?<div className="shareWindow">
        <div>Share this song</div>
        <div>
          <div className="shareOption">
            <div className="shareSame">
              <img src={Whats}></img>
    <a href={`whatsapp://send?text=${encodeURIComponent('http://localhost:5177/home')}`} title="Share on WhatsApp">
      WhatsApp
    </a>
            </div>
            <div className="shareSame">
              <img src={Inst}></img>
              <span>Instagram</span>
            </div>
          </div>
          <div onClick={()=>{
            setPlaylistWindow(true)

          }} className="addOption">
            <img src={add}></img>
            <div >Add to playList</div>
          </div>
        </div>
        <div className="linkShare">
          https://soundly.com/thehavanna....<div>Copy</div>
        </div>
      </div>:null} 
     {playlistWindow? <div style={{gap:"15px"}} className="shareWindow">
        <div>Add to playlist <img onClick={()=>{
          setPlaylistWindow(false)
          setShareWindow(false)
        }} src={close}/></div>
        <div className="playlistContain">
        {playListData.map((playlist) => (
  <div style={style&&currentPlaylist==playlist.id?{ borderRadius: 8, border: '1px solid #B2ACAC' } : {}} className="playlistName" onClick={()=>{
    console.log(playlist.id)
    setStyle(true)
      setCurrentPlaylist(playlist.id)}} key={playlist.id}>
    <img src={playlist.thumbnail_url} alt={`Thumbnail for ${playlist.name}`} />
    <div>
      <div>{playlist.name}</div>
      <div>{playlist.description}</div>
    </div>
  </div>
))}
         
       
        </div>

        <div className="done" onClick={addSongHandler}>Done</div>
      </div>:null}
    </div>
  );
}

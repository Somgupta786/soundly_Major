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
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

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
 const [matchingLyrics,setMatchingLyrics]= useState([])
  const lyricsData = [
    {
      "index": 1,
      "end": "00:00:00,000",
      "start": "00:00:00,000",
      "text": "by RentAnAdviser.com"
    },
    {
      "index": 2,
      "end": "00:00:00,000",
      "start": "00:00:00,000",
      "text": ""
    },
    {
      "index": 3,
      "end": "00:00:00,000",
      "start": "00:00:00,000",
      "text": "1"
    },
    {
      "index": 4,
      "end": "00:00:16,050",
      "start": "00:00:12,000",
      "text": "All smiles, I know what it"
    },
    {
      "index": 5,
      "end": "00:00:16,050",
      "start": "00:00:12,000",
      "text": "takes to fool this town"
    },
    {
      "index": 6,
      "end": "00:00:16,050",
      "start": "00:00:12,000",
      "text": ""
    },
    {
      "index": 7,
      "end": "00:00:16,050",
      "start": "00:00:12,000",
      "text": "2"
    },
    {
      "index": 8,
      "end": "00:00:21,600",
      "start": "00:00:16,100",
      "text": "I'll do it 'til the sun goes down"
    },
    {
      "index": 9,
      "end": "00:00:21,600",
      "start": "00:00:16,100",
      "text": "and all through the night time"
    },
    {
      "index": 10,
      "end": "00:00:21,600",
      "start": "00:00:16,100",
      "text": ""
    },
    {
      "index": 11,
      "end": "00:00:21,600",
      "start": "00:00:16,100",
      "text": "3"
    },
    {
      "index": 12,
      "end": "00:00:26,700",
      "start": "00:00:21,700",
      "text": "Oh yeah, oh yeah, I'll tell"
    },
    {
      "index": 13,
      "end": "00:00:26,700",
      "start": "00:00:21,700",
      "text": "you what you wanna hear"
    },
    {
      "index": 14,
      "end": "00:00:26,700",
      "start": "00:00:21,700",
      "text": ""
    },
    {
      "index": 15,
      "end": "00:00:26,700",
      "start": "00:00:21,700",
      "text": "4"
    },
    {
      "index": 16,
      "end": "00:00:29,400",
      "start": "00:00:26,800",
      "text": "Leave my sunglasses on"
    },
    {
      "index": 17,
      "end": "00:00:29,400",
      "start": "00:00:26,800",
      "text": "while I shed a tear"
    },
    {
      "index": 18,
      "end": "00:00:29,400",
      "start": "00:00:26,800",
      "text": ""
    },
    {
      "index": 19,
      "end": "00:00:29,400",
      "start": "00:00:26,800",
      "text": "5"
    },
    {
      "index": 20,
      "end": "00:00:34,100",
      "start": "00:00:29,500",
      "text": "It's never the right time, yeah, yeah"
    },
    {
      "index": 21,
      "end": "00:00:34,100",
      "start": "00:00:29,500",
      "text": ""
    },
    {
      "index": 22,
      "end": "00:00:34,100",
      "start": "00:00:29,500",
      "text": "6"
    },
    {
      "index": 23,
      "end": "00:00:39,500",
      "start": "00:00:34,200",
      "text": "I put my armor on, show you"
    },
    {
      "index": 24,
      "end": "00:00:39,500",
      "start": "00:00:34,200",
      "text": "how strong how I am"
    },
    {
      "index": 25,
      "end": "00:00:39,500",
      "start": "00:00:34,200",
      "text": ""
    },
    {
      "index": 26,
      "end": "00:00:39,500",
      "start": "00:00:34,200",
      "text": "7"
    },
    {
      "index": 27,
      "end": "00:00:45,400",
      "start": "00:00:39,600",
      "text": "I put my armor on, I'll"
    },
    {
      "index": 28,
      "end": "00:00:45,400",
      "start": "00:00:39,600",
      "text": "show you that I am"
    },
    {
      "index": 29,
      "end": "00:00:45,400",
      "start": "00:00:39,600",
      "text": ""
    },
    {
      "index": 30,
      "end": "00:00:45,400",
      "start": "00:00:39,600",
      "text": "8"
    },
    {
      "index": 31,
      "end": "00:00:48,100",
      "start": "00:00:45,500",
      "text": "I'm unstoppable"
    },
    {
      "index": 32,
      "end": "00:00:48,100",
      "start": "00:00:45,500",
      "text": ""
    },
    {
      "index": 33,
      "end": "00:00:48,100",
      "start": "00:00:45,500",
      "text": "9"
    },
    {
      "index": 34,
      "end": "00:00:51,200",
      "start": "00:00:48,200",
      "text": "I'm a Porsche with no brakes"
    },{
      "index": 35,
      "end": "00:00:51,200",
      "start": "00:00:48,200",
      "text": ""
    },
    {
      "index": 36,
      "end": "00:00:51,200",
      "start": "00:00:48,200",
      "text": "10"
    },
    {
      "index": 37,
      "end": "00:00:53,500",
      "start": "00:00:51,300",
      "text": "I'm invincible"
    },
    {
      "index": 38,
      "end": "00:00:53,500",
      "start": "00:00:51,300",
      "text": ""
    },
    {
      "index": 39,
      "end": "00:00:53,500",
      "start": "00:00:51,300",
      "text": "11"
    },
    {
      "index": 40,
      "end": "00:00:56,800",
      "start": "00:00:53,600",
      "text": "Yeah, I win every single game"
    },
    {
      "index": 41,
      "end": "00:00:56,800",
      "start": "00:00:53,600",
      "text": ""
    },
    {
      "index": 42,
      "end": "00:00:56,800",
      "start": "00:00:53,600",
      "text": "12"
    },
    {
      "index": 43,
      "end": "00:00:59,200",
      "start": "00:00:56,900",
      "text": "I'm so powerful"
    },
    {
      "index": 44,
      "end": "00:00:59,200",
      "start": "00:00:56,900",
      "text": ""
    },
    {
      "index": 45,
      "end": "00:00:59,200",
      "start": "00:00:56,900",
      "text": "13"
    },
    {
      "index": 46,
      "end": "00:01:02,200",
      "start": "00:00:59,300",
      "text": "I don't need batteries to play"
    },
    {
      "index": 47,
      "end": "00:01:02,200",
      "start": "00:00:59,300",
      "text": ""
    },
    {
      "index": 48,
      "end": "00:01:02,200",
      "start": "00:00:59,300",
      "text": "14"
    },
    {
      "index": 49,
      "end": "00:01:07,700",
      "start": "00:01:02,300",
      "text": "I'm so confident, yeah,"
    },
    {
      "index": 50,
      "end": "00:01:07,700",
      "start": "00:01:02,300",
      "text": "I'm unstoppable today"
    },
    {
      "index": 51,
      "end": "00:01:07,700",
      "start": "00:01:02,300",
      "text": ""
    },
    {
      "index": 52,
      "end": "00:01:07,700",
      "start": "00:01:02,300",
      "text": "15"
    },
    {
      "index": 53,
      "end": "00:01:13,400",
      "start": "00:01:07,800",
      "text": "Unstoppable today, unstoppable today"
    },
   
  ]
   
  // useEffect(() => {
  //   const audio_sync = async () => {
  //     try {
  //       if (playBackData.lyrics_url) {
  //         console.log("Lyrics URL:", playBackData.lyrics_url);
  
  //         const response = await fetch(playBackData.lyrics_url);
  //         const srtContent = await response.text();
  
  //         const webVTTContent = `WEBVTT\n\n${srtContent.replace(/\d+\:\d+/g, match => match.replace(':', '.'))}`;
  
  //         console.log(webVTTContent )
  //         sync = new audioSync({
  //           audioPlayer: 'audio-element',
  //           subtitlesContainer: 'lyricData',
  //           subtitlesFile: new Blob([webVTTContent], { type: 'text/vtt' }),
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error during sync:", error);
  //     }
  //   };
  
  //   audio_sync();
  // }, [playBackData.lyrics_url]);
  useEffect(() => {
    setMatchingLyrics(
      lyricsData
        .filter(
          (entry) => entry.text.trim() !== "" && !/^\d+$/.test(entry.text)
        )
        .filter((entry) => {
          const [startHours, startMinutes, startSeconds] = entry.start.split(":").map(parseFloat);
          const startMilliseconds = parseFloat(entry.start.split(",")[1]);
          const [endHours, endMinutes, endSeconds] = entry.end.split(":").map(parseFloat);
          const endMilliseconds = parseFloat(entry.end.split(",")[1]);
    
          const start = startHours * 3600 + startMinutes * 60 + startSeconds + startMilliseconds / 1000;
          const end = endHours * 3600 + endMinutes * 60 + endSeconds + endMilliseconds / 1000;
    
          return currentTime >= start && currentTime <= end;
        })
    );
    if (matchingLyrics.length > 0) {
      const highlightedIndex = matchingLyrics[matchingLyrics.length - 1].index;
      const lyricElement = document.getElementById(`lyric-${highlightedIndex}`);
  
      if (lyricElement) {
        lyricElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      console.log(lyricElement)
    }
    console.log(matchingLyrics);
  
    // You can decide how to handle the matching lyrics array here.
    // For example, you can highlight all of them or do any other specific action.
    // setCurrentLyricIndex(matchingLyrics.map((entry) => entry.index));
  
  }, [currentTime]);
  
 
 
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
    //  if (sync) {
    //     sync.updateCurrentTime(audio.currentTime);
    //   }
    
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
      <div className="lyricData" >
  {lyricsData.map((entry, index) => (
  index!==0 && !/^\d+$/.test(entry.text) ?   <p
  
  id={`lyric-${entry.index}`} 
  key={index}
  style={{
    
  display:"block",
    color: matchingLyrics.some(match => match.index === entry.index) ? '#fff' : '#898989',
  }}
>
    {entry.text}
</p>:null
   
  ))}
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

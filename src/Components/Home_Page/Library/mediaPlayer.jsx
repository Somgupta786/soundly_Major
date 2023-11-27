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
import audioSync from "audio-sync-with-text";
import Repeat1 from "../../../assets/Repeat (1)med.svg";
import Shuf from "../../../assets/medShuf.svg";
import loop from "../../../assets/mloop.svg";
import down from "../../../assets/Down arrow.svg";
import { useNavigate } from "react-router-dom";

import { playBackContext } from "../../../App";

export default function MediaPlayer() {
 
  const [shareWindow, setShareWindow] = useState(false);
  const [playlistWindow, setPlaylistWindow] = useState(false);
  const [playListData, setPlayListData] = useState([]);
  const [style, setStyle] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  const {
    isSongLoop,
    setSongLoop,
    clickCount,
    setClickCount,
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

  const [matchingLyrics, setMatchingLyrics] = useState([]);
  const [lyricsData, setLyricsData] = useState([]);
  console.log(playBackData.lyrics_url);
 
  useEffect(()=>{
    console.log("k")
    if(playBackData.lyrics_url!==null){
      console.log("j")
      setLyricsData(playBackData.lyrics_url)
    }
    else{
      console.log("l")
      setLyricsData([])
    }
   
  },[playBackData])
  

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
    if(lyricsData&&lyricsData.length>0){
      setMatchingLyrics(
        lyricsData
          .filter(
            (entry) => entry.text.trim() !== "" && !/^\d+$/.test(entry.text)
          )
          .filter((entry) => {
            const [startHours, startMinutes, startSeconds] = entry.start
              .split(":")
              .map(parseFloat);
            const startMilliseconds = parseFloat(entry.start.split(",")[1]);
            const [endHours, endMinutes, endSeconds] = entry.end
              .split(":")
              .map(parseFloat);
            const endMilliseconds = parseFloat(entry.end.split(",")[1]);
  
            const start =
              startHours * 3600 +
              startMinutes * 60 +
              startSeconds +
              startMilliseconds / 1000;
            const end =
              endHours * 3600 +
              endMinutes * 60 +
              endSeconds +
              endMilliseconds / 1000;
  
            return currentTime >= start && currentTime <= end;
          })
      );
      if (matchingLyrics.length > 0) {
        const highlightedIndex = matchingLyrics[matchingLyrics.length - 1].index;
        const lyricElement = document.getElementById(`lyric-${highlightedIndex}`);
  if(!isPhone){
    if (lyricElement) {
      lyricElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
        
      }
    }
    

  
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
    if ((playBackData.url && playBackData.url !== audio.src) || isSongLoop) {
      console.log(audio);
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
          playBackData.isLiked = !isLiked;
          console.log(!isLiked);
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
          playBackData.isLiked = !isLiked;
          setIsLiked(!isLiked);
          console.log(!isLiked);
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
      } catch (error) {}
    }
  };
  const handleLyricClick = () => {
    console.log(clickCount);
    if (clickCount === 0) {
      Object.keys(playBackData).length === 0
        ? null
        : (setPlaylistLoop(!isPlaylistLoop),
        setSongLoop(false),
          setShuffle(false),
          setClickCount((prevClickCount) => prevClickCount + 1));
    } else if (clickCount === 1) {
      Object.keys(playBackData).length === 0
        ? null
        : (setSongLoop(true),
          setPlaylistLoop(false),
          setShuffle(false),
          setClickCount((prevClickCount) => prevClickCount + 1));
    } else if (clickCount === 2) {
      Object.keys(playBackData).length === 0
        ? null
        : (setSongLoop(false),
          setPlaylistLoop(false),
          setShuffle(false),
          setClickCount((prevClickCount) => prevClickCount - 2));
    }

    // Increment the click count
  };
  const navigate = useNavigate();
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const handleViewportChange = () => {
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      setIsPhone(viewportWidth <= 800);
    };

    const mediaQueryList = window.matchMedia("(max-width: 800px)");
    handleViewportChange(); 
    mediaQueryList.addEventListener("change", handleViewportChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleViewportChange);
    };
  }, []);




  return !isPhone ? (
    <div className="mediaPlayer">
      <div className="mediaImage"></div>
      <div className="musicData">
        <div>
          <div>
            <div className="mediaText">
              <div>
                {playBackData.name&&playBackData.name.length > 14
                  ? playBackData.name.slice(0, 14) + "..."
                  : playBackData.name}
              </div>
              <div>{playBackData.artist}</div>
            </div>
            <div>
              <img
                className="btn"
                onClick={likedHandler}
                src={isLiked ? Heart : Heart2}
              />
            </div>
            <div
              className="btn"
              onClick={() => {
                setShareWindow(!shareWindow);
              }}
            >
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
          <div className="btn">
            <div>
              <img
                onClick={() => {
                  Object.keys(playBackData).length === 0
                    ? null
                    : setShuffle(!isShuffle);
                  setPlaylistLoop(false);
                }}
                src={isShuffle ? Shuf : Group}
              />
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
              <img
                onClick={handleLyricClick}
                src={
                  !isPlaylistLoop && !isShuffle && isSongLoop
                    ? loop
                    : isPlaylistLoop
                    ? Repeat1
                    : Repeat
                }
              />
            </div>
          </div>
          {playBackData.url ? (
            <audio id="audio-element">
              <source src={playBackData.url} type="audio/mpeg" />
            </audio>
          ) : null}
        </div>
      </div>
      <div className="lyricData">
       {lyricsData?<>{lyricsData.map((entry, index) =>
          index !== 0 && !/^\d+$/.test(entry.text) ? (
            <p
              id={`lyric-${entry.index}`}
              key={index}
              style={{
                display: "block",
                color: matchingLyrics.some(
                  (match) => match.index === entry.index
                )
                  ? "#fff"
                  : "#898989",
              }}
            >
              {entry.text}
            </p>
          ) : null
        )}</>:null} 
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
          <div className="btn">
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
                className="playlistName btn"
                onClick={() => {
                  console.log(playlist.id);
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

          <div className="done btn" onClick={addSongHandler}>
            Done
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="mediaPlayer">
    <div className="mediaData">
    <div className="phoneRef btn">
        <img onClick={()=>navigate("/home")} src={down}></img>
        <div>Playing {playBackData.name}</div>
        <div
              className="btn"
              onClick={() => {
                setShareWindow(!shareWindow);
              }}
            >
              <img src={Share} />
            </div>
      </div>
      <div className="phoneLyr">
        <img src={playBackData.thumbnail} />
        <div className="lyricsData">
         {lyricsData&&lyricsData.length>0?<> {lyricsData.map((entry, index) =>
            index !== 0 && !/^\d+$/.test(entry.text) ? (
              <p
                id={`lyric-${entry.index}`}
                key={index}
                style={{
                  display: "block",
                  color: matchingLyrics.some(
                    (match) => match.index === entry.index
                  )
                    ? "#000"
                    : "#6A6A6A",
                }}
              >
                {entry.text}
              </p>
            ) : null
          )}</>:null}
        </div>
      </div>
      <div className="mediaFooter">
        <div className="mediaText">
        <div><div>
            {playBackData.name.length > 14
              ? playBackData.name.slice(0, 14) + "..."
              : playBackData.name}
          </div>
          <div>{playBackData.artist}</div></div>
          
          <div>
              <img
                className="btn"
                onClick={likedHandler}
                src={isLiked ? Heart : Heart2}
              />
            </div>
        </div>
        <div className="mediaControls">
          <div className="musicTimer">
            <div style={{display:"flex"}} className="time-display"> {formatTime(currentTime)}</div>
            <div style={{position:"static"}} onClick={handleProgressBarClick} className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              ></div>
            </div>
            <div style={{display:"flex"}}  className="time-display"> {formatTime(totalDuration)}</div>
          </div>
          <div className="btn">
            
              <img
                onClick={() => {
                  Object.keys(playBackData).length === 0
                    ? null
                    : setShuffle(!isShuffle);
                  setPlaylistLoop(false);
                }}
                src={isShuffle ? Shuf : Group}
              />
            
           
              
                <img
                  onClick={() => {
                    setIsLeftClicked(true);
                  }}
                  src={Left}
                />
             
              
                <img
                  onClick={handlePlayPause}
                  src={isPlaying ? Continue : Pause}
                />
             
              
                <img
                  onClick={() => {
                    setIsRightClicked(true);
                  }}
                  src={Right}
                />
              
           
            
              <img
                onClick={handleLyricClick}
                src={
                  !isPlaylistLoop && !isShuffle && isSongLoop
                    ? loop
                    : isPlaylistLoop
                    ? Repeat1
                    : Repeat
                }
              />
          
          </div>
          {playBackData.url ? (
            <audio id="audio-element">
              <source src={playBackData.url} type="audio/mpeg" />
            </audio>
          ) : null}
        </div>
      </div>
    </div>
      

     
    </div>
  );
}

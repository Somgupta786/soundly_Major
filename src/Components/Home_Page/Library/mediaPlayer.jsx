import Group from "../../../assets/shuffles.svg";
import Left from "../../../assets/Skip Back.svg";
import Right from "../../../assets/Group 12.svg";
import Repeat from "../../../assets/Group 14.svg";
import Continue from "../../../assets/mediaCon.svg";
import Line from "../../../assets/Line.svg";
import Rectangle from "../../../assets/Rectangle 14.svg";
import Heart from "../../../assets/Like button (1).svg";
import Share from "../../../assets/Share.svg";
import Pause from "../../../assets/Group 11.svg";
import React, { useEffect, useState, useContext, useRef } from "react";
import Heart2 from "../../../assets/Unlike.svg";
import axios from "../../../Api/auth";

import { playBackContext } from "../../../App";

export default function MediaPlayer() {
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

  return (
    <div className="mediaPlayer">
      <div className="mediaImage"></div>
      <div className="musicData">
        <div>
          <div>
            <div className="mediaText">
              <div>{playBackData.name}</div>
              <div>{playBackData.artist}</div>
            </div>
            <div>
              <img onClick={likedHandler} src={isLiked ? Heart : Heart2} />
            </div>
            <div>
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
      <div className="lyricData">
        We could leave the Christmas lights up 'til JanuaryThis is our place, we
        make the rulesAnd there's a dazzling haze, a mysterious way about you,
        dearHave I known you twenty seconds or twenty years?Can I go where you
        go?Can we always be this close forever and ever?And ah, take me out and
        take me homeYou're my, my, my, myLoverWe could let our friends crash in
        the living roomThis is our place, we make the callAnd I'm highly
        suspicious that everyone who sees you wants youI've loved you three
        summers now, honey, but I want 'em allCan I go where you go?Can we
        always be this close forever and ever?And ah, take me out and take me
        home (Forever and ever)You're my, my, my, myLoverLadies and gentlemen,
        will you please stand?With every guitar string scar on my handI take
        this magnetic force of a man to be myLoverMy heart's been borrowed and
        yours has been blueAll's well that ends well to end up with youSwear to
        be over-dramatic and true to myLoverAnd you'll save all your dirtiest
        jokes for meAnd at every table, I'll save you a seatLoverCan I go where
        you go?Can we always be this close forever and ever?And ah, take me out
        and take me home (Forever and ever)You're my, my, my, myOh, you're my,
        my, my, myDarling, you're my, my, my, myLover
      </div>
    </div>
  );
}

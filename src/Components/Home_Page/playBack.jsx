import Group from "../../assets/Group.svg";
import Left from "../../assets/Left.svg";
import Right from "../../assets/Right.svg";
import Repeat from "../../assets/Repeat.svg";
import Continue from "../../assets/Continue.svg";
import Line from "../../assets/Line.svg";
import Rectangle from "../../assets/Rectangle 14.svg";
import Heart from "../../assets/HeartPlay.svg";
import Share from "../../assets/Share.svg";
import Pause from "../../assets/Ellipse 9.svg";
import React, { useEffect, useState } from "react";

export default function Playback(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [audio, setAudio] = useState(new Audio());

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      setTotalDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener("timeupdate");
    };
  }, [audio]);

  useEffect(() => {
    if (props.url) {
      audio.pause(); // Pause the audio before changing the source.
      audio.src = props.url; // Update the source.
      audio.load(); // Load the new audio source.
      audio.play(); // Play the new audio.
    } else {
      audio.pause(); // Pause the audio if there is no source.
    }

    setIsPlaying(true); // Set the playing state to true when starting a new song.
  }, [props.url]);

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

  return (
    <div className="playBack">
      <div>
        {props.thumbnail && <img src={props.thumbnail} />}
        <div>{props.name}</div>
      </div>
      <div>
        <div className="controls">
          <img src={Group} />
          <img src={Left} />
          <img onClick={handlePlayPause} src={isPlaying ? Pause : Continue} />
          <img src={Right} />
          <img src={Repeat} />
        </div>
        <div className="musicTimer">
        <div className="time-display"> {formatTime(currentTime)}</div>
        <div className="progress-bar">
        
       
          <div className="progress-fill" style={{ width: `${(currentTime / totalDuration) * 100}%` }}></div>
          
        </div>
        <div className="time-display">  {formatTime(totalDuration)}</div>
        </div>
        
      
      </div>
      <div className="Share">
        <div>
          <img src={Heart} />
        </div>
        <div>
          <img src={Share} />
          <div>Share</div>
        </div>
      </div>
    </div>
  );
}

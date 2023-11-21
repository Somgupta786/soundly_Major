import React, { useState,useContext, useEffect } from 'react';
import Pause from "../../assets/imgPause.svg";
import Continue from "../../assets/pause.svg";
import { playBackContext } from '../../App';
export default function ImgCard(props) {
 
  const [hover, setHover] = useState(false);
  const{playBackData,currentSongIndex,isLeftClicked,setIsLeftClicked,currentSongSection,setHome,setMedia,isPlaying,isRightClicked,setIsRightClicked, setIsPlaying,isLiked, setIsLiked,currentTime, setCurrentTime,totalDuration, setTotalDuration,audio, setAudio}=useContext(playBackContext)
  const handleImgCardClick = () => {

    
    if (props.onClick) {
      props.onClick();
    }
  };
  
  return (
    <div
      style={hover || isPlaying&&playBackData.id===props.id ? { background: "#2D2D31" } : null}
      className="imgCard"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={async ()=>{
      
      handleImgCardClick()
      
        setMedia(true)
      }}
    >
      <div>
        <div className="songImage" >
        {/* {((isRightClicked||isLeftClicked)&&currentSongIndex==props.index&&props.section==currentSongSection)?handleImgCardClick():null} */}
          <img src={props.img} alt={props.name} />
        </div>
        <div className="songName">{props.name}</div>
      </div>
      {hover|| isPlaying&&playBackData.id===props.id ? (
        <img
         onClick={(event)=>{
          event.stopPropagation();
          handleImgCardClick();
         }}
          src={isPlaying&&playBackData.id===props.id?Continue:Pause }
         
        />
      ) : null}
    </div>
  );
}

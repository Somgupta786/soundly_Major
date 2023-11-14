import React, { useState,useContext } from 'react';
import Pause from "../../assets/imgPause.svg";
import Continue from "../../assets/pause.svg";
import { playBackContext } from '../../App';
export default function ImgCard(props) {
  const [hover, setHover] = useState(false);
  const{setPlayBackData,setNavData,setHome,setMedia,setMediaData}=useContext(playBackContext);
  const handleImgCardClick = () => {
    
  

    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div
      style={hover ? { background: "#2D2D31" } : null}
      className="imgCard"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={()=>{handleImgCardClick
        setMedia(true)
      }}
    >
      <div>
        <div className="songImage">
          <img src={props.img} alt={props.name} />
        </div>
        <div className="songName">{props.name}</div>
      </div>
      {hover ? (
        <img
          onClick={handleImgCardClick}
          src={   Pause }
         
        />
      ) : null}
    </div>
  );
}

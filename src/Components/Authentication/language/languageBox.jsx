import React, { useState } from 'react';

import { playBackContext } from "../../../App";
import { useContext } from "react";

export default function LanguageBox(props) {
  const{setFavLanguage}=useContext(playBackContext)
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setFavLanguage((prevArray) => [...prevArray, props.title]);
    } else {
      setFavLanguage((prevArray) => prevArray.filter((name) => name !== props.title));
    }
    setIsClicked(!isClicked);
  };

  const boxStyle = {
    backgroundColor: isClicked ? '#C76B98' : 'white',
    cursor: 'pointer',
  };

  return (
    <div className="languageLable" style={boxStyle} onClick={handleClick}>
      {props.title}
    </div>
    
  );
}

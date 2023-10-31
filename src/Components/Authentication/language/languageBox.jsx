import React, { useState } from 'react';

export default function LanguageBox(props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
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

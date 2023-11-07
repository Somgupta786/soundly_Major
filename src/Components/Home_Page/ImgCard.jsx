import React from 'react';

export default function ImgCard(props) {
   
  const handleImgCardClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div className="imgCard" onClick={handleImgCardClick}>
      <div>
        <div className="songImage">
          <img src={props.img} />
        </div>
        <div className="songName">{props.name}</div>
      </div>
    </div>
  );
}

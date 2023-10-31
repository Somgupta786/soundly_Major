import { useState } from "react";

export default function ArtistCard(prop) {
    const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const boxStyle = {
    borderRadius: isClicked ? '126px' : null,
    border: isClicked ? '5px solid #C76B98' : null,
  };
  
    return(
        <div className="artistImageCard" onClick={handleClick}>
            <div className="artistImage" ><img style={boxStyle}  src={prop.img}></img></div>
            <div className="artistName">{prop.name}</div>
        </div>
    )
}
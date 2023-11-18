import { useState } from "react";
import { playBackContext } from "../../../App";
import { useContext } from "react";
export default function ArtistCard(prop) {
  const{setFavArt}=useContext(playBackContext)
    const [isClicked, setIsClicked] = useState(false);
    

    const handleClick = () => {
      if (!isClicked) {
        setFavArt((prevArray) => [...prevArray, prop.name]);
      } else {
        setFavArt((prevArray) => prevArray.filter((name) => name !== prop.name));
      }
      setIsClicked(!isClicked);
    };
  
    

  const boxStyle = {
    // borderRadius: isClicked ? '5.1vw' : null,
    border: isClicked ? '4px solid #C76B98' : null,
  };
  
    return(
        <div className="artistImageCard" onClick={handleClick}>
            <div className="artistImage" style={boxStyle} ><img src={prop.img}></img></div>
            <div className="artistName">{prop.name}</div>
        </div>
    )
}
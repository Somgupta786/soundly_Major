import ArtistCard from "./artistCard";
import Ellipse3 from "../../../assets/Arijit.png"
import img2 from "../../../assets/Neha.png"
import new1 from "../../../assets/darshan.png"
import img4  from "../../../assets/bhanu.png"
import new2 from "../../../assets/badshah.png"
import img6 from "../../../assets/honey.png"
import { useNavigate } from "react-router-dom";
import { playBackContext } from "../../../App";
import axios from "../../../Api/auth"
import { useContext } from "react";

export default function SelectArtist(){
  const token = JSON.parse(localStorage.getItem('authTok'));
  const{setFavArt,favArt}=useContext(playBackContext)
  console.log(favArt)
  const Navigation = useNavigate()
  const clickHandler = async () => {
    
    try {
      const response = await axios.post("favourite/artist/", {
        artist_names: favArt,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if(response.data.success){
      Navigation("/home")
    }
     
    
    } catch (error) {
      
      console.error("Error:", error);
    }
  };
  
return(
   
    <div className="artistCard">
      <div className="artistFrame">
          <div className="artistText">
          Which artist you love to listen?
          </div> 
          <div className="artistBoxFrame">
              <div className="firstRow">
                 <ArtistCard  img={Ellipse3} name="Arijit Singh"/> 
                 <ArtistCard img={img2} name="Neha Kakkar" /> 
                 <ArtistCard  img={new2} name="Badshah"/> 
              </div>
              <div className="secondRow">
                <ArtistCard  img={img4} name="Dhvani Bhanushali"/> 
                 <ArtistCard img={new1} name="Darshan Raval" /> 
                 <ArtistCard img={img6} name="Honey Singh"/> 
              </div>
          </div>
          
      </div>
      <div className="skipArtist" onClick={clickHandler}>{favArt.length==0? "Skip":"Next"}</div>
    </div>
  
);
}
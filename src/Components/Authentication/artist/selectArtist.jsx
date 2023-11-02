import ArtistCard from "./artistCard";
import Ellipse3 from "../../../assets/Arijit.png"
import img2 from "../../../assets/Neha.png"
import new1 from "../../../assets/darshan.png"
import img4  from "../../../assets/bhanu.png"
import new2 from "../../../assets/badshah.png"
import img6 from "../../../assets/honey.png"
import { useNavigate } from "react-router-dom";


export default function SelectArtist(){
  const Navigation = useNavigate()
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
      <div className="skipArtist" onClick={() => Navigation('/home')}>Skip</div>
    </div>
  
);
}
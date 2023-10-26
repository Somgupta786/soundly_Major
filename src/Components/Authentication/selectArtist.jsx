import ArtistCard from "./artistCard";
import Ellipse3 from "../../assets/Ellipse 3.svg"
import img2 from "../../assets/img2.svg"
import new1 from "../../assets/new1.svg"
import img4  from "../../assets/img4.svg"
import new2 from "../../assets/new2.svg"
import img6 from "../../assets/img6.svg"
import { useState } from "react";


export default function SelectArtist(){
  
return(
    <div className="mainContent">
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
    </div>
  </div>
);
}
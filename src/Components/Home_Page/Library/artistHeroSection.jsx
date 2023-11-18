
import Footer from "../Footer";

import ImgCard from "../ImgCard";
import imge1 from "../../../assets/Rectangle 8 (1).png";
import imge3 from "../../../assets/Rectangle 8 (2).png";
import imge4 from "../../../assets/Rectangle 8 (3).png";
import imge5 from "../../../assets/Rectangle 8 (4).png";
import imge6 from "../../../assets/Rectangle 8 (2).png";
import { playBackContext } from "../../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function ArtistHeroSection() {
  const Navigation=useNavigate()
  const{favArt}=useContext(playBackContext)
  return (
    <div className="heroSection">
     
      
      <div className="imageCards">
      <div className="homeText">
        <div>From artist you follow </div> 
        <div> Show more</div>
      </div>
      <div className="homeFirstRow">
       <ImgCard img ={imge1} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge3} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge4} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge5} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge6} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
      </div>
      <div className="homeLastRow">
      <ImgCard img ={imge1} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge3} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge4} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge5} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge6} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
      </div>
      </div>
      <div className="imageCards">
      <div className="homeText">
        <div>Listen to your favorite artist </div> 
        <div> Show more</div>
      </div>
      <div className="homeFirstRow">
      {favArt.map((name)=> <ImgCard  onClick={() => Navigation("/favouriteArtistSongs",{state:name})}   img ={imge1} name ={name}/>)}
      
       {/* <ImgCard img ={imge3} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge4} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge5} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/>
       <ImgCard img ={imge6} name ="Taylor Swift, Simon Louis, Harsh, Tejash.."/> */}
      </div>
      
      </div>
     
     <div className="footer"><Footer/> </div>
     

    
     
      
    </div>
  );
}

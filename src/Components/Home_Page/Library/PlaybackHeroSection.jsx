
import Footer from "../Footer";

import ImgCard from "../ImgCard";
import imge1 from "../../../assets/Rectangle 8 (1).png";
import imge3 from "../../../assets/Rectangle 8 (2).png";
import imge4 from "../../../assets/Rectangle 8 (3).png";
import imge5 from "../../../assets/Rectangle 8 (4).png";
import imge6 from "../../../assets/Rectangle 8 (2).png";
import Group from "../../../assets/Group 9.svg";
export default function PlaybackHeroSection() {
  
  return (
    <div className="heroSection">
     
      
      <div className="imageCards">
      <div className="homeText">
        <div>Playlist </div> 
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
      <ImgCard img ={Group} name ="Create Playlist"/>
       
      </div>
      </div>
     
     <div className="footer"><Footer/> </div>
     

    
     
      
    </div>
  );
}

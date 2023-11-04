import Card from "./Card";
import Footer from "./Footer";
import Playback from "./playBack";

import imge2 from "../../assets/image 2.svg";
import ImgCard from "./ImgCard";
import imge1 from "../../assets/Rectangle 8 (1).png";
import imge3 from "../../assets/Rectangle 8 (2).png";
import imge4 from "../../assets/Rectangle 8 (3).png";
import imge5 from "../../assets/Rectangle 8 (4).png";
import imge6 from "../../assets/Rectangle 8 (2).png";
export default function HeroSection() {
  const styleBox = {
    background:
      "linear-gradient(180deg, rgba(255, 243, 249, 0.97) 0%, #F39AC6 137.12%)",
  };
  return (
    <div className="heroSection">
      <div className="slider" style={styleBox}>
        <Card color="Pink" title="The Solitude" img={imge2} />
      </div>
      
      <div className="imageCards">
      <div className="homeText">
        <div>FOR YOU </div> 
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
     
     <div className="footer"><Footer/> </div>
     

    
     
      
    </div>
  );
}

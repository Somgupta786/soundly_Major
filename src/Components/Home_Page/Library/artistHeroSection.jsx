
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
import { useEffect } from "react";
import axios from "../../../Api/auth";
export default function ArtistHeroSection() {
  const token = JSON.parse(localStorage.getItem('authTok'));
  const { setPlayBackData, setNavData, setHome, favArt,setFavArt } = useContext(playBackContext);
  const Navigation=useNavigate()
  useEffect(()=>{
    const menuHandler = async()=>{
        try{
         const response = await axios.get("favourite/artist/",{
   
           headers: {
             Authorization: `Bearer ${token}`
           }
         })
         if(response.data.success){
           setFavArt(response.data.data)
           console.log(response.data.data)
         }
        }
        catch(error){
   console.log(error)
        }
    }
    menuHandler()
   },[])
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
      {favArt.map((name)=> <ImgCard  onClick={() => Navigation("/favouriteArtistSongs",{state:name.name})}   img ={name.thumbnail_url} name ={name.name}/>)}
      
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

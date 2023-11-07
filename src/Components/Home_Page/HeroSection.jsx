import Card from "./Card";
import Footer from "./Footer";
import Playback from "./playBack";

import imge2 from "../../assets/image 2.svg";
import Soltitude from "../../assets/green-colors-green-art 1.png";
import Property from "../../assets/image 28.png";

import ImgCard from "./ImgCard";
import imge1 from "../../assets/Rectangle 8 (1).png";
import imge3 from "../../assets/Rectangle 8 (2).png";
import imge4 from "../../assets/Rectangle 8 (3).png";
import imge5 from "../../assets/Rectangle 8 (4).png";
import imge6 from "../../assets/Rectangle 8 (2).png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HeroSection() {
  const styleBox = {
    background:
      "linear-gradient(180deg, rgba(255, 243, 249, 0.97) 0%, #F39AC6 137.12%)",
  };
  const styleBox2 = {
    background:
      "linear-gradient(180deg, rgba(243, 244, 255, 0.97) 0%, #9A9EF3 137.12%)",
  };
  const styleBox3 = {
    background:
      "linear-gradient(180deg, rgba(243, 255, 244, 0.97) 0%, #9AF3A3 137.12%)",
  };
  const [cardInfo, setCardInfo] = useState([
    { color: "#C76B98", title: "The Havanna", img: imge2, style: styleBox },
    {
      color: "#4E6CB9",
      title: "The Soltitude",
      img: Property,
      style: styleBox2,
    },
    {
      color: "#518C3D",
      title: "The Wanderlust",
      img: Soltitude,
      style: styleBox3,
    },
  ]);
  const [showCard, setShowCard] = useState(cardInfo[0]);
  const [cardIndex, setCardIndex] = useState(0);
  const authToken=JSON.parse(localStorage.getItem('authToken'));

  useEffect(() => {
    const cardInterval = setInterval(() => {
      setCardIndex((prevIndex) => (prevIndex + 1) % cardInfo.length);
    }, 1800);

    return () => clearInterval(cardInterval);
  }, [cardInfo]);

  

  useEffect(() => {
    setShowCard(cardInfo[cardIndex]);
  }, [cardIndex, cardInfo]);


  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const url = 'https://test-mkcw.onrender.com/api/allpublicsongs/';
        // const headers = {
        //     Authorization: `Bearer ${authToken}`,
        // };

        
        const response = await axios.get(url);

        if (response.data.success) {
            
          const songs = response.data.data; 
          console.log('Fetched songs:', songs);
        } else {
          console.error('Failed to fetch songs.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="heroSection">
      <div className="slider" style={showCard.style}>
        <Card
          color={showCard.color}
          title={showCard.title}
          img={showCard.img}
        />
        <div className="dots">
          <div
            style={
              cardIndex === 0
                ? { background: showCard.color }
                : { background: "grey" }
            }
          ></div>
          <div
            style={
              cardIndex === 1
                ? { background: showCard.color }
                : { background: "grey" }
            }
          ></div>
          <div
            style={
              cardIndex === 2
                ? { background: showCard.color }
                : { background: "grey" }
            }
          ></div>
        </div>
      </div>

      <div className="imageCards">
        <div className="homeText">
          <div>FOR YOU </div>
          <div> Show more</div>
        </div>
        <div className="homeFirstRow">
          
          <ImgCard
            img={imge1}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
          <ImgCard
            img={imge3}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
          <ImgCard
            img={imge4}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
          <ImgCard
            img={imge5}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
          <ImgCard
            img={imge6}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
        </div>
        <div className="homeLastRow">
          <ImgCard
            img={imge1}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
          <ImgCard
            img={imge3}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
          <ImgCard
            img={imge4}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
          <ImgCard
            img={imge5}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
          <ImgCard
            img={imge6}
            name="Taylor Swift, Simon Louis, Harsh, Tejash.."
          />
        </div>
      </div>

      <div className="footer">
        <Footer />{" "}
      </div>
    </div>
  );
}

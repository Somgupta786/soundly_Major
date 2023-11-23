import Footer from "../Footer";
import girl from "../../../assets/pexels-pavel-danilyuk-8001055 1 (1).svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { playBackContext } from "../../../App";
export default function GameSection() {
    const token = JSON.parse(localStorage.getItem('authTok'));
  const [songData, setSongData] = useState(null);
  const { setGamePlayBackData } = useContext(playBackContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionEnded,setQuestionEnded]=useState(false);

  useEffect(() => {
    setIsCorrect(false)
    setSelectedOption(null)
    setQuestionEnded(false)
    const gameData = async () => {
      try {
        const response = await axios.get(
          "https://test-mkcw.onrender.com/game/music-clips/",{
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.data.success) {
          setSongData(response.data.data);
        } else {
          console.error("Failed to fetch song data.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    
          gameData();
       
   
  }, [questionEnded]);
  useEffect(() => {
    if (songData) {
      console.log(songData);
      setGamePlayBackData({
        url: songData.audio_1,
      });
    }
  }, [songData]);
  const resultHandler = async(option,songData)=>{
    try {
        const response = await axios.post(
          `https://test-mkcw.onrender.com/game/music-clips/${songData.id}/check/`,
          {
            answer: option
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            }
          }
        );
        if (response.data.message=="correct answer") {
           setSelectedOption(option)
           setIsCorrect(true)
          } else if(response.data.message=="wrong answer") {
            setIsCorrect(false)
            setSelectedOption(option)
            
          }
      } catch (error) {
        
        
        console.error("Error:", error);
      }
      
  }
  
  const optionStyle = {
    backgroundColor: isCorrect ? "green" : "red",
   
  };
  useEffect(() => {
    if (selectedOption !== null && isCorrect !== null) {
        setTimeout(()=> setQuestionEnded(true),1000)
     
    }
  }, [selectedOption, isCorrect]);
  return (
    <div style={{ position: "relative" }} className="heroSection">
      <div className="gameText">Remember this song?</div>

      <div className="gameBox">
        {songData ? (
          <>
          
            <div className="songSame">Heeriye</div>
            <div className="songSame">Ranjha</div>
            <div onClick={()=>resultHandler(songData.option1,songData)}  style={
                selectedOption === songData.option1 ? optionStyle : null
              } className="songSame">{songData.option1}</div>
            <div onClick={()=>resultHandler(songData.option2,songData)}  style={
                selectedOption === songData.option2 ? optionStyle : null
              } className="songSame">{songData.option2}</div>
          </>
        ) : null}
      </div>

      <div className="gamePoster">
        <img src={girl} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

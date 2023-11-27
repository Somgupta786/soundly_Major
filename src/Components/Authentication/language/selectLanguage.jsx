
import LanguageBox from "./languageBox";
import { useNavigate } from "react-router-dom";
import { playBackContext } from "../../../App";
import { useContext } from "react";

export default function SelectLanguage() {
  const{favLanguage}=useContext(playBackContext)
  const Navigation = useNavigate();

  return (
   
      <div className="languageCard">
        <div className="languageFrame">
            <div className="languageText">
            Which language songs are your favorite?
            </div> 
            <div className="boxFrame">
                 <LanguageBox title="Hindi"/>
                 <LanguageBox title="English"/>
                 <LanguageBox title="Punjabi"/>
                 <LanguageBox title="Haryanvi"/>
            </div>
            
        </div>
        <div className="skipButton" onClick={() => Navigation('/artist')}>{favLanguage.length==0? "Skip":"Next"}</div>
        

      </div>
    
  );
}








{/* <div className="label">
              <input
                type="text"
                name="details"
                value={inputs.details}
                onChange={handleInputChange}
                className="loginField"
                placeholder="  Email or Phone No."
              />
              <div className="emailText">Email or Phone No.</div>
            </div> */}
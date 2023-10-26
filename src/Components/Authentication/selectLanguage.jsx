import Logo from "./LogoIcon";
import { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import LanguageBox from "./languageBox";

export default function SelectLanguage() {
 

  return (
    <div className="mainContent">
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
      </div>
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
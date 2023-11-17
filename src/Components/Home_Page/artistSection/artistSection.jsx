import "./Dashboardexisting.css";
import Footer from "../Footer";
import Rect from "../../../assets/Rectangle 14.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Path from "../../../assets/Path.svg";
export default function artistSection() {
   
    const Navigation=useNavigate()
  return (
    <div className="artistDashboard" >
      <div className="inside" >
        <div className="artistNavPlaceholder"></div>
        <div  className="artistNavBar">
          <div>
            Sound<span>ly</span>
          </div>
          <div>
            Your Thoughts <span>Cleaner</span>
          </div>
          <div onClick={()=>Navigation("/upload")}>
            <img></img>Upload
          </div>
        </div>
        <div  className="yourListening">Your Listings</div>
        <div className="listeningSongs">
          <div className="listeningSongsDetail">
            <div>1</div>
            <div>
              <img src={Rect}></img>
            </div>
            <div>Lover</div>
            <div>Taylor Swift, Tejash yadav</div>
            <div>Taylor Swift</div>
            <div>1:56</div>
            <div>Public</div>
          </div>
          <hr></hr>
        </div>
       
        <div  className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

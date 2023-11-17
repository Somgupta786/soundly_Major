import "./Dashboardexisting.css";
import Footer from "../Footer";
import Rect from "../../../assets/Image_02.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Path from "../../../assets/Path.svg";
export default function Upload(){
    const[audioUploaded,setAudioUploaded]=useState(false)
    const[posterUploaded,setPosterUploaded]=useState(false)
    const[songUploaded,setSongUploaded]=useState(false)
    return(
        <div className="artistDashboard" >
        <div className="inside" style={{background: "rgba(0, 0, 0, 0.70)"}}>
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
          <div id="listeningSongs">
            
            
          </div>
         
          <div  className="footer">
            <Footer />
          </div>
          {!audioUploaded?<div  className="upload">
          <div className="uploadUpper">
            <div>
              
              <img src={Path}></img>
              <div>Upload your music file here</div>
            </div>
            <div>
             
              <div onClick={()=>setAudioUploaded(true)}>Choose file</div>
              <div>Maximum size of 7MB can be uploaded<div>.mp3, .wav, .acc, .flac, .wma, .aiff, .pcm and many more formats supported.</div></div>
            </div>
          </div>
          <div className="uploadLower">
            
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            
          </div>
        </div>:null} 
        {audioUploaded&&!posterUploaded?<div  className="upload1">
          <div>Enter some details of your song</div>
          <div>
            <input placeholder="Enter song’s title"></input>
            <input placeholder="Enter artist’s name"></input>
            <div onClick={()=>setPosterUploaded(true)}>Next</div>
          </div>
          <div className="uploadLower">
            
              <div></div>
              <div style={{background:"#C76B98"}}></div>
              <div></div>
              <div ></div>
            
          </div>
        </div>:null}
        {posterUploaded&&!songUploaded?<div  className="upload">
          <div className="uploadUpper">
            <div>
              
              <img style={{height:"120px",width:"120px" }} src={Rect}></img>
              <div>Upload your music’s poster here</div>
            </div>
            <div>
             
              <div onClick={()=>setSongUploaded(true)}>Choose file</div>
              <div>Maximum size of 2MB can be uploaded<div>.png, .jgep, .jpg, .webp, .avif, .svg and many more formats supported.</div></div>
            </div>
          </div>
          <div className="uploadLower">
            
              <div></div>
              <div style={{background:"#C76B98"}}></div>
              <div style={{background:"#C76B98"}}></div>
              <div></div>
            
          </div>
        </div>:null}
        {songUploaded?<div style={{
            height:"73.7vh"
        }}  className="upload1">
          <div>Enter some details of your song</div>
          <div>
            <input placeholder="Enter Genre"></input>
            <input placeholder="Enter Language"></input>
            <input placeholder="Enter Mood"></input>
            <div onClick={()=>setPosterUploaded(true)}>Next</div>
          </div>
          <div className="uploadLower">
            
              <div></div>
              <div style={{background:"#C76B98"}}></div>
              <div style={{background:"#C76B98"}}></div>
              <div style={{background:"#C76B98"}}></div>
            
          </div>
        </div>:null}
        </div>
      </div>

    )
}

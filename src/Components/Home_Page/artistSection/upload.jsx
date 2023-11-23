import "./Dashboardexisting.css";
import Footer from "../Footer";
import Rect from "../../../assets/Image_02.svg";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import Path from "../../../assets/Path.svg";
import { useRef } from "react";
import axios from "../../../Api/auth"
import close from "../../../assets/Close_LG.svg"

export default function Upload() {
  const Navigation = useNavigate()
  const token = JSON.parse(localStorage.getItem("authTok"));
  const [audioUploaded, setAudioUploaded] = useState(false);
  const [posterUploaded, setPosterUploaded] = useState(false);
  const [songUploaded, setSongUploaded] = useState(false);
  const [songTitle,setSongTitle]=useState("")
  const [songName,setSongName]=useState("")
  const [finalUpload,setFinalUpload]=useState(false)
  const [currentRunStatus, setCurrentRunStatus] = useState(false);
  const[fullSongDetails,setFullSongDetails]=useState({
    name: '',
    is_private: false,
    mood_name: '',
    genre_name: '',
    language_name: '',
    audio: null,
    thumbnail: null,
    artist_name: ''

  })
  const [isLoad, setLoad] = useState(false);
  const [songGenre,setSongGenre]=useState("")
  const [songMood,setSongMood]=useState("")
  const [songLanguage,setSongLanguage]=useState("")
  const [isPublic, setIsPublic] = useState(false);
  const fileInputRef = useRef(null);
  const maxSize = 7 * 1024 * 1024; 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      
      const allowedFormats = [
        ".mp3",
        ".wav",
        ".acc",
        ".flac",
        ".wma",
        ".aiff",
        ".pcm",
        ".m4a"
      ];
      const fileExtension = `.${file.name.split(".").pop()}`;
      if (allowedFormats.includes(fileExtension)) {
      
        if (file.size <= maxSize) {
          setFullSongDetails((prevData) => ({
            ...prevData,
            audio: file
          }));
          setAudioUploaded(true);
        } else {
          alert(
            "File size exceeds the maximum limit (7MB). Please choose a smaller file."
          );
        }
      } else {
        alert("Invalid file format. Please choose a valid audio file.");
      }
    }
  };
  const openFileDialog = () => {
    fileInputRef.current.click();
  };
  const songDataHandler = (e) => {
    const { name, value } = e.target;

    if (name === "songTitle") {
      setSongTitle(value);
    } else if (name === "songName") {
      setSongName(value);
    }
    else if (name === "songGenre") {
      setSongGenre(value);
    }
    else if (name === "songMood") {
      setSongMood(value);
    }
    else if (name === "songLanguage") {
      setSongLanguage(value);
    }
  };
  const songDetailsUpdated = () => {
    if(songTitle!==""&&songName!==""){
      setFullSongDetails((prevData) => ({
        ...prevData,
        name: songTitle,
        artist_name:songName
      }));
     
      setPosterUploaded(true)
    }
    
  };
  const songDetailsUpdated2 = () => {
     if(songGenre!==""&&songMood!==""&&songLanguage!==""){
      setFullSongDetails((prevData) => ({
        ...prevData,
        genre_name: songGenre,
        mood_name:songMood,
        language_name:songLanguage
      }));
      setFinalUpload(true)
      console.log(fullSongDetails)
    }
  }
  const handlePosterChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedFormats = [
        ".png",
        ".jpeg",
        ".jpg",
        ".webp",
        ".avif",
        ".svg"
      ];
      const fileExtension = `.${file.name.split(".").pop()}`;
      if (allowedFormats.includes(fileExtension)) {
        if (file.size <= maxSize) {
          setFullSongDetails((prevData) => ({
            ...prevData,
            thumbnail: file
          }));
          setSongUploaded(true);
        } else {
          alert(
            "File size exceeds the maximum limit (2MB). Please choose a smaller file."
          );
        }
      } else {
        alert("Invalid file format. Please choose a valid image file.");
      }
    }
  };
  const artistDataHandler = async (isPrivate) => {
   if(!currentRunStatus){
    setCurrentRunStatus(true)
    setIsPublic(!isPrivate)
    setLoad(true)
    try {
      const formData = new FormData();
      formData.append('name', fullSongDetails.name);
      formData.append('mood_name', fullSongDetails.mood_name);
      formData.append('genre_name', fullSongDetails.genre_name);
      formData.append('language_name', fullSongDetails.language_name);
      formData.append('artist_name', fullSongDetails.artist_name);
      formData.append('is_private', isPrivate);
  
      if (fullSongDetails.audio) {
        formData.append('audio', fullSongDetails.audio);
      }
  
      if (fullSongDetails.thumbnail) {
        formData.append('thumbnail', fullSongDetails.thumbnail);
      }
      
  
      const response = await axios.post("songs/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
            if(response.data.success){
              console.log("Upload success:", response.data);
           
              setLoad(false)
             setIsPublic(false)
             setCurrentRunStatus(false)
             Navigation("/beArtist")
            }
            else{
              setLoad(false)
              setIsPublic(false)
              setCurrentRunStatus(false)
            }
     

    } catch (error) {
      setIsPublic(false)
      setLoad(false)
      setCurrentRunStatus(false)
      console.error("Upload failed:", error);
    }
   }
    
  };
  
  return (
    <div className="artistDashboard">
      <div className="inside" style={{ background: "rgba(0, 0, 0, 0.70)" }}>
        <div className="artistNavPlaceholder"></div>
        <div className="artistNavBar">
          <div>
            Sound<span>ly</span>
          </div>
          <div>
            Your Thoughts <span>Cleaner</span>
          </div>
          <div className="btn" onClick={() => Navigation("/upload")}>
            <img></img>Upload
          </div>
        </div>
        <div className="yourListening">Your Listings</div>
        <div id="listeningSongs"></div>

        <div className="footer">
          <Footer />
        </div>
        {!audioUploaded ? (
          <div className="upload">
            <div className="uploadUpper">
              <div>
                <img src={Path}></img>
                <div>Upload your music file here</div>
              </div>
              <div className="btn">
                <div onClick={openFileDialog} >
                  <input
                    type="file"
                    placeholder="Choose file"
                    accept=".mp3, .wav, .acc, .flac, .wma, .aiff, .pcm"
                    onChange={handleFileChange}
                    ref={fileInputRef}

                  />
                  Choose file
                </div>
                <div>
                  Maximum size of 7MB can be uploaded
                  <div>
                    .mp3, .wav, .acc, .flac, .wma, .aiff, .pcm and many more
                    formats supported.
                  </div>
                </div>
              </div>
            </div>
            <div className="uploadLower btn">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <img className="btn" onClick={()=>Navigation("/beArtist")} src={close}/>
          </div>
        ) : null}
        {audioUploaded && !posterUploaded ? (
          <div className="upload1">
            <div>Enter some details of your song</div>
            <div>
              <input placeholder="Enter song’s title" value={songTitle} onChange={songDataHandler} name="songTitle"></input>
              <input placeholder="Enter artist’s name" value={songName} onChange={songDataHandler} name="songName"></input>
              <div className="btn" onClick={songDetailsUpdated}>Next</div>
            </div>
            <div  className="uploadLower btn">
              <div  onClick={()=>{
                setAudioUploaded(false)
                
              }}></div>
              <div style={{ background: "#C76B98" }}></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : null}
        {posterUploaded && !songUploaded ? (
          <div className="upload">
            <div className="uploadUpper">
              <div>
                <img
                  style={{ height: "120px", width: "120px" }}
                  src={Rect}
                ></img>
                <div>Upload your music’s poster here</div>
              </div>
              <div>
              <div className="btn" onClick={openFileDialog} >
                  <input
                    type="file"
                    placeholder="Choose file"
                    accept=".png, .jgep, .jpg, .webp, .avif, .svg"
                    onChange={handlePosterChange}
                    ref={fileInputRef}

                  />
                  Choose file
                </div>
                <div>
                  Maximum size of 2MB can be uploaded
                  <div>
                    .png, .jgep, .jpg, .webp, .avif, .svg and many more formats
                    supported.
                  </div>
                </div>
              </div>
            </div>
            <div  className="uploadLower btn">
              <div onClick={()=>{
                setAudioUploaded(false)
                setPosterUploaded(false)
              }}></div>
              <div onClick={()=>{
                setPosterUploaded(false)
                
              }} style={{ background: "#C76B98" }}></div>
              <div style={{ background: "#C76B98" }}></div>
              <div></div>
            </div>
          </div>
        ) : null}
        {songUploaded&& !finalUpload ? (
          <div
            style={{
              height: "73.7vh",
            }}
            className="upload1"
          >
            <div>Enter some details of your song</div>
            <div>
              <input placeholder="Enter Genre" value={songGenre} onChange={songDataHandler} name="songGenre"></input>
              <input placeholder="Enter Language" value={songLanguage} onChange={songDataHandler} name="songLanguage"></input>
              <input placeholder="Enter Mood" value={songMood} onChange={songDataHandler} name="songMood"></input>
              <div className="btn" onClick={songDetailsUpdated2}>Next</div>
            </div>
            <div  className="uploadLower btn">
              <div onClick={()=>{
                setAudioUploaded(false)
                setSongUploaded(false)
              }}></div>
              <div  onClick={()=>{
                setPosterUploaded(false)
                setSongUploaded(false)
              }}  style={{ background: "#C76B98" }}></div>
              <div  onClick={()=>{
                setSongUploaded(false)
                
              }}  style={{ background: "#C76B98" }}></div>
              <div style={{ background: "#C76B98" }}></div>
            </div>
          </div>
        ) : null}
        {finalUpload ? (
          <div
            style={{
              height: "49.6386vh",
              width:"37.2vw"
            }}
            className="upload2"
          >
            <div>A step ahead to reach millions</div>
            <div className="btn">
             <div  onClick={()=>artistDataHandler(false)} className="same"><div>Public Now</div><div> {isLoad && isPublic ? <div className="loader"></div> : "Public"}</div></div>
             <div onClick={()=>artistDataHandler(true)} className="same"><div>Private Now</div><div style={{background: "#CF2121"}}>{isLoad && !isPublic ? <div className="loader"></div> : "Private"}</div></div>
            </div>
            
          </div>
        ) : null}

      </div>
    </div>
  );
}

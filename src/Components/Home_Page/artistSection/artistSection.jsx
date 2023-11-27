import "./Dashboardexisting.css";
import Footer from "../Footer";
import Rect from "../../../assets/Rectangle 14.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Path from "../../../assets/Path.svg";
import axios from "../../../Api/auth";
import { playBackContext } from '../../../App';
import { useContext } from "react";
import "../query.css"

export default function artistSection() {
  const{setPlayBackData,isLiked,setNavData,setfutureSongData,setHome,setMedia,isMedia,setMediaData,currentSongIndex,setCurrentSongIndex}=useContext(playBackContext);
  setHome(false)
  const token = JSON.parse(localStorage.getItem("authTok"));
  const Navigation = useNavigate();
  const [isLoad, setLoad] = useState(false);
  const [publicSongs, setPublicSongs] = useState([]);
  const [privateSongs, setPrivateSongs] = useState([]);
  const [privateChanges, setPrivateChanges] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [currentRunStatus, setCurrentRunStatus] = useState(false);

  useEffect(() => {
    console.log("hello");
    const fetchSongs = async () => {
      try {
        const response = await axios.get("songs/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const fetchedSongs = response.data.data;
          setPublicSongs(fetchedSongs["public songs"]);
          setPrivateSongs(fetchedSongs["private songs"]);
          setLoad(false)
          console.log(fetchedSongs["public songs"]);
        } else {
          console.error("Failed to fetch songs.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchSongs();
  }, [privateChanges]);

  const clickHandler = async (song,index) => {
    if(!currentRunStatus){
      setCurrentRunStatus(true)
      setLoad(true)
      setCurrentIndex(index)
      try {
        const response = await axios.patch(
          `songs/${song.id}/`,
          {
            is_private: !song.is_private,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.data.success) {
          
          console.log("complete");
          setCurrentRunStatus(false)
          setPrivateChanges(!privateChanges);
        } else {
          setCurrentRunStatus(false)
          console.error("Failed to fetch songs.");
        }
      } catch (error) {
        setCurrentRunStatus(false)
        setLoad(false)
      }}
    
  };
  return (
    <div className="artistDashboard">
      <div className="inside">
        <div className="artistNavPlaceholder"></div>
        <div className="artistNavBar">
          <div>
            Sound<span>ly</span>
          </div>
          <div>
            Your Thoughts <span>Cleaner</span>
          </div>
          <div className="btn" onClick={() => Navigation("/upload")}>
            <img ></img>Upload
          </div>
        </div>
        <div className="yourListening">Your Listings</div>
        <div className="listeningSongs">
          {publicSongs.length==0 && privateSongs.length==0  ? (
            <div style={{ height: "65.3vh" }} className="noListeningSong">
              <div >
                <div>
                  <img src={Path}></img>
                  <div>
                    <div>
                    No active listing till now
                    </div>
                    <div className="uploadText">Upload your creation now and make it reach to millions</div>
                  </div>
                </div>
                <div onClick={() => Navigation("/upload")} className="">Upload</div>
              </div>
            </div>
          ) : 
            <>
             
              
              {publicSongs.map((song, songIndex) => (
                <>
                  <div className="listeningSongsDetail">
                    <div>{songIndex + 1}</div>
                    <div>
                      <img src={song.thumbnail_url}></img>
                    </div>
                    <div>
                      {song.name.length > 5
                        ? `${song.name.substring(0, 5)}..`
                        : song.name}
                    </div>
                    <div>
                      {song.artist.length > 5
                        ? `${song.artist.substring(0, 5)}..`
                        : song.artist}
                    </div>
                    <div>
                      {song.language.length > 5
                        ? `${song.language.substring(0, 5)}..`
                        : song.language}
                    </div>
                    <div>{song.song_duration}</div>
                    <div className="btn" onClick={() => clickHandler(song,songIndex+1)}> {isLoad && currentIndex==songIndex+1? <div className="load"></div> : "Public"}</div>
                  </div>
                  <hr></hr>
                </>
              ))}
              {privateSongs.map((song, songIndex) => (
                <>
                  <div className="listeningSongsDetail">
                    <div>{(publicSongs.length)+songIndex+1 }</div>
                    <div>
                      <img src={song.thumbnail_url}></img>
                    </div>
                    <div>
                      {song.name.length > 5
                        ? `${song.name.substring(0, 5)}..`
                        : song.name}
                    </div>
                    <div>
                      {song.artist.length > 5
                        ? `${song.artist.substring(0, 5)}..`
                        : song.artist}
                    </div>
                    <div>
                      {song.language.length > 5
                        ? `${song.language.substring(0, 5)}..`
                        : song.language}
                    </div>
                    <div>{song.song_duration}</div>
                    <div className="btn"
                      onClick={() => clickHandler(song,(publicSongs.length)+songIndex+1 )}
                      style={{ background: "#CF2121" }}
                    >
                      {isLoad&&currentIndex==(publicSongs.length)+songIndex+1 ? <div  className="load"></div> : "Private"}
                    </div>
                  </div>
                  <hr></hr>
                </>
              ))}
              
            </>
          }
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

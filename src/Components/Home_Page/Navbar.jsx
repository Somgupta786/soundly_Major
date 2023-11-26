import React, { useState, useContext, useEffect } from "react";
import Library from "../../assets/Library.svg";
import Game from "../../assets/Game.svg";
import Home from "../../assets/Home.svg";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/auth";
import Pause from "../../assets/Continue.svg";
import Not from "../../assets/notFound.svg";
import Not2 from "../../assets/newI.svg";
import tr from "../../assets/Vector (5).svg";
import nn from "../../assets/nn.svg";
import { loginContext } from "../../AppRouter";
import { playBackContext } from "../../App";
import { useLocation } from "react-router-dom";
import close from "../../assets/Close_LG.svg"
import Logo from "../Authentication/LogoIcon";
import ham from "../../assets/hamb.svg"
import search from "../../assets/searchPh.svg"
import cross from "../../assets/croH.svg"
export default function Navbar(props) {
  const { isLogged, setLogged, setAuthTok } = useContext(loginContext);
  const navigate = useNavigate();
  const Navigation=useNavigate();
  const token = JSON.parse(localStorage.getItem("authTok"));
  const {homeIcon,libraryIcon, setPlayBackData, setNavData, setHome, setMedia, setMediaData } =
    useContext(playBackContext);
  const [searchValue, setSearchValue] = useState("");
  const [beUploader, setBeUploader] = useState(false);
  const [isHamb, setHamb] = useState(false);
  const[isPhone,setIsPhone]=useState(false)
  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);
  const [songs, setSongs] = useState([]);
  const [profileShow, setProfileShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const Location = useLocation();

  const profileShowHandler = () => {
    console.log(userData);
    setProfileShow(!profileShow);
  };
  const handleLibraryClick = () => {
    setHamb(false)
    navigate("/library");
  };
  const searchHandler = async (e) => {
    setSearchValue(e.target.value);
    try {
      const response = await axios.get(`songsearch/?query=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response.data.data);
        setSongs(response.data.data);
      } else {
        setSongs([]);
       
      }
    } catch (error) {
      setSongs([]);
      
    }
  };
  const handleImgCardClick = (song) => {
    setSelectedSong(song);
    setMedia(true);
  };
  useEffect(() => {
    if (songData) {
      console.log(songData.is_liked);
      setPlayBackData({
        url: songData.song_url,
        id: songData.id,
        thumbnail: songData.thumbnail_url,
        name: songData.name,
        artist: selectedSong.artist,
        isLiked: songData.is_liked,
        lyrics_url:songData.lyrics_json
      });

      // setMediaData({
      //   url: songData.song_url,
      //   id: songData.id,
      //   thumbnail: songData.thumbnail_url,
      //   name: songData.name
      // })
    }
  }, [songData]);
  useEffect(() => {
    const fetchSongData = async () => {
      if (selectedSong) {
        try {
          const url = `https://test-mkcw.onrender.com/api/getsong/${selectedSong.id}/`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            setSongData(response.data.data);
            // console.log(response.data)
          } else {
            console.error("Failed to fetch song data.");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    fetchSongData();
  }, [selectedSong]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("user/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          console.log(response.data);
          setUserData(response.data.data);
          console.log(userData);
        } else {
          console.error("Failed to fetch song data.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUserData();
  }, []);
  const authorizeHandler = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.patch(
        "user/profile/update/",
        {
          is_uploader: "true",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response.data.success){
     
        Navigation("/beArtist")
      }
    } catch (error) {
      alert(error.data);
      console.log(error)
    }
  };
  useEffect(() => {
    const handleViewportChange = () => {
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      setIsPhone(viewportWidth <= 800);
    };

    const mediaQueryList = window.matchMedia("(max-width: 800px)");
    handleViewportChange(); // Initial check
    mediaQueryList.addEventListener("change", handleViewportChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleViewportChange);
    };
  }, []);
  return (
    !isPhone?
    <div className="homeNav">
   
      <div className="menu">
        <div onClick={() => navigate("/home")}>
          <img src={Home} />
          <div style={homeIcon?{color:"#C76B98"}:null} >{props.navData.home}</div>
        </div>
        <div>
          <img src={Library} />
          <div style={libraryIcon?{color:"#C76B98"}:null} onClick={handleLibraryClick}>{props.navData.library}</div>
        </div>
        <div onClick={() => navigate("/game")}>
          <img src={Game} />
          <div style={!libraryIcon&&!homeIcon?{color:"#C76B98"}:null}  >{props.navData.game}</div>
        </div>
      </div>
      <div className="searchBox">
        <input
          placeholder="Search"
          value={searchValue}
          onChange={searchHandler}
        />
        <img src={tr}></img>
       {searchValue!==""?<img className="btn" onClick={()=>setSearchValue("")} src={close}/>:null} 
        {searchValue && (
          <div className="searchContent">
            {songs.length !== 0 ? (
              songs.map((item, index) => (
                <div key={index} className="searchMain">
                  <div className="searchData">
                    <div>
                      <img src={item.thumbnail_url} alt={item.name} />
                    </div>
                    <div>
                      <div>
                        {item.name.length > 12
                          ? `${item.name.substring(0, 12)}...`
                          : item.name}
                      </div>
                      <div>
                        {item.artist.length > 12
                          ? `${item.artist.substring(0, 12)}...`
                          : item.artist}
                      </div>
                    </div>
                  </div>
                  <div className="SearchTime">{item.song_duration}</div>
                  <div className="SearchControl">
                    <img
                      onClick={() => handleImgCardClick(item)}
                      src={Pause}
                      alt="Pause"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="searchNotFound">
                <div>
                  <img src={Not}></img>
                </div>
                <div>
                  <div>Couldn’t find ’{searchValue}’</div>
                  <div>
                    Try searching again using a different spelling or keyword.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {userData ? (
        <div className="profile">
          <div onClick={profileShowHandler}>
            <img src={userData.profile_pic_url} />
          </div>
          {profileShow ? (
            <div className="profileOption">
              <div className="profileDetails">
                <div className="profileImg">
                  <img src={userData.profile_pic_url} />
                </div>
                <div>
                  <div>{userData.username}</div>
                  <div>{userData.email}</div>
                </div>
              </div>
              <div className="hr"></div>
              <div className="profileRefer">
                <div
                  onClick={() => {
                    Navigation("/favArt");
                  }}
                >
                  Listen to artists you follow
                </div>
                <div
                  onClick={() => {
                    Navigation("/recent");
                  }}
                >
                  View Recently played
                </div>
                <div onClick={() =>{
                  userData.is_uploader?Navigation('/beArtist'): setBeUploader(!beUploader)
                  
                   
                }
                 
                 }>
                  Become artist
                </div>
              </div>
              <div className="hr"></div>
              <div className="profileRefer">
                <div>Help</div>
                <div>Privacy Policy</div>
                <div>About Us</div>
              </div>
              <div className="hr"></div>
              <div
                onClick={() => {
                  localStorage.setItem("isLogged", JSON.stringify(false));
                  localStorage.setItem("authTok", JSON.stringify(""));
                  Navigation("/login");
                }}
              >
                Logout
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {beUploader ? (
        <form className="uploader" onSubmit={authorizeHandler}>
          <div>Terms & Conditions</div>
          <div>
            These Terms and Conditions ("Agreement") govern the relationship
            between Soundly, an Indian company ("we," "us," or "our"), and the
            individual or entity ("you" or "artist") registering as an artist on
            the Soundly platform.
            <p>
              By registering as an artist on Soundly, you agree to be bound by
              these Terms and Conditions. If you do not agree to these terms,
              please do not proceed with the registration process.
            </p>
            <p>
              1. Eligibility: a. To register as an artist, you must be at least
              18 years old or have obtained the consent of a parent or legal
              guardian. b. You must have the legal right and authority to upload
              and distribute the music you submit to the Soundly platform.
            </p>
            <p>
              2. Artist Account: a. You agree to provide accurate, current, and
              complete information during the registration process. b. You are
              responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account.
            </p>
            <p>
              3. Music Submission: a. By submitting music to Soundly, you grant
              us a non-exclusive, worldwide, royalty-free license to use,
              reproduce, distribute, and publicly display your music on the
              Soundly platform. b. You retain all rights to your music, and this
              license is limited to the purposes of operating and promoting the
              Soundly platform.
            </p>
            <p>
              4. Content Guidelines: a. You agree not to submit any content that
              infringes on the intellectual property rights of others. b. Your
              music and associated content must comply with our community
              guidelines, which prohibit the distribution of offensive,
              inappropriate, or harmful content.
            </p>
            <p>
              5. Revenue and Payments: a. Soundly will pay you a share of the
              revenue generated from the distribution of your music on the
              Soundly platform. The specific revenue share will be outlined in a
              separate agreement. b. Payments will be made in accordance with
              the payment terms specified in the separate agreement.
            </p>
            <p>
              6. Termination: a. We reserve the right to terminate your artist
              account at our discretion, for reasons including but not limited
              to violation of these Terms and Conditions or our community
              guidelines. b. You may terminate your artist account at any time
              by providing written notice to Soundly.
            </p>
            <p>
              7. Changes to Terms: We reserve the right to modify these Terms
              and Conditions at any time. We will notify you of any changes, and
              continued use of the Soundly platform after such modifications
              constitutes your acceptance of the revised terms.
            </p>
            <p>
              8. Governing Law: This Agreement shall be governed by and
              construed in accordance with the laws of India.
            </p>
            By registering as an artist on Soundly, you acknowledge that you
            have read, understood, and agree to be bound by these Terms and
            Conditions.
          </div>
          <div>
            <input type="checkbox" required /> By becoming artist you are
            accepting your terms & conditions.
          </div>
          <div>
            <button className="btn " type="submit">
              Proceed
            </button>
          </div>
        </form>
      ) : null}
    </div>:<div className="homeNav"><Logo/>
    <div className="phoneNav btn">
      <img onClick={()=>setIsSearch(!isSearch)}  src={search}/>
      <img onClick={()=>setHamb(!isHamb)} src={isHamb?cross:ham}/>
    </div>
    {isHamb?<div  className="hamBurger btn">
    <div className="menu">
        <div onClick={() => {
           navigate("/home"),
        setHamb(false)
        }
       
        }>
          
          <div style={homeIcon?{color:"#C76B98"}:null} >{props.navData.home}</div>
        </div>
        <div>
          
          <div style={libraryIcon?{color:"#C76B98"}:null} onClick={handleLibraryClick}>{props.navData.library}</div>
        </div>
        <div onClick={() => {
           navigate("/game"),
        setHamb(false)
        }
       
        }>
      
          <div style={!libraryIcon&&!homeIcon?{color:"#C76B98"}:null}  >{props.navData.game}</div>
        </div>
        <div >
      
          <div style={!libraryIcon&&!homeIcon?{color:"#C76B98"}:null}  >Profile</div>
        </div>
      </div>
    </div>:null}
   {isSearch?   <div className="searchBox">
        <input
          placeholder="Search"
          value={searchValue}
          onChange={searchHandler}
        />
        <img src={nn}></img>
       {searchValue!==""?<img className="btn" onClick={()=>setSearchValue("")} src={close}/>:null} 
         (
          <div className="searchContent">
            {songs.length !== 0 ? (
              songs.map((item, index) => (
                <div key={index} className="searchMain">
                  <div className="searchData">
                    <div>
                      <img src={item.thumbnail_url} alt={item.name} />
                    </div>
                    <div>
                      <div>
                        {item.name.length > 12
                          ? `${item.name.substring(0, 12)}...`
                          : item.name}
                      </div>
                      <div>
                        {item.artist.length > 12
                          ? `${item.artist.substring(0, 12)}...`
                          : item.artist}
                      </div>
                    </div>
                  </div>
                  <div className="SearchTime">{item.song_duration}</div>
                  <div className="SearchControl">
                    <img
                      onClick={() => handleImgCardClick(item)}
                      src={Pause}
                      alt="Pause"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="searchNotFound">
                <div>
                  <img src={Not2}></img>
                </div>
                <div>
                  <div>{searchValue?`Couldn’t find ’${searchValue}’`:null}</div>
                  <div>
                    Try searching again using a different spelling or keyword.
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      </div>:null}
    </div>
  );
}

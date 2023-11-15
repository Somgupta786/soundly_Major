import React, { useState } from "react";
import Library from "../../assets/Library.svg";
import Game from "../../assets/Game.svg";
import Home from "../../assets/Home.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  console.log(props)
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleLibraryClick = () => {
    navigate("/library");
  };

  return (
    <div className="homeNav">
      <div className="menu">
        <div>
          <img src={Home} />
          <div>{props.navData.home}</div>
        </div>
        <div>
          <img src={Library} />
          <div onClick={handleLibraryClick}>{props.navData.library}</div>
        </div>
        <div>
          <img src={Game} />
          <div>{props.navData.game}</div>
        </div>
      </div>
      <div className="searchBox">
        <input
          placeholder="     Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <div className="searchContent">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
      <div className="profile">
        <div></div>
      </div>
    </div>
  );
}

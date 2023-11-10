import Library from "../../assets/Library.svg";
import Game from "../../assets/Game.svg";
import Home from "../../assets/Home.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { playBackContext } from '../../App';

export default function Navbar(props) {
  console.log(props.navData.home)
  
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
        <input placeholder="     Search"></input>

      </div>
      <div className="profile">
        <div></div>
      </div>
    </div>
  );
}

import Library from "../../assets/Library.svg";
import Game from "../../assets/Game.svg";
import Home from "../../assets/Home.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLibraryClick = () => {
    navigate("/library");
  };

  return (
    <div className="homeNav">
      <div className="menu">
        <div>
          <img src={Home} />
          <div>Home</div>
        </div>
        <div>
          <img src={Library} />
          <div onClick={handleLibraryClick}>Library</div>
        </div>
        <div>
          <img src={Game} />
          <div>Game</div>
        </div>
      </div>
      <div className="searchBox">
        <input placeholder="Search"></input>
      </div>
      <div className="profile">
        <div></div>
      </div>
    </div>
  );
}

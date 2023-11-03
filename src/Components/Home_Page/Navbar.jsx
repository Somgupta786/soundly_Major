import Library from "../../assets/Library.svg";
import Game from "../../assets/Game.svg";
import Home from "../../assets/Home.svg";
export default function Navbar() {
  return (
    <div className="homeNav">
      <div className="menu">
        <div>
        <img src={Home} />
         <div>Home</div> 
        </div>
        <div>
          <img src={Library} />
          <div>Library</div> 
        </div>
        <div>
          <img src={Game} />
          <div>Game</div> 
        </div>
      </div>
      <div className="searchBox">
        <input placeholder="     Search"></input>
      </div>
      <div className="profile"><div></div></div>
    </div>
  );
}

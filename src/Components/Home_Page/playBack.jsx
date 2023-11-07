import Group from "../../assets/Group.svg";
import Left from "../../assets/Left.svg";
import Right from "../../assets/Right.svg";
import Repeat from "../../assets/Repeat.svg";
import Continue from "../../assets/Continue.svg";
import Line from "../../assets/Line.svg";
import Rectangle from "../../assets/Rectangle 14.svg";
import Heart from "../../assets/HeartPlay.svg";
import Share from "../../assets/Share.svg";

export default function Playback() {
  return (
    <div className="playBack">
      <div>
        <img src={Rectangle}></img>
        <div>Lotus</div>
      </div>
      <div>
        <div className="controls">
          <img src={Group} />
          <img src={Left} />
          <img src={Continue} />
          <img src={Right} />
          <img src={Repeat} />
        </div>
        <div>
          
          <img src={Line} />
        </div>
      </div>
      <div className="Share">
        <div><img src={Heart}/></div>
        <div><img src={Share}/><div>Share</div></div>
      </div>
    </div>
  );
}

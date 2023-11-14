import Group from "../../../assets/shuffles.svg";
import Left from "../../../assets/Skip Back.svg";
import Right from "../../../assets/Group 12.svg";
import Repeat from "../../../assets/Group 14.svg";
import Continue from "../../../assets/Continue.svg";
import Line from "../../../assets/Line.svg";
import Rectangle from "../../../assets/Rectangle 14.svg";
import Heart from "../../../assets/Unlike.svg";
import Share from "../../../assets/Share.svg";
import Pause from "../../../assets/Group 11.svg";
import React, { useEffect, useState } from "react";
import Heart2 from "../../../assets/Like button (1).svg";
export default function MediaPlayer() {
    return(
  <div className="mediaPlayer">
  <div className="mediaImage"></div>
    <div className="musicData">
      <div>
        <div>
          <div className="mediaText">
            <div>LOVER</div>
            <div>Tylor Swift</div>
          </div>
          <div><img src={Heart}/></div>
          <div><img src={Share}/></div>
        </div>
        <div><img src={Rectangle}/></div>
      </div>
      <div className="mediaControls">
        <div className="progress-bar">
        <div
              className="progress-fill"
             
            ></div>
        </div>
        <div >
          <div><img src={Group}/></div>
          <div className="mainControl">
          <div><img src={Left}/></div>
          <div><img src={Pause}/></div>
          <div><img src={Right}/></div>
          </div>
          <div><img src={Repeat}/></div>
        </div>
      </div>
    </div>
    <div className="lyricData">We could leave the Christmas lights up 'til JanuaryThis is our place, we make the rulesAnd there's a dazzling haze, a mysterious way about you, dearHave I known you twenty seconds or twenty years?Can I go where you go?Can we always be this close forever and ever?And ah, take me out and take me homeYou're my, my, my, myLoverWe could let our friends crash in the living roomThis is our place, we make the callAnd I'm highly suspicious that everyone who sees you wants youI've loved you three summers now, honey, but I want 'em allCan I go where you go?Can we always be this close forever and ever?And ah, take me out and take me home (Forever and ever)You're my, my, my, myLoverLadies and gentlemen, will you please stand?With every guitar string scar on my handI take this magnetic force of a man to be myLoverMy heart's been borrowed and yours has been blueAll's well that ends well to end up with youSwear to be over-dramatic and true to myLoverAnd you'll save all your dirtiest jokes for meAnd at every table, I'll save you a seatLoverCan I go where you go?Can we always be this close forever and ever?And ah, take me out and take me home (Forever and ever)You're my, my, my, myOh, you're my, my, my, myDarling, you're my, my, my, myLover</div>
  </div>
    )
}

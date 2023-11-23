import Heart from "../../assets/Heart.svg";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const Navigation = useNavigate()
   const styles={
        background:props.color
    }
    const cardClick=(title,index)=>{
       Navigation("/likedPlaylists",{
        state:{
          title:title,
          index:index
        }
       })

    }
  return (
    <>
      <div className="cardLeft">
        <div className="cardText">A Playlist For You </div>
        <div className="cardCenter">
          <div className="cardTitle">{props.title}</div>
          <div className="cardInfo">
            <div >By Soundly</div>
            <div>Most Liked Playlist</div>
          </div>
        </div>
        <div className="cardLeftEnd">
          <div onClick={()=>cardClick(props.title,props.index)} style={styles} >Listen Now</div>
          {/* <div >
            <img src={Heart} />
          </div> */}
        </div>
      </div>
      <div className="cardRight"><img src={props.img}/></div>
    </>
  );
}

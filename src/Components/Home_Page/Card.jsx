import Heart from "../../assets/Heart.svg";


export default function Card(props) {
   const styles={
        background:props.color
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
          <div style={styles} >Listen Now</div>
          <div >
            <img src={Heart} />
          </div>
        </div>
      </div>
      <div className="cardRight"><img src={props.img}/></div>
    </>
  );
}

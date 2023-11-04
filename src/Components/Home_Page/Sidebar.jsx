import Logo from "../Authentication/LogoIcon";
export default function Sidebar(props) {
    console.log(props)
  return (
    <div className="sideBar">
      <Logo />
      <div className="sideList">
       { props.map( 
        <div className="sideMenu">
          <div>{props.title}</div>
          <div>{}</div>
          <div>For You</div>
        </div>    )
       
       }
       
        <div className="Genre">
          <div className="sideMenu">
            <div>GENRE</div>
            <div>Pop</div>
            <div>Rock</div>
            <div>Hip Hop</div>
            <div>Rap</div>
            <div>R&B</div>
          </div>
        </div>
        
        <div className="favArtist">
        <div className="sideMenu">
            <div>FROM ARTIST YOU FOLLOW</div>
            <div>Neha Kakkar</div>
            <div>Arijit Singh</div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

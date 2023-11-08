import "./landing.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Sidebar from "./Sidebar";
import Playback from "./playBack";

export default function Landing() {
    const menuItems1 = [
        {
          title: "MENU",
          onclick: "/menu"
        },
        {
          title: "For You",
          onclick: "/forYou"
        },
        {
            title: "Recently Played",
            onclick: "/recent"
          },
       
      ];
    
      const menuItems2 = [
        {
          title: "GENRE",
          onclick: "/genre"
        },
        {
          title: "Pop",
          onclick: "/pop"
        },
        {
            title: "Rock",
            onclick: "/rock"
          },
        
          {
            title: "Hip-Hop",
            onclick: "/Hip-Hop"
          },
        
          {
            title: "Rap",
            onclick: "/Rap"
          },
        
          {
            title: "R&B",
            onclick: "/R&B"
          }];
          const menuItems3 = [
            {
              title: "From Artist You Follow",
              onclick: "/#"
            },
            {
              title: "Neha Kakkar",
              onclick: "/neha"
            },
            {
                title: "Badshah",
                onclick: "/badshah"
              },
           
          ];

  return (
    <div className="landingPage">
     <Sidebar items={[menuItems1, menuItems2,menuItems3]} />
    <div className="mainContent">
      <Navbar />
      <div className="navBarPlaceholder"></div>
      <HeroSection />
      
      {/* <Playback/> */}
      <div className="playBackPlaceholder"></div>
    </div>
      
    </div>
  );
}

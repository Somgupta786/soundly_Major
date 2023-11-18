import "./landing.css";
import "./query.css"
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Sidebar from "./Sidebar";
import Playback from "./playBack";
import { useContext } from 'react';
import { playBackContext } from '../../App';

export default function Landing() {
  const { setPlayBackData, setNavData, setHome, favArt } = useContext(playBackContext);
  console.log(favArt)
  setHome(true);

  const menuItems1 = [
    {
      title: "MENU",
      onclick: "/menu",
      activ: "false"
    },
    {
      title: "For You",
      onclick: "/forYou",
      activ: "true"
    },
    {
      title: "Recently Played",
      onclick: "/recent",
      activ: "false"
    },
  ];

  const menuItems2 = [
    {
      title: "GENRE",
      onclick: "/genre",
      activ: "false"
    },
    {
      title: "Pop",
      onclick: "/pop",
      activ: "false"
    },
    {
      title: "Rock",
      onclick: "/rock",
      activ: "false"
    },
    {
      title: "Hip-Hop",
      onclick: "/Hip-Hop",
      activ: "false"
    },
    {
      title: "Rap",
      onclick: "/Rap",
      activ: "false"
    },
    {
      title: "R&B",
      onclick: "/R&B",
      activ: "false"
    }
  ];

  const menuItems3 = [
    {
      title: "From Artists You Follow",
      onclick: "/#",
      activ: "false"
    },
    ...favArt.map((name) => ({
      title: name,
      onclick: "/favouriteArtistSongs",
      activ: "false"
    }))
  ];

  return (
    <div className="landingPage">
      <Sidebar items={[menuItems1, menuItems2, menuItems3]} />
      <div className="mainContent">
        <div className="navBarPlaceholder"></div>
        <HeroSection />
        {/* <Playback/> */}
        <div className="playBackPlaceholder"></div>
      </div>
    </div>
  );
}

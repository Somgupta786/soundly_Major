import "./landing.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Sidebar from "./Sidebar";

export default function Landing() {
  return (
    <div className="landingPage">
    <Sidebar />
    
      <Navbar />
      
      <HeroSection />
    </div>
  );
}

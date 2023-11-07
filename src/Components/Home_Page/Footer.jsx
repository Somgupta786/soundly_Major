import insta from "../../assets/iconmonstr-instagram-11.svg";
import link from "../../assets/iconmonstr-linkedin-3.svg";
import Vector from "../../assets/Vector (3).svg";

export default function Footer(){
    return(
        <>
           <div className="footerUpper">
            <div className="footerLeft">
                <div className="company">
                    <div>Company</div>
                    <div>About</div>
                    <div>Jobs</div>
                    <div>For the records</div>
                </div>
                <div className="company">
                <div>Community</div>
                <div>For Artist</div>
                    <div>Developers</div>
                    <div>Vendors</div>
                    <div>Invester</div>
                    <div>Advertising</div>
                </div>
                <div className="company">
                <div>Useful Links</div>
                    <div>Advertising</div>
                    <div>Free Mobile App</div>
                
                </div>
            </div>
            <div className="footerRight">
            <img src={insta}/>
           <img src={link}/>
           <img src={Vector}/>
            </div>
           </div>
           <hr></hr>
           <div className="footerLower"> 
           <div className="policy">
           <div>Legal</div>
           <div>Privacy Policy</div>
           <div>Privacy Centre</div>
           <div>Cookies</div>
           <div>Cookies</div>
           </div>
           <div>
           © 2023 Soundly
           </div>
           
           </div>
        </>
    )
}
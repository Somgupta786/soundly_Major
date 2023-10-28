import Logo from "./LogoIcon"
import { NavLink } from 'react-router-dom';

export default function Navbar(props){
    return( <div className="navBar">
          <Logo />
      {/* <div className="navItems">
        <div>Home</div>
        <div>Library</div>
        <div>Become Artist</div>
        <div>About us</div>
      </div> */}
      
      <div className="referLogin">
      <NavLink className="login" to={props.title === "SignUp" ? "/" : "/login"}>{props.title}</NavLink>
            </div>
      
     

     </div>);
}
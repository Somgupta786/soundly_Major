

export default function Navbar(){
    return( <div className="navBar">
      <div className="logoHeading">
        Sound<span className="logoHeadingEnd">ly</span>
      </div>
      <div className="navItems">
        <div>Home</div>
        <div>Library</div>
        <div>Become Artist</div>
        <div>About us</div>
      </div>
      <div className="search">
        <div className="searchIcon"><img className="searchIconImage" src="./assets/Vector.png" alt="img"></img></div>
        <div className="searchText">Search</div>
      </div>

     </div>);
}
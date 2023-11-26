import { useEffect, useState } from "react";
import Logo from "../Authentication/LogoIcon";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ items }) {
  const navigate = useNavigate();
 
  const handleClick = (item) => {
    console.log(item)
    navigate(item.onclick,{
      state:item.title
    });
  };
  

  return (
   <div className="sideBar">
    <Logo />
    <div className="sideList">
      {items.map((menu, index) => (
        <div className="sideMenu" key={index}>
          {menu.map((item, itemIndex) => (
            <div key={itemIndex} style={item.activ=="true"?{color:"var(--web-tertiary, #C76B98)"}:null} onClick={() => handleClick(item)}>
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
    
  );
}

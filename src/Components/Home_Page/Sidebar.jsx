import Logo from "../Authentication/LogoIcon";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ items }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="sideBar">
      <Logo />
      <div className="sideList">
        {items.map((menu, index) => (
          <div className="sideMenu" key={index}>
            {menu.map((item, itemIndex) => (
              <div key={itemIndex} onClick={() => handleClick(item.onclick)}>
                {item.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom"
export default function Logo(){
  const Navigation = useNavigate()
    return(
        <>
             <div className="logoHeading btn" >
        Sound<span className="logoHeadingEnd">ly</span>
      </div>
        </>
    )
}
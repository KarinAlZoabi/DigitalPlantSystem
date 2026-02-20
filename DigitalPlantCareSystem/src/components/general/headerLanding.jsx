import { COLORS } from "../../styles/colors";
import "./../../styles/header.css"
export default function HeaderLanding(){
    return(
        <header className="navbar">
        <div className="logo">
          <img src="" alt="" />
        </div>
        <div className="nav-buttons">
          <button className="btn-outline">Login</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      </header>
    )
}
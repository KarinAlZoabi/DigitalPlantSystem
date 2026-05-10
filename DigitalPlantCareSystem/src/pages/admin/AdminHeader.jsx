import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  Header, 
  NavBtn, 
  ProfileBtn, 
  Avatar, 
  AvatarImg, 
  NavLinks, 
  Wrapper, 
  MenuButton 
} from "../../styles/AdminHeaderStyles";

const Logo = "/images/logo/AdminLogo.svg";
const BACKEND = "http://localhost:5000";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile toggle

  const isActive = (path) => location.pathname === path;

  return (
    <Header>
      <Wrapper>
        {/* Logo and Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <img 
            src={Logo} 
            alt="PlantCare" 
            style={{ width: 200, cursor: "pointer" }} 
            onClick={() => navigate("/admin")} 
          />
          
          <NavLinks $isOpen={isMenuOpen}>
            <NavBtn $a={isActive("/admin")} onClick={() => navigate("/admin")}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>dashboard</span>
              Dashboard
            </NavBtn>
            <NavBtn $a={isActive("/admin/database")} onClick={() => navigate("/admin/database")}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>local_florist</span>
              Plant Database
            </NavBtn>
            <NavBtn $a={isActive("/admin/care-schedule")} onClick={() => navigate("/admin/care-schedule")}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
              Care Calendar
            </NavBtn>
          </NavLinks>
        </div>

        {/* Profile & Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ProfileBtn onClick={() => navigate("/profile")}>
            <Avatar>
              {user?.profilePicture ? (
                <AvatarImg
                  src={user.profilePicture.startsWith("http") ? user.profilePicture : `${BACKEND}${user.profilePicture}`}
                  alt={user.name}
                />
              ) : (
                user?.name?.[0]?.toUpperCase() || "A"
              )}
            </Avatar>
            <span className="admin-name">{user?.name}</span>
          </ProfileBtn>

          {/* Hamburger Icon for Mobile */}
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </MenuButton>
        </div>
      </Wrapper>
    </Header>
  );
}
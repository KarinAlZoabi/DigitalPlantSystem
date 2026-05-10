//user nav bar
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";
import {
  HeaderDiv,
  WrapperDiv,
  ButtonNav,
  ProfileButton,
  AvatarImg,
  NavLinks,
  Avatar,
  HamburgerButton,
} from "../../styles/NabvarStyles";

const Logo = "/images/logo/Logo.svg";
const CalendarIcon = "/images/icons/calendar.svg";

// Backend URL for fetching hosted profile pictures
const BACKEND = "http://localhost:5000";

const resolveProfileImage = (path) => {
  if (!path) return null;

  // Full URL already
  if (path.startsWith("http")) {
    return path;
  }

  // Local backend image
  return `${BACKEND}${path}`;
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/")
      return location.pathname === "/" || location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  //display user image if it exists, otherwise display first initial
  const avatarContent = user?.profilePicture ? (
    <AvatarImg
      src={resolveProfileImage(user.profilePicture)}
      alt={user.name}
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
  ) : (
    user?.name?.[0]?.toUpperCase() || "U"
  );

  return (
  <HeaderDiv>
    <WrapperDiv>
      {/* 1. Logo Section */}
      <div
        className="logo"
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={() => navigate(isAdmin ? "/admin" : "/dashboard")}
      >
        <img style={{ width: "180px" }} src={Logo} alt="PlantCare" />
      </div>

      {/* 2. NavLinks (Now a direct child again) */}
      <NavLinks $open={menuOpen}>
        <ButtonNav $isActive={isActive("/")} onClick={() => navigate("/dashboard")}>
          <span className="material-symbols-outlined">potted_plant</span>
          My Plants
        </ButtonNav>
        <ButtonNav $isActive={isActive("/care-schedule")} onClick={() => navigate("/care-schedule")}>
          <img src={CalendarIcon} alt="" style={{ width: 22 }} />
          Care Schedule
        </ButtonNav>
      </NavLinks>

      {/* 3. Action Group (Profile + Hamburger) */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <ProfileButton onClick={() => navigate("/profile")}>
          <Avatar $admin={isAdmin}>{avatarContent}</Avatar>
          <span className="user-name">{user?.name}</span>
        </ProfileButton>

        <HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </HamburgerButton>
      </div>
    </WrapperDiv>
  </HeaderDiv>
);
}

export default Navbar;

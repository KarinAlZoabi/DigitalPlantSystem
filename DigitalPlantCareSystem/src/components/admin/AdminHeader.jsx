import {
  HeaderBar,
  HeaderContainer,
  HeaderLeft,
  Brand,
  BrandLogo,
  NavLinks,
  NavLinkBtn,
  UserPill,
  UserPillIcon,
} from "../../styles/adminHeaderStyles";

import adminLogo from "../../images/logo/AdminLogo.svg";

import dashboardBlack from "../../images/icons/dash-black.png";
import dashboardWhite from "../../images/icons/dash-white.png";
import databaseBlack from "../../images/icons/Database-black.png";
import databaseWhite from "../../images/icons/Database-white.png";
import calendarBlack from "../../images/icons/calendar-black.png";
import calendarWhite from "../../images/icons/calendar-black.png";
import userBlack from "../../images/icons/User-black.png";
import userWhite from "../../images/icons/User-white.png";

export default function AdminHeader({
  active = "dashboard", // "dashboard" | "database" | "calendar" | "admin"
  onDashboard,
  onDatabase,
  onCalendar,
  onAdmin,
  adminName = "Admin",
}) {
  return (
    <HeaderBar>
      <HeaderContainer>
        <HeaderLeft>
          <Brand>
            <BrandLogo src={adminLogo} alt="PlantCare Admin logo" />
          </Brand>

          <NavLinks>
            <NavLinkBtn
              type="button"
              $active={active === "dashboard"}
              onClick={onDashboard}
            >
              <img
                src={active === "dashboard" ? dashboardWhite : dashboardBlack}
                alt="dashboard"
              />
              <span>Dashboard</span>
            </NavLinkBtn>

            <NavLinkBtn
              type="button"
              $active={active === "database"}
              onClick={onDatabase}
            >
              <img
                src={active === "database" ? databaseWhite : databaseBlack}
                alt="plant database"
              />
              <span>Plant Database</span>
            </NavLinkBtn>

            <NavLinkBtn
              type="button"
              $active={active === "calendar"}
              onClick={onCalendar}
            >
              <img
                src={active === "calendar" ? calendarWhite : calendarBlack}
                alt="care calendar"
              />
              <span>Care Calendar</span>
            </NavLinkBtn>
          </NavLinks>
        </HeaderLeft>

        <UserPill
          type="button"
          $active={active === "admin"}
          onClick={onAdmin}
        >
          <UserPillIcon
            src={active === "admin" ? userWhite : userBlack}
            alt="admin"
          />
          <span>{adminName}</span>
        </UserPill>
      </HeaderContainer>
    </HeaderBar>
  );
}
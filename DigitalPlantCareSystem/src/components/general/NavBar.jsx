import React from "react";
const Logo = "images/logo/Logo.svg";
const CalendarIcon = "images/icons/calendar.svg";
import { HeaderDiv, WrapperDiv, ButtonNav, ProfileButton } from "../../styles/NabvarStyles";
function Navbar() {
  return (
    <HeaderDiv>
      <WrapperDiv>
        <div className="logo">
          <img style={{ width: "60%" }} src={Logo} alt="" />
        </div>

        <div>
          <ButtonNav $isActive={true}>
            <span className="material-symbols-outlined">potted_plant</span>
            My Plants
          </ButtonNav>
          <ButtonNav $isActive={false} style={{ marginLeft: 30 }}>
            <img src={CalendarIcon} alt="" style={{ width: 25 }} />
            Care Schedule
          </ButtonNav>
        </div>
      </WrapperDiv>

      <div>
        <ProfileButton>
          <span class="material-symbols-outlined" style={{color: "2e2e2e", fontSize: 30}}>account_circle</span>
          John Doe
        </ProfileButton>
      </div>
    </HeaderDiv>
  );
}

export default Navbar;

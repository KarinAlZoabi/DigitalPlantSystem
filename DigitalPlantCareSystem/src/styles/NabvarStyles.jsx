import styled from "styled-components";
import { COLORS } from "./colors";

export const HeaderDiv = styled.div`
  display: flex;
  padding: 20px 50px;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  background: white;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`;
export const AvatarImg = styled.img`
  width: 100%;

  height: 100%;

  object-fit: cover;

  border-radius: 50%;
`;

export const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Pushes content to edges */
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const ProfileButton = styled.button`
  /* Desktop: Rectangular + Border */
  padding: 10px 20px;
  background-color: transparent;
  color: ${COLORS.primaryText};
  border-radius: 10px;
  border: 1px solid ${COLORS.primaryText};
  display: inline-flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${COLORS.modalGray};
  }

  .user-name {
    display: inline; /* Visible on desktop */
  }

  /* Mobile: Remove border, hide name, keep only the circle */
  @media (max-width: 900px) {
    border: none;
    padding: 0; 
    background: none;
    
    &:hover {
      background: none;
    }

    .user-name {
      display: none; /* Bro, it's gone on mobile! */
    }
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  /* Restoring your original alignment: next to logo */
  margin-right: auto; 
  margin-left: 40px; 

  @media (max-width: 900px) {
    margin: 0; 
    display: ${(props) => (props.$open ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: white;
    padding: 20px;
    gap: 12px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    align-items: stretch;
    z-index: 1000;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  span {
    font-size: 28px;
    color: ${COLORS.primaryText};
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;

// Reuse your ButtonNav but remove the forced margin
export const ButtonNav = styled.button`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.$isActive ? COLORS.primaryButton : "transparent"};
  color: ${(props) => (props.$isActive ? COLORS.white : COLORS.primaryText)};
  border-radius: 10px;
  border: none;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  font-weight: ${(props) => (props.$isActive ? 600 : 400)};

  @media (max-width: 900px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const Avatar = styled.div`
  width: 34px;

  height: 34px;

  border-radius: 50%;

  background: ${(p) => (p.$admin ? "#7C3AED" : COLORS.secondaryGreen)};

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 700;

  font-size: 0.9rem;

  overflow: hidden;

  flex-shrink: 0;
`;

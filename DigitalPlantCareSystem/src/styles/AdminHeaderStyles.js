import styled from "styled-components";

export const Header = styled.header`
  background: white;
  padding: 20px 60px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: Poppins, sans-serif;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 4px;

  @media (max-width: 768px) {
    /* When closed on mobile, hide. When open, show as a dropdown */
    display: ${(props) => (props.$isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 20px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    gap: 10px;
  }
`;

export const NavBtn = styled.button`
  background: ${(p) => (p.$a ? "#EDE9FE" : "transparent")};
  color: ${(p) => (p.$a ? "#7C3AED" : "#6b7280")};
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: ${(p) => (p.$a ? 600 : 400)};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: #ede9fe;
    color: #7c3aed;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
`;

export const ProfileBtn = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: Poppins, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 10px;

  &:hover {
    background: #ede9fe;
  }

  .admin-name {
    @media (max-width: 480px) {
      display: none; /* Only show avatar on very small screens */
    }
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #7c3aed;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
  overflow: hidden;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

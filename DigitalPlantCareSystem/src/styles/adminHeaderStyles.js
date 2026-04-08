import styled from "styled-components";

/* ✅ outer bar */
export const HeaderBar = styled.header`
  width: 100%;
  height: 110px;
  background: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 0;
`;

export const HeaderContainer = styled.div`
  width: min(1512px, 100%);
  margin: 0 auto;
  height: 110px;
  padding: 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 900px) {
    padding: 12px 18px;
    height: auto;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 46px;

  @media (max-width: 900px) {
    gap: 18px;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandLogo = styled.img`
  height: 56px;
  width: auto;
  object-fit: contain;
  display: block;
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const NavLinkBtn = styled.button`
  border: none;
  background: ${(p) => (p.$active ? "#6B8F6B" : "transparent")};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: ${(p) => (p.$active ? "#ffffff" : "#1f1f1f")};
  transition: 0.2s ease;

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
  }

  span {
    color: ${(p) => (p.$active ? "#ffffff" : "#1f1f1f")};
    line-height: 1;
  }

  &:hover {
    background: ${(p) => (p.$active ? "#6B8F6B" : "rgba(107, 143, 107, 0.12)")};
  }

  @media (max-width: 900px) {
    span {
      display: none;
    }
  }
`;

export const UserPill = styled.button`
  height: 40px;
  padding: 0 16px;
  background: ${(p) => (p.$active ? "#6B8F6B" : "#ffffff")};
  border-radius: 8px;
  border: 1px solid ${(p) => (p.$active ? "#6B8F6B" : "#cfcfcf")};
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: ${(p) => (p.$active ? "#ffffff" : "#1f1f1f")};
  transition: 0.2s ease;

  span {
    color: ${(p) => (p.$active ? "#ffffff" : "#1f1f1f")};
    line-height: 1;
  }

  &:hover {
    background: ${(p) => (p.$active ? "#6B8F6B" : "rgba(107, 143, 107, 0.08)")};
  }
`;

export const UserPillIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
`;
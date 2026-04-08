// ✅ profileStyles.js
import styled from "styled-components";

export const PageWrapper = styled.div`

  min-height: 100vh;
  height: 100vh;          
  width: 100%;
  background: #eefdf4;
  font-family: "Poppins", sans-serif;
  overflow-y: auto;       
`;

/* ✅ HEADER (outer full width) */

export const HeaderBar = styled.header`
  width: 100%;
  height: 100px;
  background: #ffffff;

  display: flex;
  align-items: center;

  padding: 0;

  /* ✅ cleaner shadow (no extra white blur) */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  position: relative;
  z-index: 10;
`;
/* ✅ HEADER (inner centered container like your 2nd photo) */
export const HeaderContainer = styled.div`
  width: min(1512px, 100%);
  margin: 0 0;
  padding: 20px 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 900px) {
    padding: 16px 18px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media (max-width: 900px) {
    gap: 18px;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

/* ✅ Logo already contains PlantCare text */
export const BrandLogo = styled.img`
  height: 55px;
  width: auto;
  object-fit: contain;

  @media (max-width: 900px) {
    height: 46px;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 26px;

  @media (max-width: 900px) {
    gap: 12px;
  }
`;

export const NavLinkBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 8px 10px;
  border-radius: 10px;

  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #2e2e2e;

  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }

  &:hover {
    background: rgba(61, 140, 99, 0.1);
  }

  @media (max-width: 900px) {
    span {
      display: none;
    }
  }
`;

export const UserPill = styled.button`
  width: 172px;
  height: 50px;
  padding: 0 14px;

  background: #3a7d5d;
  border-radius: 10px;
  border: none;

  display: inline-flex;
  align-items: center;
  justify-content: flex-start; /* ✅ name to the left */
  gap: 10px;

  cursor: pointer;

  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;

  @media (max-width: 900px) {
    width: auto;
    height: 44px;
    font-size: 16px;
  }
`;

export const UserPillIcon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

/* ✅ CARD */
export const Card = styled.div`
  width: min(1064px, 92%);
  margin: 120px auto 40px;
  display: flex;
  background: #ffffff;
  border-radius: 25px;
  overflow: hidden;
  border: 0.5px solid #6b6b6b;

  @media (max-width: 900px) {
    flex-direction: column;
    margin-top: 40px;
  }
`;

export const LeftSection = styled.div`
  width: 383px;
  background: #fafafa;
  padding: 40px;
  text-align: center;
  border-right: 0.5px solid #6b6b6b;

  @media (max-width: 900px) {
    width: 100%;
    border-right: none;
    border-bottom: 0.5px solid #6b6b6b;
  }
`;

export const AvatarRing = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 1px solid #6b6b6b;
  margin: 40px auto 18px;
  display: grid;
  place-items: center;
`;

export const AvatarWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ChangePhotoBtn = styled.button`
  background: #a8d5ba;
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
`;

export const RightSection = styled.div`
  flex: 1;
  padding: 45px 55px;

  @media (max-width: 900px) {
    padding: 30px 22px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 25px;
  margin: 0 0 14px;
  font-weight: 600;
  color: #000;
`;

export const Divider = styled.hr`
  margin: 26px 0 10px;
  border: none;
  border-top: 0.5px solid rgba(107, 107, 107, 0.6);
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 14px 0;
  color: #2e2e2e;
`;

export const ValueText = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: #2e2e2e;
`;

export const SmallText = styled.div`
  font-size: 18px;
  color: #6b6b6b;
`;

export const Input = styled.input`
  width: min(520px, 100%);
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #cfcfcf;
  font-size: 18px;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
`;

export const EditButton = styled.button`
  background: ${(p) => (p.admin ? "#6C63FF" : "#3A7D5D")};
  color: #fff;
  border: none;
  padding: 16px 26px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
`;

export const LogoutButton = styled.button`
  border: 1px solid #e34f4f;
  color: #e34f4f;
  background: transparent;
  padding: 16px 26px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
`;

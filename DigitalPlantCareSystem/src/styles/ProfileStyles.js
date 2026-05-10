import styled from "styled-components";
import { COLORS } from "./colors";

export const Page = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 30px 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
`;

export const CardTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${COLORS.primaryText};
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldWrap = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${COLORS.secondaryText};
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1.5px solid ${(p) => (p.$err ? "#e53e3e" : "#e2e8f0")};
  font-size: 0.92rem;
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border-color: ${(p) => (p.$admin ? "#7C3AED" : COLORS.primaryGreen)};
  }
  &:disabled {
    background: #f8f8f8;
    color: ${COLORS.secondaryText};
  }
`;

export const ErrText = styled.p`
  color: #e53e3e;
  font-size: 0.76rem;
  margin: 3px 0 0;
`;

export const SaveBtn = styled.button`
  background: ${(p) => (p.$admin ? "#7C3AED" : COLORS.primaryGreen)};
  color: white;
  border: none;
  padding: 11px 24px;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  &:hover {
    background: ${(p) => (p.$admin ? "#6D28D9" : COLORS.primaryButtonHover)};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AlertBox = styled.div`
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  margin-bottom: 14px;
  background: ${(p) => (p.$success ? "#f0fdf4" : "#fff5f5")};
  border: 1px solid ${(p) => (p.$success ? COLORS.healthyStroke : "#feb2b2")};
  color: ${(p) => (p.$success ? "#276749" : "#c53030")};
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-size: 0.83rem;
  color: ${COLORS.secondaryText};
`;

export const InfoValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${COLORS.primaryText};
`;

export const RoleBadge = styled.span`
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${(p) => (p.$admin ? "#EDE9FE" : COLORS.backgroundGreen)};
  color: ${(p) => (p.$admin ? "#7C3AED" : COLORS.primaryGreen)};
`;

export const LogoutBtn = styled.button`
  background: transparent;
  border: 1.5px solid #e53e3e;
  color: #e53e3e;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  &:hover { background: #fff5f5; }
`;

export const AvatarWrap = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
`;

export const AvatarCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${(p) => (p.$admin ? "#7C3AED" : COLORS.primaryGreen)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: 700;
  overflow: hidden;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const ChangePhotoBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${(p) => (p.$admin ? "#7C3AED" : COLORS.primaryGreen)};
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  &:hover { opacity: 0.85; }
`;

export const DeleteAccountBtn = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover { background: #c53030; }
`;

export const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ConfirmBox = styled.div`
  background: white;
  border-radius: 20px;
  padding: 36px 32px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

export const ConfirmInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1.5px solid ${(p) => (p.$err ? "#e53e3e" : "#e2e8f0")};
  font-size: 0.92rem;
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  outline: none;
  margin-top: 12px;
  &:focus { border-color: #e53e3e; }
`;

export const ConfirmDeleteBtn = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 11px 24px;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  &:hover { background: #c53030; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const CancelBtn = styled.button`
  background: none;
  border: 1.5px solid #e2e8f0;
  padding: 11px 24px;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  color: ${COLORS.secondaryText};
  &:hover { background: #f8f8f8; }
`;
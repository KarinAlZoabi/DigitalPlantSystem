import styled from "styled-components";
import { COLORS } from "./colors";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const Modal = styled.div`
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;
export const Header = styled.div`
  padding: 24px 28px 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;
export const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: ${COLORS.primaryText};
`;
export const Subtitle = styled.p`
  margin: 2px 0 0;
  font-size: 0.85rem;
  color: ${COLORS.secondaryText};
`;
export const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.secondaryText};
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  &:hover {
    background: #f0f0f0;
  }
`;
export const Body = styled.div`
  padding: 20px 28px;
  overflow-y: auto;
  flex: 1;
`;
export const Footer = styled.div`
  padding: 16px 28px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
`;

// Step 1 — Search + Grid
export const SearchWrap = styled.div`
  position: relative;
  margin-bottom: 18px;
`;
export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.secondaryText};
  font-size: 18px;
`;
export const SearchInput = styled.input`
  width: 100%;
  padding: 11px 14px 11px 40px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  font-size: 0.92rem;
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border-color: ${COLORS.primaryGreen};
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 12px;
`;
export const PlantCard = styled.div`
  border: 2px solid ${(p) => (p.$sel ? COLORS.primaryGreen : "#e8e8e8")};
  border-radius: 14px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s;
  background: ${(p) => (p.$sel ? COLORS.backgroundGreen : "white")};
  &:hover {
    border-color: ${COLORS.primaryGreen};
    transform: translateY(-2px);
  }
`;
export const PlantCardImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;
export const PlantCardBody = styled.div`
  padding: 10px 12px;
`;
export const PlantCardName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${COLORS.primaryText};
`;
export const PlantCardSci = styled.div`
  font-size: 0.76rem;
  color: ${COLORS.secondaryText};
  font-style: italic;
  margin-top: 2px;
`;
export const DiffBadge = styled.span`
  display: inline-block;
  font-size: 0.68rem;
  padding: 2px 8px;
  border-radius: 20px;
  margin-top: 4px;
  background: ${(p) =>
    p.$d === "Easy" || p.$d === "Beginner"
      ? "#f0fdf4"
      : p.$d === "Hard"
        ? "#fff5f5"
        : "#fffbeb"};
  color: ${(p) =>
    p.$d === "Easy" || p.$d === "Beginner"
      ? COLORS.healthy
      : p.$d === "Hard"
        ? COLORS.criticalStroke
        : COLORS.attentionStroke};
`;

// Step 2 — Details form
export const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.primaryGreen};
  font-size: 0.88rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  margin-bottom: 18px;
  &:hover {
    text-decoration: underline;
  }
`;
export const Preview = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: ${COLORS.backgroundGreen};
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 20px;
`;
export const PreviewImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
`;
export const Label = styled.label`
  display: block;
  font-size: 0.83rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${COLORS.primaryText};
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
    border-color: ${COLORS.primaryGreen};
  }
`;
export const Select = styled.select`
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  font-size: 0.92rem;
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  outline: none;
  background: white;
  &:focus {
    border-color: ${COLORS.primaryGreen};
  }
`;
export const FieldWrap = styled.div`
  margin-bottom: 16px;
`;
export const ErrText = styled.p`
  color: #e53e3e;
  font-size: 0.76rem;
  margin: 3px 0 0;
`;
export const HintText = styled.div`
  font-size: 0.76rem;
  color: ${COLORS.secondaryText};
  margin-top: 3px;
`;
export const CancelBtn = styled.button`
  background: none;
  border: 1.5px solid #e2e8f0;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  color: ${COLORS.secondaryText};
  &:hover {
    background: #f8f8f8;
  }
`;
export const AddBtn = styled.button`
  background: ${COLORS.primaryGreen};
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  &:hover {
    background: ${COLORS.primaryButtonHover};
  }
  &:disabled {
    background: ${COLORS.primaryButtonDisabled};
    cursor: not-allowed;
  }
`;
export const EmptyMsg = styled.div`
  text-align: center;
  color: ${COLORS.secondaryText};
  padding: 40px 0;
  font-size: 0.92rem;
`;

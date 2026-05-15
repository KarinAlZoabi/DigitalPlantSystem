import styled from "styled-components";
import { COLORS } from "../styles/colors";

const PageContainer = styled.div`
  background-color: ${COLORS.backgroundGreen};
  min-height: 100vh;
  padding: 20px 50px;

  /* Responsive padding */
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;
const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${COLORS.primaryText};
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr; /* Sidebar fixed, content grows */
  gap: 40px;
  align-items: start;

  /* Responsive Switch: Stack sidebar on top of content */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Sidebar = styled.div`
  background: ${COLORS.white};
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
`;

const PlantImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 250px; /* Shorter image on small phones */
  }
`;

const SidebarContent = styled.div`
  padding: 25px;
  h1 {
    margin: 0;
    font-size: 32px;
    color: ${COLORS.primaryText};
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
  p.scientific {
    font-style: italic;
    color: ${COLORS.secondaryText};
    margin-bottom: 20px;
    margin-top: 0;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "delete"
      ? COLORS.deleteButton
      : props.variant === "secondary"
        ? COLORS.white
        : COLORS.primaryButton};
  color: ${(props) =>
    props.variant === "secondary" ? COLORS.primaryButton : COLORS.white};
  border: ${(props) =>
    props.variant === "secondary"
      ? `2px solid ${COLORS.primaryButton}`
      : "none"};

      &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 0.9rem;
  }
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.$bgColor};
  color: ${COLORS.primaryText};
  padding: 6px 16px;
  border-radius: 12px;
  width: fit-content;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.$borderColor};
`;

const BadgeIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
`;

const NicknameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  h1 {
    margin: 0;
  }
`;

const NicknameEditRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const NicknameInput = styled.input`
  border: 1.5px solid #d7e5d4;
  border-radius: 12px;
  padding: 10px 12px;
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1f2937;
  min-width: 220px;
  max-width: 360px;
  width: min(100%, 360px);
  outline: none;
  background: #ffffff;

  &:focus {
    border-color: #2f6b4f;
    box-shadow: 0 0 0 3px rgba(47, 107, 79, 0.12);
  }
`;

const IconButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: #eaf4e7;
  color: #2f6b4f;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;

  .material-symbols-outlined {
    font-size: 20px;
  }

  &:hover {
    background: #d8ead3;
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
  }
`;

export {
    PageContainer,
    BackButton,
    DetailsGrid,
    Sidebar,
    PlantImg,
    SidebarContent,
    ActionButton,
    StatusBadge,
    BadgeIcon,
    NicknameRow,
    NicknameInput,
    NicknameEditRow,
    IconButton
}


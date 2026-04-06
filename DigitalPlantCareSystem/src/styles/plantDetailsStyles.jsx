import styled from "styled-components";
import { COLORS } from "../styles/colors";

const PageContainer = styled.div`
  background-color: ${COLORS.backgroundGreen};
  min-height: 100vh;
  padding: 20px 50px;
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
  grid-template-columns: 400px 1fr;
  gap: 40px;
  align-items: start;
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
`;

const SidebarContent = styled.div`
  padding: 25px;
  h1 {
    margin: 0;
    font-size: 32px;
    color: ${COLORS.primaryText};
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

export {
    PageContainer,
    BackButton,
    DetailsGrid,
    Sidebar,
    PlantImg,
    SidebarContent,
    ActionButton,
    StatusBadge,
    BadgeIcon
}
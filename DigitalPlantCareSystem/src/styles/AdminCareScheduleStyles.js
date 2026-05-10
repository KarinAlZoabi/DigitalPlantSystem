import styled from "styled-components";
import { COLORS } from "./colors";

export const Page = styled.div`
  min-height: 100vh;
  background: #f7f5ff;
  font-family: Poppins, sans-serif;
`;

/* Add to AdminCareScheduleStyles.js */
export const ScrollContainer = styled.div`
  max-height: 320px; /* Approximately 4 plants height */
  overflow-y: auto;
  padding-right: 8px;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 10px;
  }
`;

export const Inner = styled.div`
  width: min(1100px, 92%);
  margin: 0 auto;
  padding: 36px 0 60px;
`;

export const PageTitle = styled.h1`
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.primaryText};
`;

export const PageSub = styled.p`
  margin: 0 0 28px;
  font-size: 14px;
  color: ${COLORS.secondaryText};
`;

// Stat Cards Grid
export const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 36px;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 22px 16px;
  border: 1px solid #e5e7eb;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
`;

export const StatIconWrap = styled.div`
  font-size: 22px;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: ${COLORS.secondaryText};
`;

export const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.primaryText};
`;

// Section Components
export const Section = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 22px;
  margin-bottom: 28px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.primaryText};
  margin-bottom: 16px;
`;

export const PlantRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const PlantLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PlantThumb = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const PlantName = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: ${COLORS.primaryText};
`;

export const PlantSci = styled.div`
  font-size: 12px;
  color: ${COLORS.secondaryText};
  font-style: italic;
  margin-top: 2px;
`;

export const FreqBadge = styled.span`
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  /* Dynamic styling based on the care type */
  background: ${(p) => (p.$type === "watering" ? "#eff6ff" : "#f0fdf4")};
  color: ${(p) => (p.$type === "watering" ? "#1d4ed8" : "#166534")};
  border: 1px solid ${(p) => (p.$type === "watering" ? "#bfdbfe" : "#bbf7d0")};
`;

export const EmptyMsg = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
`;
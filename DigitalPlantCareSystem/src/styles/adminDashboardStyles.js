
import styled from "styled-components";

export const AdminPage = styled.div`
  min-height: 100vh;
  background: #f7f5ff;
  font-family: "Poppins", sans-serif;
`;

export const Content = styled.div`
  width: min(1392px, 92%);
  margin: 0 auto;
  padding: 36px 0 60px;
`;

export const Title = styled.h1`
  margin: 22px 0 4px;
  font-size: 30px;
  font-weight: 700;
  color: #2e2e2e;
`;

export const Subtitle = styled.p`
  margin: 0 0 26px;
  font-size: 20px;
  font-weight: 400;
  color: #6b6b6b;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 22px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #ffffff;
  border: 0.5px solid #6b6b6b;
  border-radius: 20px;
  padding: 18px 18px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatLeft = styled.div``;

export const StatLabel = styled.div`
  font-size: 25px;
  font-weight: 400;
  color: #6b6b6b;
`;

export const StatValue = styled.div`
  margin-top: 6px;
  font-size: 45px;
  font-weight: 700;
  color: ${(p) => p.color || "#2e2e2e"};
  line-height: 1;
`;

export const StatHint = styled.div`
  margin-top: 8px;
  font-size: 22px;
  font-weight: 400;
  color: #6b6b6b;
`;

export const StatIconCircle = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: ${(p) => p.bg || "#f3e8ff"};
  display: grid;
  place-items: center;
  flex: 0 0 auto;
`;

export const Icon = styled.div`
  width: ${(p) => p.size || 34}px;
  height: ${(p) => p.size || 34}px;
  border-radius: 10px;
  background: ${(p) => p.color || "#9810fa"};
`;

export const Section = styled.div`
  margin-top: 34px;
  background: #ffffff;
  border: 0.5px solid #6b6b6b;
  border-radius: 20px;
  padding: 18px 18px 22px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  color: #000000;
`;

export const ViewAll = styled.button`
  border: none;
  background: transparent;
  font-size: 30px;
  font-weight: 500;
  color: #2e2e2e;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ActionsGrid = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 22px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

/* ✅ QUICK ACTIONS: EXACT LIKE SCREENSHOT */
export const ActionCard = styled.div`
  position: relative;
  background: #ffffff;
  border: 0.5px solid #6b6b6b;
  border-radius: 20px;
  padding: 18px;
  min-height: 120px;
`;

export const ActionLeft = styled.div`
  display: flex;
  flex-direction: column;   /* icon top, text under */
  align-items: flex-start;
  gap: 10px;
`;

export const ActionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ActionTitle = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: #2e2e2e;
`;

export const ActionDesc = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #6b6b6b;
`;

/* ✅ arrow button top right */
export const ArrowBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;

  background: transparent;   /* no background */
  border: none;              /* ❌ remove border */
  cursor: pointer;

  display: grid;
  place-items: center;

  &:hover {
    opacity: 0.7;
  }

  &::before {
    content: "➜";
    font-size: 26px;
    color: #2e2e2e;
  }
`;

export const PlantsList = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const PlantRow = styled.div`
  border: 1px solid #6b6b6b;
  border-radius: 15px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  /* ✅ So the ArrowBtn in plants stays normal (not absolute) */
  position: relative;
`;

export const PlantLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const PlantImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background: #e9e9e9;
  flex: 0 0 auto;
`;

export const PlantInfo = styled.div``;

export const PlantName = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: #000;
`;

export const PlantLatin = styled.div`
  margin-top: 2px;
  font-size: 18px;
  font-weight: 400;
  font-style: italic;
  color: #6b6b6b;
`;

export const PlantMeta = styled.div`
  margin-top: 8px;
  font-size: 15px;
  font-weight: 400;
  color: #6b6b6b;
`;
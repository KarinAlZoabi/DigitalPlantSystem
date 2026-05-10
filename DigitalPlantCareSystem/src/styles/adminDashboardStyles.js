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
  font-size: 24px;  /* was 30px */
  font-weight: 600;  /* was 700 */
  color: #1a1a1a;  /* was #2e2e2e */
`;

export const Subtitle = styled.p`
  margin: 0 0 24px;  /* was 26px */
  font-size: 16px;  /* was 20px */
  font-weight: 400;
  color: #6b7280;  /* was #6b6b6b */
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 20px;  /* was 22px */
  margin-bottom: 32px;  /* added */

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #ffffff;
  border:  0.5px solid #6b6b6b ;
  border-radius: 16px;  /* was 20px */
  padding: 20px;  /* was 18px 18px 16px */
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #d1d5db;
  }
`;

export const StatLeft = styled.div`
  flex: 1;  /* added */
`;

export const StatLabel = styled.div`
  font-size: 14px;  /* was 25px */
  font-weight: 500;  /* was 400 */
  color: #6b7280;  /* was #6b6b6b */
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatValue = styled.div`
  margin-top: 8px;  /* was 6px */
  font-size: 32px;  /* was 45px */
  font-weight: 700;
  color: ${(p) => p.color || "#111827"};  /* was #2e2e2e */
  line-height: 1.2;
`;

export const StatHint = styled.div`
  margin-top: 4px;  /* was 8px */
  font-size: 13px;  /* was 22px */
  font-weight: 400;
  color: #9ca3af;  /* was #6b6b6b */
`;

export const StatIconCircle = styled.div`
  width: 48px;  /* was 75px */
  height: 48px;  /* was 75px */
  border-radius: 50%;
  background: ${(p) => p.bg || "#f3e8ff"};
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  
  img {
    width: 24px !important;
    height: 24px !important;
  }
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
  border: 0.5px solid #6b6b6b ;
  border-radius: 16px;  /* was 20px */
  padding: 24px;  /* was 18px 18px 22px */
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;  /* added */
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 18px;  /* was 30px */
  font-weight: 600;  /* was 400 */
  color: #1f2937;  /* was #000000 */
`;

export const ViewAll = styled.button`
  border: none;
  background: transparent;
  font-size: 14px;  /* was 30px */
  font-weight: 500;
  color: #6b7280;  /* was #2e2e2e */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;  /* was 8px */
  transition: color 0.2s;
  
  &:hover {
    color: #9810fa;
  }
  
  span {
    font-size: 14px;
  }
`;

export const ActionsGrid = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 16px;  /* was 22px */

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ✅ QUICK ACTIONS: EXACT LIKE SCREENSHOT */
export const ActionCard = styled.div`
  position: relative;
  background: #fafafc;  /* was #ffffff */
  border: 0.5px solid rgba(107, 107, 107, 1);
  border-radius: 12px;  /* was 20px */
  padding: 18px;
  min-height: 120px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    border-color: #d1d5db;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

export const ActionLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;  /* was 10px */
`;

export const ActionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ActionTitle = styled.div`
  font-size: 16px;  /* was 25px */
  font-weight: 600;
  color: #1f2937;  /* was #2e2e2e */
`;

export const ActionDesc = styled.div`
  font-size: 13px;  /* was 18px */
  font-weight: 400;
  color: #6b7280;  /* was #6b6b6b */
  line-height: 1.4;
`;

/* ✅ arrow button top right */
export const ArrowBtn = styled.button`
  position: absolute;
  top: 18px;  /* was 16px */
  right: 18px;  /* was 16px */
  background: transparent;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 18px;
  color: #9ca3af;
  transition: color 0.2s, transform 0.2s;

  &:hover {
    color: #9810fa;
    transform: translateX(2px);
    opacity: 0.7;
  }

  &::before {
    content: "➜";
    font-size: 18px;  /* was 26px */
    color: #9ca3af;
  }
  
  &:hover::before {
    color: #9810fa;
  }
`;

export const PlantsList = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;  /* was 18px */
`;

export const PlantRow = styled.div`
  border: 0.5px solid #6b6b6b;
  border-radius: 12px;  /* was 15px */
  padding: 16px;  /* was 12px 14px */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fafafc;
    border-color: #d1d5db;
  }
`;

export const PlantLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;  /* was 14px */
`;

export const PlantImg = styled.div`
  width: 56px;  /* was 100px */
  height: 56px;  /* was 100px */
  border-radius: 12px;  /* was 15px */
  background: linear-gradient(135deg, #e8f0fe 0%, #d9e8fb 100%);  /* was #e9e9e9 */
  flex: 0 0 auto;
`;

export const PlantInfo = styled.div`
  flex: 1;
`;

export const PlantName = styled.div`
  font-size: 16px;  /* was 25px */
  font-weight: 600;  /* was 500 */
  color: #1f2937;  /* was #000 */
`;

export const PlantLatin = styled.div`
  margin-top: 2px;
  font-size: 13px;  /* was 18px */
  font-weight: 400;
  font-style: italic;
  color: #6b7280;  /* was #6b6b6b */
`;

export const PlantMeta = styled.div`
  margin-top: 6px;  /* was 8px */
  font-size: 12px;  /* was 15px */
  font-weight: 400;
  color: #9ca3af;  /* was #6b6b6b */
  display: flex;
  gap: 12px;
`;
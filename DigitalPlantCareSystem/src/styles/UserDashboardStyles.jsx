import styled, { keyframes } from "styled-components";
import { COLORS } from "./colors";

export const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30px 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
  }
`;

export const AddPlantButton = styled.button`
  background: ${COLORS.primaryButton};
  color: ${COLORS.white};
  padding: 10px 30px;
  border: none;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap; /* Prevents text from wrapping inside the button */

  &:hover {
    background-color: ${COLORS.primaryButtonHover};
    transition: background-color 0.3s ease;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

export const PageSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  gap: 20px;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2x2 grid on tablets */
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column; /* Stack vertically on phones */
    padding: 10px 20px;
  }
`;

// This targets the specific container for your PillSelector
export const FilterSection = styled(PageSection)`
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 10px 50px;
  overflow: hidden; /* Keeps children from breaking the page width */

  @media (max-width: 768px) {
    padding: 10px 20px;
    display: block; /* Overrides the grid/flex logic for simpler mobile scrolling */
  }
`;

export const StatDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.secondaryText};
  width: 100%; /* Changed from 300px to 100% */
  max-width: 300px; /* Limits size on desktop */
  height: 110px;
  border-radius: 20px;
  padding: 25px 30px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: none; /* Allows cards to fill the full width of the phone */
  }
`;

export const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
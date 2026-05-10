import styled from "styled-components";
import { COLORS } from "./colors";

export const PageContainer = styled.div`
  background-color: #F7F2FF;
  min-height: 100vh;
  padding: 20px 50px;
  /* Crucial: prevents padding from adding to the width */
  box-sizing: border-box; 
  width: 100%;
  overflow-x: hidden; /* Safety net for horizontal scroll */

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px 12px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6D28D9;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 15px;
  /* Prevent long button text from pushing out */
  max-width: 100%; 

  span {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

export const DetailsGrid = styled.div`
  display: grid;
  /* Use minmax(0, 1fr) to allow the right side to shrink to zero if needed */
  grid-template-columns: 400px minmax(0, 1fr); 
  gap: 40px;
  align-items: start;
  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr; /* Force single column earlier */
    gap: 20px;
  }
`;

export const Sidebar = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0px 4px 24px rgba(109, 40, 217, 0.12);
  /* Ensure the sidebar never exceeds the screen width */
  width: 100%;
  max-width: 100%; 
  box-sizing: border-box;

  @media (max-width: 480px) {
    border-radius: 16px;
  }
`;

export const PlantImg = styled.img`
  width: 100%;
  /* Auto height on mobile can sometimes be safer than fixed px */
  height: 320px; 
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 220px;
  }
`;

export const SidebarContent = styled.div`
  padding: 25px;
  box-sizing: border-box;
  width: 100%;

  h1 {
    margin: 0;
    font-size: 32px;
    color: #2E1065;
    /* Force long nicknames to wrap instead of pushing width */
    word-wrap: break-word; 
    overflow-wrap: break-word;
  }

  p.scientific {
    font-style: italic;
    color: #7C6F9B;
    margin-top: 6px;
    margin-bottom: 18px;
    word-wrap: break-word;
  }

  @media (max-width: 480px) {
    padding: 20px 16px;

    h1 {
      font-size: 1.5rem; /* Using rem is safer for mobile accessibility */
    }
  }
`;

export const InfoCard = styled.div`
  padding: 0px;
  width: 100%;
  box-sizing: border-box;
  /* Ensure the content inside tabs doesn't blow out the width */
  overflow: hidden; 
`;
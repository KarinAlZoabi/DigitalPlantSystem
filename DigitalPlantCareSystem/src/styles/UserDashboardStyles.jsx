import styled, { keyframes }  from "styled-components";
import { COLORS } from "./colors";

export const TopDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 30px 50px;
`

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

&:hover {
    background-color: ${COLORS.primaryButtonHover};
    transition: background-color 0.3s ease;
    };
  }

`

export const PageSection = styled.section`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 50px;
gap: 40px;
`

export const FilterSection = styled(PageSection)`
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 10px 50px;
`;

export const StatDiv = styled.div`
display: flex;
flex-direction: column;
align-items: left;
justify-content: center;
background: ${COLORS.white};
border: 1px solid ${COLORS.secondaryText};
width:300px;
height: 60px;
border-radius: 20px;
padding: 25px 30px;

`

export const PlantGrid = styled.div`
  display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
  width: 100%;
  box-sizing: border-box;

  /* Responsive: 2 columns on tablets, 1 on mobile */
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
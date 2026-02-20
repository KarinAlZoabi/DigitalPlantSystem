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

export const StatDiv = styled.div`
display: flex;
flex-direction: column;
align-items: left;
justify-content: center;
background: ${COLORS.white};
border: 1px solid ${COLORS.secondaryText};
width:300px;
height: 80px;
border-radius: 20px;
padding: 30px 30px;

`
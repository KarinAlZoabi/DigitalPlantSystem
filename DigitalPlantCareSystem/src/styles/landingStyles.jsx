import styled, { keyframes }  from "styled-components";
import { COLORS } from "./colors";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;


export const HeaderDiv = styled.div`
display: flex;
flex-direction: row;
padding: 30px 50px 20px 50px;
align-items: center;
justify-content: space-between;
animation: ${fadeIn} 0.6s ease-out;`

export const LoginBtn = styled.button`
  background-color: ${COLORS.white};
  width: 90px;
  padding: 10px;
  border-radius: 12px;
  border-color: ${COLORS.secondaryText};
  border-width: 1px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;


  &:hover {
    background-color: ${COLORS.modalGray};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

`;
export const ColoredBtn = styled.button`
  background-color: ${COLORS.primaryButton};
  width: 90px;
  padding: 10px;
  border-radius: 12px;
  border: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    background-color: ${COLORS.primaryButtonHover};
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  &:active {
    transform: scale(0.98);
  }
  color: ${COLORS.white};

`;

//HERO STYLES

export const HeroSection = styled.section`
  width: 100%;
  height: 100vh;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  display: flex;
  flex-direction: column; 
  align-items: left;
  justify-content: center;
  text-align: left;

  & > div {
    animation: ${fadeIn} 0.8s ease-out;
  }
`;

export const LandingMainText = styled.p`
color: ${COLORS.primaryText};
font-size: 50px;
font-weight: bold;
`

export const LandingSubText = styled.p`
color: ${COLORS.secondaryText};
font-size: 20px;`

//FEATURES
export const FeatureSection = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 30px;
`

export const FeatureCard = styled.div`
border-radius: 25px;
border: 1px solid ${COLORS.secondaryText};
background: ${COLORS.white};
display: flex;
flex-direction: column;
align-items: left;
justify-content: center;
height: 150px;
width: 300px;
padding: 10px 20px;
gap: 20px;

box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: default;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    border-color: ${COLORS.primaryGreen};
  }
`
export const FeatureTitle = styled.p`
color: ${COLORS.primaryText};
font-size: 20px;
font-weight: bold;
`
export const FeatureDescription = styled.p`
color: ${COLORS.secondaryText};
font-size: 12px;
`

//CTA section
export const CTAsection = styled.section`
background: ${COLORS.backgroundGreen};
display: flex;
justify-content: center;
align-items: center;
padding: 50px;`;

export const CTAbtn = styled(ColoredBtn)`
background: ${COLORS.white};
color: ${COLORS.primaryText};
width: 200px;
border: 0;
font-weight: bold;



  &:hover {
    background-color: ${COLORS.modalGray};
    transform: scale(1.08);
  }
    `;

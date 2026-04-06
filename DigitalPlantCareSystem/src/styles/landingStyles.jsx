import styled, { keyframes }  from "styled-components";
import { COLORS } from "./colors";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Breakpoints for easier maintenance
const device = {
  mobile: `(max-width: 768px)`,
};


export const HeaderDiv = styled.div`
display: flex;
flex-direction: row;
padding:20px 5%;
align-items: center;
justify-content: space-between;
animation: ${fadeIn} 0.6s ease-out;

@media ${device.mobile} {
    padding: 15px 20px;
  }`;

export const LogoImg = styled.img`
  width: 120px;
  @media ${device.mobile} {
    width: 90px;
  }
`;  

export const LoginBtn = styled.button`
  background-color: ${COLORS.white};
  font-family: poppins;
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
    font-family: poppins;
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
  height: 90vh;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  display: flex;
  flex-direction: column; 
  align-items: left;
  justify-content: center;
  text-align: left;
    font-family: poppins;

  & > div {
    animation: ${fadeIn} 0.8s ease-out;
  }

  @media ${device.mobile} {
    text-align: center;
    justify-content: center;
    min-height: 60vh;
  }
`;

export const HeroContent = styled.div`
  padding: 50px;
  width: 50%;
  animation: ${fadeIn} 0.8s ease-out;

  @media ${device.mobile} {
    width: 100%;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const LandingMainText = styled.h1`
color: ${COLORS.primaryText};
font-size: clamp(30px, 5vw, 50px);
font-weight: bold;
margin-bottom: 0;
line-height: 60px;

@media ${device.mobile} {
    font-size: 32px;
  }
`

export const LandingSubText = styled.p`
color: ${COLORS.secondaryText};
font-size: clamp(16px, 2vw, 20px);
`

//FEATURES
export const FeatureSection = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 30px;
  font-family: poppins;
`;

export const FeatureGrid = styled.div`
  display: grid;
  /* Desktop: Exactly 4 columns */
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1400px; /* Increased this to give 4 cards more breathing room */
  margin: 40px auto 0 auto; /* Centers the grid itself */

  /* Tablet: 2 columns */
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
  }

  /* Mobile: 1 column */
  @media ${device.mobile} {
    grid-column-gap: 0;
    grid-template-columns: 1fr;
    padding: 0 10px;
  }
`;

export const FeatureCard = styled.div`
  border-radius: 25px;
  border: 1px solid ${COLORS.secondaryText};
  background: ${COLORS.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start; /* Start from top so text doesn't jitter */
  
  /* CRITICAL: No fixed widths here */
  width: 100%; 
  min-height: 180px; 
  padding: 24px;
  box-sizing: border-box; /* Ensures padding stays inside the 100% width */

  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    border-color: ${COLORS.primaryGreen};
  }
`;
export const FeatureTitle = styled.p`
color: ${COLORS.primaryText};
font-size: 20px;
font-weight: bold;
margin-bottom: 0;
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
padding: 50px;
  font-family: poppins;`;

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

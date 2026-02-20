import styled, { keyframes }  from "styled-components";
import { COLORS } from "./colors";

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;



export const HeaderDiv = styled.div`
display: flex;
flex-direction: row;
padding: 30px 50px 20px 50px;
align-items: center;
justify-content: space-between;
position: sticky;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
background: white;
`;

export const WrapperDiv = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

export const ButtonNav = styled.button`
padding:10px 20px;
background-color: ${props => props.$isActive ? COLORS.primaryButton : "transparent"};
color: ${props => props.$isActive ? COLORS.white : COLORS.primaryText};
border-radius: 10px;
border: none;
display: inline-flex;
flex-direction: row;
gap:5px;
align-items: center;
justify-content: center;
font-size: 15px;
cursor: pointer;

/* Hover Logic */
  &:hover {
    background-color: ${props => 
      props.$isActive 
        ? COLORS.primaryButtonHover 
        : COLORS.modalGray
    };
     transition: background-color 0.3s ease;
  }

  /* SVG & Icon Logic */
  .material-symbols-outlined {
    color: inherit;
  }

  img {
    width: 25px;
    filter: ${props => props.$isActive 
      ? "brightness(0) invert(1)" 
      : "grayscale(100%) brightness(0.18)"}; 
    
    transition: filter 0.3s ease;
  }
`

export const ProfileButton = styled.button`
padding:10px 20px;
background-color: transparent;
color: ${COLORS.primaryText};
border-radius: 10px;
border: 1px solid ${COLORS.primaryText};
display: inline-flex;
flex-direction: row;
gap:5px;
align-items: center;
justify-content: center;
font-size: 15px;
cursor: pointer;

&:hover {
    background-color: ${COLORS.modalGray};
    transition: background-color 0.3s ease;
    };
  }


`
import styled from "styled-components";
import { COLORS } from "./colors";

export const Page = styled.div`
  display: flex; 
  min-height: 100vh;
`;

export const Left = styled.div`
  flex: 1; 
  background-image: url(${p => p.$bg});
  background-size: cover; 
  background-position: center;
  display: none;
  
  /* Show high-quality hero image only on tablets and desktops */
  @media(min-width: 900px){ 
    display: flex; 
    align-items: flex-end; 
    padding: 40px; 
  }
`;

export const LeftQuote = styled.div`
  color: white; 
  font-size: 1.5rem; 
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5); 
  max-width: 380px;
  span { color: ${COLORS.secondaryGreen}; }
`;

export const Right = styled.div`
  flex: 1; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  padding: 40px 24px; 
  background: white;
`;

export const FormBox = styled.div`
  width: 100%; 
  max-width: 400px;
`;

export const LogoImg = styled.img`
  width: 140px; 
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 1.75rem; 
  font-weight: 700; 
  color: ${COLORS.primaryText}; 
  margin: 0 0 6px;
`;

export const Sub = styled.p`
  color: ${COLORS.secondaryText}; 
  margin: 0 0 28px; 
  font-size: 0.95rem;
`;

export const Label = styled.label`
  display: block; 
  font-size: 0.85rem; 
  font-weight: 600;
  color: ${COLORS.primaryText}; 
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%; 
  padding: 12px 14px; 
  border-radius: 10px;
  /* Dynamic border color based on validation error state */
  border: 1.5px solid ${p => p.$err ? "#e53e3e" : "#e2e8f0"};
  font-size: 0.95rem; 
  font-family: Poppins, sans-serif;
  box-sizing: border-box; 
  outline: none; 
  transition: border 0.2s;
  
  &:focus { border-color: ${COLORS.primaryGreen}; }
`;

export const FieldWrap = styled.div`
  margin-bottom: 18px;
`;

export const ErrText = styled.p`
  color: #e53e3e; 
  font-size: 0.8rem; 
  margin: 4px 0 0;
`;

export const Btn = styled.button`
  width: 100%; 
  padding: 13px; 
  border: none; 
  border-radius: 10px;
  background: ${COLORS.primaryGreen}; 
  color: white; 
  font-size: 1rem;
  font-weight: 600; 
  font-family: Poppins, sans-serif; 
  cursor: pointer;
  transition: background 0.2s; 
  margin-top: 6px;
  
  &:hover { background: ${COLORS.primaryButtonHover}; }
  &:disabled { 
    background: ${COLORS.primaryButtonDisabled}; 
    cursor: not-allowed; 
  }
`;

export const ForgotLink = styled.div`
  /* Using div for alignment since the link is inside */
  font-size: 0.82rem; 
  float: right; 
  margin-top: -14px; 
  margin-bottom: 18px; 
  
  a {
    color: ${COLORS.primaryGreen}; 
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

export const BottomText = styled.p`
  text-align: center; 
  font-size: 0.88rem; 
  color: ${COLORS.secondaryText}; 
  margin-top: 20px;
  
  a { 
    color: ${COLORS.primaryGreen}; 
    text-decoration: none; 
    font-weight: 600; 
    &:hover { text-decoration: underline; }
  }
`;

export const AlertBox = styled.div`
  background: #fff5f5; 
  border: 1px solid #feb2b2; 
  color: #c53030;
  padding: 10px 14px; 
  border-radius: 8px; 
  font-size: 0.88rem; 
  margin-bottom: 16px;
`;
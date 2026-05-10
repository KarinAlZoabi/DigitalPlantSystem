import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';

const Container = styled.div`
  display: flex;
  width: 100%; 
  max-width: 600px; 
  position: relative;
  align-items: center;
  background-color: ${COLORS.secondaryGreen};
  border-radius: 50px;
  padding: 6px;
  isolation: isolate;

  @media (max-width: 600px) {
    padding: 4px; /* Slightly tighter on mobile */
  }
`;

const Slider = styled.div`
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  width: calc((100% - 12px) / ${props => props.totalOptions});
  background-color: ${COLORS.primaryGreen};
  border-radius: 40px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${props => props.activeIndex * 100}%);
  z-index: -1; 

  @media (max-width: 600px) {
    top: 4px;
    bottom: 4px;
    left: 4px;
    width: calc((100% - 8px) / ${props => props.totalOptions});
  }
`;

const Pill = styled.button`
  background: transparent;
  color: ${COLORS.white};
  border: none;
  flex: 1;
  min-width: 0; 
  padding: 12px 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }

  /* Compact Mobile Styles */
  @media (max-width: 600px) {
    font-size: 0.75rem; /* Shrink font */
    padding: 10px 2px;  /* Reduce horizontal padding */
    font-weight: 600;
  }
`;

const Count = styled.span`
  margin-left: 6px;
  font-weight: 400;
  opacity: 0.9;

  /* Hide the number only on mobile */
  @media (max-width: 600px) {
    display: none;
  }
`;

export default function PillSelector({ options, activeValue, onChange }) {
  const activeIndex = options.findIndex(opt => opt.id === activeValue);

  return (
    <Container>
      <Slider 
        totalOptions={options.length} 
        activeIndex={activeIndex >= 0 ? activeIndex : 0} 
      />
      
      {options.map((option) => (
        <Pill
          key={option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
          {option.count !== undefined && <Count>({option.count})</Count>}
        </Pill>
      ))}
    </Container>
  );
}
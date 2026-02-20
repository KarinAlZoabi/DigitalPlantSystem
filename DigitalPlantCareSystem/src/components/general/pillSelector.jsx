import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
const Container = styled.div`
  display: inline-flex;
  position: relative; /* Needed for absolute child */
  align-items: center;
  background-color: ${COLORS.secondaryGreen};
  border-radius: 50px;
  padding: 6px;
  isolation: isolate; /* Ensures children stay above the slider */
`;

const Slider = styled.div`
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  /* Calculate width based on number of options */
  width: calc((100% - 12px) / ${props => props.totalOptions});
  background-color: ${COLORS.primaryGreen};
  border-radius: 40px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* Slide based on active index */
  transform: translateX(${props => props.activeIndex * 100}%);
  z-index: -1; 
`;

const Pill = styled.button`
  background: transparent; /* Always transparent now */
  color: ${COLORS.white};
  border: none;
  flex: 1; /* Ensure all pills are same width for perfect sliding */
  padding: 12px 24px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  z-index: 1;

  /* Remove individual hover backgrounds to keep the slide clean */
  &:hover {
    opacity: 0.8;
  }
`;

const Count = styled.span`
  margin-left: 6px;
  font-weight: 400;
  opacity: 0.9;
`;

export default function PillSelector({ options, activeValue, onChange }) {
  const activeIndex = options.findIndex(opt => opt.id === activeValue);

  return (
    <Container>
      {/* The Animated Background */}
      <Slider 
        totalOptions={options.length} 
        activeIndex={activeIndex >= 0 ? activeIndex : 0} 
      />
      
      {/* The Actual Buttons */}
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
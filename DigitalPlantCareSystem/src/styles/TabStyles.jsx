import styled from 'styled-components';
import { COLORS } from './../styles/colors';
const InfoCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.05);
  margin-bottom: 25px;
`;

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const CareBox = styled.div`
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ScheduleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${COLORS.primaryText};
  
  .material-symbols-outlined {
    font-size: 24px;
  }
`;

const NextActionLabel = styled.span`
  background-color: ${COLORS.secondaryGreen};
  color: ${COLORS.primaryGreen};
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-left: auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: ${COLORS.secondaryText};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;
`;

const PillTag = styled.span`
  border: 1px solid #E5E7EB;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  color: ${COLORS.secondaryText};
  display: inline-block;
  margin-top: 5px;
  text-transform: capitalize;
`;

const NoteArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 12px;
  border: 1px solid #eee;
  padding: 12px;
  background: #f9f9f9;
  resize: none;
  margin: 15px 0;
`;

const TimelineItem = styled.div`
  padding: 12px 0;
  border-left: 2px solid ${COLORS.secondaryGreen};
  padding-left: 20px;
  position: relative;
  margin-left: 10px;
  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 15px;
    width: 12px;
    height: 12px;
    background: ${COLORS.primaryGreen};
    border-radius: 50%;
  }
`;

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: ${props => props.bg};
  border: 1px solid ${props => props.border};
`;

const CurrentStatusSection = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.$color || COLORS.primaryGreen};
  font-size: 14px;
  margin-top: 8px;
  font-weight: 500;
`;

export {

    //careInfoTab
    InfoCard, ScheduleGrid, CareBox,ScheduleHeader,NextActionLabel,Row,InfoGrid,PillTag, 
    //growthTrackingTab
    NoteArea, TimelineItem,
    //HealthStatusTab
    CurrentStatusSection,
    StatusBox,
    StatusMessage}
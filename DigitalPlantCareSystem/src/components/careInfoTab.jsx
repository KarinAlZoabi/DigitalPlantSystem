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

export default function CareInfoTab({ plant }) {
  return (
    <>
      <InfoCard>
        <h3 style={{marginTop: 0}}>Care Schedule</h3>
        <ScheduleGrid>
          <CareBox>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, color: COLORS.iconBlue}}>
               <span className="material-symbols-outlined">water_drop</span> <strong>Watering</strong>
            </div>
            <p style={{margin: 0, color: COLORS.secondaryText}}>Every {plant.careRules.wateringFrequencyDays} days</p>
          </CareBox>
          <CareBox>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, color: COLORS.iconGreen}}>
               <span className="material-symbols-outlined">eco</span> <strong>Fertilizing</strong>
            </div>
            <p style={{margin: 0, color: COLORS.secondaryText}}>Every {plant.careRules.fertilizingFrequencyDays} days</p>
          </CareBox>
        </ScheduleGrid>
      </InfoCard>

      <InfoCard>
        <h3 style={{marginTop: 0}}>Plant Information</h3>
        <p><strong>Description:</strong> {plant.description}</p>
        <div style={{display: 'flex', gap: 40}}>
           <div><p><strong>Sunlight</strong></p><p>{plant.sunlight}</p></div>
           <div><p><strong>Difficulty</strong></p><p>{plant.difficulty}</p></div>
        </div>
      </InfoCard>
    </>
  );
}
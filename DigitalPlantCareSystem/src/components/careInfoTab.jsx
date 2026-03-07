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

export default function CareInfoTab({ plant }) {
  return (
    <>
      <InfoCard>
        <h3 style={{marginTop: 0, marginBottom: 20}}>Care Schedule</h3>
        <ScheduleGrid>
          {/* Watering Box */}
        <CareBox>
            <ScheduleHeader style={{ color: COLORS.iconBlue }}>
              <span className="material-symbols-outlined">water_drop</span> Watering
            </ScheduleHeader>
            <div style={{ color: COLORS.secondaryText }}>Every {plant.careRules.wateringFrequencyDays} days</div>
            <Row>Last watered: <strong>2d ago</strong></Row>
            <Row>Next watering: <NextActionLabel>in 5d</NextActionLabel></Row>
          </CareBox>

          {/* Fertilizing Box */}
          <CareBox>
            <ScheduleHeader style={{ color: COLORS.iconGreen }}>
              <span className="material-symbols-outlined">eco</span> Fertilizing
            </ScheduleHeader>
            <div style={{ color: COLORS.secondaryText }}>Every {plant.careRules.fertilizingFrequencyDays} days</div>
            <Row>Last fertilized: <strong>19d ago</strong></Row>
            <Row>Next fertilizing: <NextActionLabel>in 11d</NextActionLabel></Row>
          </CareBox>
        </ScheduleGrid>
      </InfoCard>

<InfoCard>
        <h3 style={{ marginTop: 0 }}>Plant Information</h3>
        <p style={{ fontWeight: 600, marginBottom: 5 }}>Description</p>
        <p style={{ color: COLORS.secondaryText, fontSize: '0.95rem', lineHeight: '1.5' }}>
          {plant.description}
        </p>
        
        <InfoGrid>
          <div>
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="material-symbols-outlined" style={{fontSize: 18}}>light_mode</span> 
              <strong>Sunlight</strong>
            </p>
            <PillTag>{plant.careRules.sunlight}</PillTag>
          </div>
          <div>
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="material-symbols-outlined" style={{fontSize: 18}}>info</span> 
              <strong>Difficulty</strong>
            </p>
            <PillTag>{plant.difficulty}</PillTag>
          </div>
        </InfoGrid>

        <div style={{ marginTop: 25 }}>
          <p style={{ fontWeight: 600, marginBottom: 5 }}>Care Notes</p>
          <p style={{ color: COLORS.secondaryText, fontSize: '0.95rem' }}>{plant.careRules.notes}</p>
        </div>
      </InfoCard>
    </>
  );
}
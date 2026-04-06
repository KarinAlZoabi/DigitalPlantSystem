import { 
  InfoCard, 
  ScheduleGrid, 
  CareBox, 
  ScheduleHeader, 
  NextActionLabel, 
  Row, 
  InfoGrid, 
  PillTag 
} from "./../styles/TabStyles";
import { COLORS } from './../styles/colors';
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
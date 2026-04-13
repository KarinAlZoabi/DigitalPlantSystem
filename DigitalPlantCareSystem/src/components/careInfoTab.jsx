import {
  InfoCard,
  ScheduleGrid,
  CareBox,
  ScheduleHeader,
  NextActionLabel,
  Row,
  InfoGrid,
  PillTag,
} from "./../styles/TabStyles";
import { COLORS } from "./../styles/colors";
import { daysBetween } from "../../../backend/dateHelpers";
export default function CareInfoTab({ plant }) {

  if (!plant || !plant.careSchedule) return <p>Loading care info...</p>;

  const schedule = plant.careSchedule;
  const species = plant.plantTypeId;

  const daysAgo = schedule.watering?.lastDone 
    ? Math.abs(daysBetween(schedule.watering.lastDone)) 
    : 0;
  const daysUntil = schedule.watering?.nextDue 
    ? daysBetween(schedule.watering.nextDue) 
    : 0;
  return (
    <>
      <InfoCard>
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>Care Schedule</h3>
        <ScheduleGrid>
          {/* Watering Box */}
          <CareBox>
            <ScheduleHeader style={{ color: COLORS.iconBlue }}>
              <span className="material-symbols-outlined">water_drop</span>{" "}
              Watering
            </ScheduleHeader>
            <div style={{ color: COLORS.secondaryText }}>
              Every {species?.careRules?.wateringFrequencyDays} days
            </div>
            <Row>
              Last watered: <strong>{daysAgo}d ago</strong>
            </Row>
            <Row>
              Next watering: <NextActionLabel>in {daysUntil}d</NextActionLabel>
            </Row>
          </CareBox>

          {/* Fertilizing Box */}
          <CareBox>
            <ScheduleHeader style={{ color: COLORS.iconGreen }}>
              <span className="material-symbols-outlined">eco</span> Fertilizing
            </ScheduleHeader>
            <div style={{ color: COLORS.secondaryText }}>
              Every {species?.careRules?.fertilizingFrequencyDays} days
            </div>
            <Row>
              Last fertilized: <strong>19d ago</strong>
            </Row>
            <Row>
              Next fertilizing: <NextActionLabel>in 11d</NextActionLabel>
            </Row>
          </CareBox>
        </ScheduleGrid>
      </InfoCard>

      <InfoCard>
        <h3 style={{ marginTop: 0 }}>Plant Information</h3>
        <p style={{ fontWeight: 600, marginBottom: 5 }}>Description</p>
        <p
          style={{
            color: COLORS.secondaryText,
            fontSize: "0.95rem",
            lineHeight: "1.5",
          }}
        >
         {species?.description || plant.description}
        </p>

        <InfoGrid>
          <div>
            <p
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                light_mode
              </span>
              <strong>Sunlight</strong>
            </p>
            <PillTag>{species?.careRules?.sunlight}</PillTag>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                info
              </span>
              <strong>Difficulty</strong>
            </p>
            <PillTag>{species?.difficulty}</PillTag>
          </div>
        </InfoGrid>

        <div style={{ marginTop: 25 }}>
          <p style={{ fontWeight: 600, marginBottom: 5 }}>Care Notes</p>
          <p style={{ color: COLORS.secondaryText, fontSize: "0.95rem" }}>
            {species?.careRules?.notes}
          </p>
        </div>
      </InfoCard>
    </>
  );
}

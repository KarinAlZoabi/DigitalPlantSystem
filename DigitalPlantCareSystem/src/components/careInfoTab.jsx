//care tab info in the plant details page
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

//date utilities
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysUntil(date) {
  if (!date) return null;
  return Math.ceil((new Date(date).getTime() - Date.now()) / MS_PER_DAY);
}

function daysAgo(date) {
  if (!date) return null;

  const diff = Date.now() - new Date(date).getTime();

  // Clamp to 0 so it never shows -1d ago
  return Math.max(0, Math.floor(diff / MS_PER_DAY));
}

export default function CareInfoTab({
  plant,
  careSchedule,
  lastWatered,
  lastFertilized,
  isAdmin = false,
}) {
  if (!plant)
    return <p style={{ color: COLORS.secondaryText }}>Loading care info...</p>;

  //calculate next watering and fertilizing dates
const nextWaterDays = careSchedule?.watering?.nextDue
  ? daysUntil(careSchedule.watering.nextDue)
  : null;

const nextFertDays = careSchedule?.fertilizing?.nextDue
  ? daysUntil(careSchedule.fertilizing.nextDue)
  : null;
  const wateredAgo = daysAgo(lastWatered);
  const fertAgo = daysAgo(lastFertilized);

  //format day count to a user/friendly string
  const formatNext = (days) => {
    if (days === null) return "—";
    if (days < 0) return `${Math.abs(days)}d overdue`;
    if (days === 0) return "Today";
    return `in ${days}d`;
  };

  return (
    <>
      <InfoCard>
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>Care Schedule</h3>
        <ScheduleGrid>
          {/* watering box */}
          <CareBox>
            <ScheduleHeader style={{ color: COLORS.iconBlue }}>
              <span className="material-symbols-outlined">water_drop</span>{" "}
              Watering
            </ScheduleHeader>
            <div style={{ color: COLORS.secondaryText }}>
              Every {plant?.careRules?.wateringFrequencyDays} days
            </div>
            {!isAdmin && (<><Row>
              Last watered:{" "}
              <strong>
                {wateredAgo !== null ? `${wateredAgo}d ago` : "—"}
              </strong>
            </Row>
            <Row>
              Next watering:
              <NextActionLabel
                $overdue={nextWaterDays !== null && nextWaterDays < 0}
              >
                {formatNext(nextWaterDays)}
              </NextActionLabel>
            </Row>
            </>)}
            
          </CareBox>

          {/* fertilizing box */}
          <CareBox>
            <ScheduleHeader style={{ color: COLORS.iconGreen }}>
              <span className="material-symbols-outlined">eco</span> Fertilizing
            </ScheduleHeader>
            <div style={{ color: COLORS.secondaryText }}>
              Every {plant?.careRules?.fertilizingFrequencyDays} days
            </div>

            {!isAdmin && (
              <>
               <Row>
              Last fertilized:{" "}
              <strong>{fertAgo !== null ? `${fertAgo}d ago` : "—"}</strong>
            </Row>
            <Row>
              Next fertilizing:
              <NextActionLabel
                $overdue={nextFertDays !== null && nextFertDays < 0}
              >
                {formatNext(nextFertDays)}
              </NextActionLabel>
            </Row></>
            )}
           
          </CareBox>
        </ScheduleGrid>
      </InfoCard>

      {/* plant info from original plant species */}
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
          {plant?.description || "No description available."}
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
            <PillTag>{plant?.careRules?.sunlight}</PillTag>
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
            <PillTag>{plant?.difficulty}</PillTag>
          </div>
        </InfoGrid>

        {/* extra care notes */}
        {plant?.careRules?.notes && (
          <div style={{ marginTop: 25 }}>
            <p style={{ fontWeight: 600, marginBottom: 5 }}>Care Notes</p>
            <p style={{ color: COLORS.secondaryText, fontSize: "0.95rem" }}>
              {plant.careRules.notes}
            </p>
          </div>
        )}
      </InfoCard>
    </>
  );
}

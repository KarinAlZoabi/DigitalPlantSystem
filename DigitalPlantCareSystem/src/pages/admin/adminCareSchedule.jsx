//admin care schedule
import { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { api } from "../../api/api";
import * as S from "../../styles/AdminCareScheduleStyles";

export default function AdminCareSchedule() {
  const [plantTypes, setPlantTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- DATA FETCHING ---
  useEffect(() => {
    // Fetch all plant types from the database on component mount
    api.getPlantTypes("")
      .then(setPlantTypes)
      .finally(() => setLoading(false));
  }, []);

  // --- ANALYTICS LOGIC ---
  
  // Calculate average watering frequency (days)
  const avgWatering = plantTypes.length
    ? Math.round(
        plantTypes.reduce((s, p) => s + (p.careRules?.wateringFrequencyDays || 0), 0) / plantTypes.length
      )
    : 0;

  // Calculate average fertilizing frequency (days)
  const avgFertilizing = plantTypes.length
    ? Math.round(
        plantTypes.reduce((s, p) => s + (p.careRules?.fertilizingFrequencyDays || 0), 0) / plantTypes.length
      )
    : 0;

  // Count how many plants require high sunlight intensity
  const highLightCount = plantTypes.filter((p) =>
    ["Full Sun", "Bright Direct", "High"].includes(p.careRules?.sunlight)
  ).length;

  /**
   * Helper function to sort plant types based on a specific care rule key
   * @param {string} key - e.g., "wateringFrequencyDays"
   */
  const sorted = (key) =>
    [...plantTypes].sort(
      (a, b) => (a.careRules?.[key] || 0) - (b.careRules?.[key] || 0)
    );

  return (
    <S.Page>
      <AdminHeader />
      <S.Inner>
        <S.PageTitle>Care Schedule Overview</S.PageTitle>
        <S.PageSub>View care requirements for all plant types</S.PageSub>

        {/* TOP STAT CARDS: Quick health/intensity metrics */}
        <S.StatRow>
          <S.StatCard>
            <S.StatIconWrap style={{ color: "#3b82f6" }}>
              <span className="material-symbols-outlined">water_drop</span>
            </S.StatIconWrap>
            <S.StatLabel>Avg. Watering</S.StatLabel>
            <S.StatValue>{loading ? "…" : `${avgWatering}d`}</S.StatValue>
          </S.StatCard>

          <S.StatCard>
            <S.StatIconWrap style={{ color: "#22c55e" }}>
              <span className="material-symbols-outlined">potted_plant</span>
            </S.StatIconWrap>
            <S.StatLabel>Avg. Fertilizing</S.StatLabel>
            <S.StatValue>{loading ? "…" : `${avgFertilizing}d`}</S.StatValue>
          </S.StatCard>

          <S.StatCard>
            <S.StatIconWrap style={{ color: "#f97316" }}>
              <span className="material-symbols-outlined">light_mode</span>
            </S.StatIconWrap>
            <S.StatLabel>High Light Plants</S.StatLabel>
            <S.StatValue>{loading ? "…" : highLightCount}</S.StatValue>
          </S.StatCard>
        </S.StatRow>

        {/* SECTION 1: WATERING FREQUENCY (Sorted by most frequent to least) */}
        <S.Section>
          <S.SectionHeader>
            <span className="material-symbols-outlined" style={{ color: "#3b82f6" }}>water_drop</span>
            Watering Frequency
          </S.SectionHeader>
          
          <S.ScrollContainer>
            {loading ? (
              <S.EmptyMsg>Loading…</S.EmptyMsg>
            ) : plantTypes.length === 0 ? (
              <S.EmptyMsg>No plant types in database.</S.EmptyMsg>
            ) : (
              sorted("wateringFrequencyDays").map((p) => (
                <S.PlantRow key={p._id}>
                  <S.PlantLeft>
                    <S.PlantThumb src={p.imagePath} alt={p.name} />
                    <div>
                      <S.PlantName>{p.name}</S.PlantName>
                      <S.PlantSci>{p.scientificName}</S.PlantSci>
                    </div>
                  </S.PlantLeft>
                  <S.FreqBadge $type="watering">
                    Every {p.careRules?.wateringFrequencyDays} days
                  </S.FreqBadge>
                </S.PlantRow>
              ))
            )}
          </S.ScrollContainer>
        </S.Section>

        {/* SECTION 2: FERTILIZING FREQUENCY */}
        <S.Section>
          <S.SectionHeader>
            <span className="material-symbols-outlined" style={{ color: "#22c55e" }}>potted_plant</span>
            Fertilizing Frequency
          </S.SectionHeader>
          
          <S.ScrollContainer>
            {loading ? (
              <S.EmptyMsg>Loading…</S.EmptyMsg>
            ) : (
              sorted("fertilizingFrequencyDays").map((p) => (
                <S.PlantRow key={p._id}>
                  <S.PlantLeft>
                    <S.PlantThumb src={p.imagePath} alt={p.name} />
                    <div>
                      <S.PlantName>{p.name}</S.PlantName>
                      <S.PlantSci>{p.scientificName}</S.PlantSci>
                    </div>
                  </S.PlantLeft>
                  <S.FreqBadge $type="fertilizing">
                    Every {p.careRules?.fertilizingFrequencyDays} days
                  </S.FreqBadge>
                </S.PlantRow>
              ))
            )}
          </S.ScrollContainer>
        </S.Section>
      </S.Inner>
    </S.Page>
  );
}
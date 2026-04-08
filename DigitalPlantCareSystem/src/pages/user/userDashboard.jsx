import { COLORS } from "../../styles/colors";
import { useState, useEffect } from "react";
import NavBar from "../../components/general/NavBar";
import PillSelector from "../../components/general/pillSelector";
import UserPlantCard from "./UserPlantCard";
import {
  TopDiv,
  AddPlantButton,
  StatDiv,
  PageSection,
  PlantGrid,
  FilterSection,
} from "../../styles/UserDashboardStyles";
const HealthyBadge = "images/badges/Healthy.png";
const AttentionBadge = "images/badges/NeedsAttention.png";
const CriticalBadge = "images/badges/Critical.png";

export default function UserDashboard() {
  const [userPlants, setUserPlants] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    // Replace with the ID generated when you ran your seed script
    const userId = "69d62b400fac8233928ef8fd";

    fetch(`http://localhost:5000/api/userPlants/?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setUserPlants(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const stats = [
    {
      title: "Total Plants",
      number: userPlants.length,
    },
    {
      title: "Healthy",
      number: userPlants.filter((p) => p.healthStatus === "healthy").length,
      badge: HealthyBadge,
    },
    {
      title: "Need Attention",
      number: userPlants.filter((p) => p.healthStatus === "attention").length,
      badge: AttentionBadge,
    },
    {
      title: "Critical",
      number: userPlants.filter((p) => p.healthStatus === "critical").length,
      badge: CriticalBadge,
    },
  ];

  const filterOptions = [
    {
      id: "all",
      label: "All Plants",
      count: userPlants.length,
    },
    {
      id: "healthy",
      label: "Healthy",
      count: userPlants.filter((p) => p.healthStatus === "healthy").length,
    },
    {
      id: "attention",
      label: "Attention",
      count: userPlants.filter((p) => p.healthStatus === "attention").length,
    },
    {
      id: "critical",
      label: "Critical",
      count: userPlants.filter((p) => p.healthStatus === "critical").length,
    },
  ];

  return (
    <>
      <NavBar />
      <TopDiv>
        <div>
          <h1
            style={{ color: COLORS.primaryText, fontWeight: "bold", margin: 0 }}
          >
            My Plants
          </h1>
          <p style={{ margin: 0, color: COLORS.secondaryText }}>
            Manage your plant collection
          </p>
        </div>
        <AddPlantButton>
          <span class="material-symbols-outlined">add_2</span>Add Plant
        </AddPlantButton>
      </TopDiv>

      <PageSection>
        {stats.map((stat, index) => (
          <StatDiv key={index}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.secondaryText }}>
              {stat.title}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                gap: 10,
              }}
            >
              {stat.badge && (
                <img src={stat.badge} alt="" style={{ height: 35 }} />
              )}
              <p style={{ margin: 0, fontSize: 25, fontWeight: "bold" }}>
                {stat.number}
              </p>
            </div>
          </StatDiv>
        ))}
      </PageSection>

      <FilterSection style={{ marginTop: 20 }}>
        <PillSelector
          options={filterOptions}
          activeValue={currentFilter}
          onChange={(id) => setCurrentFilter(id)}
        />

        <PlantGrid>
          {userPlants
            .filter(
              (up) =>
                currentFilter === "all" || up.healthStatus === currentFilter,
            )
            .map((up) => (
              <UserPlantCard key={up.id} userPlant={up} />
            ))}
        </PlantGrid>
      </FilterSection>
    </>
  );
}

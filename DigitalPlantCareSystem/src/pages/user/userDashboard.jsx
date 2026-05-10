//user dashboard
import { COLORS } from "../../styles/colors";
import { useState, useEffect } from "react";
import NavBar from "../../components/general/NavBar";
import PillSelector from "../../components/general/pillSelector";
import UserPlantCard from "./UserPlantCard";
import AddPlantModal from "../../components/addPlantModal";
import { api } from "../../api/api";
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

const EmptyState = ({ onAdd }) => (
  <div
    style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 20px" }}
  >
    <span
      className="material-symbols-outlined"
      style={{ fontSize: 64, color: COLORS.secondaryGreen }}
    >
      potted_plant
    </span>
    <p
      style={{
        color: COLORS.primaryText,
        fontWeight: 600,
        fontSize: "1.1rem",
        margin: "12px 0 6px",
      }}
    >
      No plants yet
    </p>
    <p style={{ color: COLORS.secondaryText, margin: "0 0 20px" }}>
      Click "Add Plant" to start building your collection!
    </p>
    <AddPlantButton onClick={onAdd}>
      <span className="material-symbols-outlined">add_2</span>Add Plant
    </AddPlantButton>
  </div>
);

export default function UserDashboard() {
  const [userPlants, setUserPlants] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getUserPlants()
      .then(setUserPlants)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleWatered = (updated) =>
    setUserPlants((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p)),
    );
  const handlePlantAdded = (plant) => setUserPlants((prev) => [...prev, plant]);

  const stats = [
    { title: "Total Plants", number: userPlants.length },
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
    { id: "all", label: "All Plants", count: userPlants.length },
    {
      id: "healthy",
      label: "Healthy",
      count: userPlants.filter((p) => p.healthStatus === "healthy").length,
    },
    {
      id: "attention",
      label: "Needs Attention",
      count: userPlants.filter((p) => p.healthStatus === "attention").length,
    },
    {
      id: "critical",
      label: "Critical",
      count: userPlants.filter((p) => p.healthStatus === "critical").length,
    },
  ];

  const filtered = userPlants.filter(
    (p) => currentFilter === "all" || p.healthStatus === currentFilter,
  );

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
          <p
            style={{
              margin: "4px 0 0",
              color: COLORS.secondaryText,
              fontSize: "0.9rem",
            }}
          >
            Track and manage your plant collection. Click a plant card to view
            full details and care history.
          </p>
        </div>
        <AddPlantButton onClick={() => setShowModal(true)}>
          <span className="material-symbols-outlined">add_2</span>Add Plant
        </AddPlantButton>
      </TopDiv>

      <PageSection>
        {stats.map((s, i) => (
          <StatDiv key={i}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.secondaryText }}>
              {s.title}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {s.badge && <img src={s.badge} alt="" style={{ height: 35 }} />}
              <p style={{ margin: 0, fontSize: 25, fontWeight: "bold" }}>
                {loading ? "…" : s.number}
              </p>
            </div>
          </StatDiv>
        ))}
      </PageSection>

      <FilterSection style={{ marginTop: 20 }}>
        <PillSelector
          options={filterOptions}
          activeValue={currentFilter}
          onChange={setCurrentFilter}
        />
        <PlantGrid>
          {loading ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                color: COLORS.secondaryText,
                padding: 40,
              }}
            >
              Loading your plants…
            </div>
          ) : filtered.length === 0 ? (
            currentFilter === "all" ? (
              <EmptyState onAdd={() => setShowModal(true)} />
            ) : (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  color: COLORS.secondaryText,
                  padding: 40,
                }}
              >
                No plants in this category.
              </div>
            )
          ) : (
            filtered.map((p) => (
              <UserPlantCard
                key={p._id}
                userPlant={p}
                onWatered={handleWatered}
              />
            ))
          )}
        </PlantGrid>
      </FilterSection>

      {showModal && (
        <AddPlantModal
          onClose={() => setShowModal(false)}
          onAdded={handlePlantAdded}
        />
      )}
    </>
  );
}

//plant details page
import React, { useState, useEffect } from "react";
import { COLORS } from "../../styles/colors";
import PillSelector from "../../components/general/pillSelector";
import NavBar from "../../components/general/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import CareInfoTab from "../../components/careInfoTab";
import GrowthTrackingTab from "../../components/GrowthTrackingTab";
import HealthStatusTab from "../../components/HealthStatusTab";
import { api } from "../../api/api";
import {
  PageContainer,
  BackButton,
  DetailsGrid,
  Sidebar,
  PlantImg,
  SidebarContent,
  ActionButton,
  StatusBadge,
  BadgeIcon,
  NicknameRow,
  NicknameInput,
  NicknameEditRow,
  IconButton,
} from "../../styles/plantDetailsStyles";
import styled from "styled-components";

const HealthyBadge = "/images/badges/Healthy.png";
const CriticalBadge = "/images/badges/Critical.png";
const AttentionBadge = "/images/badges/NeedsAttention.png";

const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const ConfirmBox = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
`;

function getStatusStyles(status) {
  switch (status) {
    case "healthy":
      return {
        bg: COLORS.healthyBg,
        border: COLORS.healthyStroke,
        icon: HealthyBadge,
        text: "Healthy",
      };
    case "critical":
      return {
        bg: COLORS.criticalBg,
        border: COLORS.criticalStroke,
        icon: CriticalBadge,
        text: "Critical",
      };
    default:
      return {
        bg: COLORS.attentionBg,
        border: COLORS.attentionStroke,
        icon: AttentionBadge,
        text: "Needs Attention",
      };
  }
}

export default function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("care");
  const [actionLoading, setActionLoading] = useState("");
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameDraft, setNicknameDraft] = useState("");
  const [nicknameLoading, setNicknameLoading] = useState(false);

  useEffect(() => {
  setLoading(true);
  setNotFound(false);

  api
    .getUserPlantById(id)
    .then((data) => {
      setPlant(data);
      setNotFound(false);
    })
    .catch(() => {
      setPlant(null);
      setNotFound(true);
    })
    .finally(() => setLoading(false));
}, [id]);

  const handleWater = async () => {
    setActionLoading("water");
    try {
      const u = await api.markWatered(id);
      setPlant(u);
    } catch (e) {
      alert(e.message);
    } finally {
      setActionLoading("");
    }
  };

  const handleFertilize = async () => {
    setActionLoading("fertilize");
    try {
      const u = await api.markFertilized(id);
      setPlant(u);
    } catch (e) {
      alert(e.message);
    } finally {
      setActionLoading("");
    }
  };

  const handleSaveNickname = async () => {
    const cleanNickname = nicknameDraft.trim();

    if (!cleanNickname) {
      alert("Plant nickname is required.");
      return;
    }

    if (cleanNickname.length < 2 || cleanNickname.length > 30) {
      alert("Nickname must be between 2 and 30 characters.");
      return;
    }

    setNicknameLoading(true);

    try {
      const updated = await api.updateUserPlantNickname(id, {
        nickname: cleanNickname,
      });

      setPlant(updated);
      setNicknameDraft(updated.nickname || "");
      setIsEditingNickname(false);
    } catch (e) {
      alert(e.message || "Failed to update nickname.");
    } finally {
      setNicknameLoading(false);
    }
  };

  const handleCancelNicknameEdit = () => {
    setNicknameDraft(nickname || "");
    setIsEditingNickname(false);
  };
  const handleRemove = async () => {
    try {
      await api.removeUserPlant(id);
      navigate("/dashboard", {replace: true});
    } catch (e) {
      alert(e.message);
    }
  };

 if (loading) {
  return (
    <>
      <NavBar />
      <PageContainer>
        <BackButton onClick={() => navigate("/dashboard")}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to My Plants
        </BackButton>
        <p>Loading plant details…</p>
      </PageContainer>
    </>
  );
}

if (notFound || !plant) {
  return (
    <>
      <NavBar />
      <PageContainer>
        <BackButton onClick={() => navigate("/dashboard")}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to My Plants
        </BackButton>
        <h2>Plant not found</h2>
        <p>This plant does not exist or may have been removed.</p>
      </PageContainer>
    </>
  );
}

  const {
    nickname,
    plantTypeId,
    location,
    healthStatus,
    careSchedule,
    lastWatered,
    lastFertilized,
  } = plant;
  const statusStyle = getStatusStyles(healthStatus);

  const tabOptions = [
    { id: "care", label: "Care Info" },
    { id: "growth", label: "Growth & Care Tracking" },
    { id: "health", label: "Health Status" },
  ];

  return (
    <>
      <NavBar />
      <PageContainer>
        <BackButton onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to My Plants
        </BackButton>

        <DetailsGrid>
          <Sidebar>
            <PlantImg src={plantTypeId?.imagePath} alt={nickname} />
            <SidebarContent>
              {isEditingNickname ? (
                <NicknameEditRow>
                  <NicknameInput
                    value={nicknameDraft}
                    onChange={(e) => setNicknameDraft(e.target.value)}
                    maxLength={30}
                    autoFocus
                  />

                  <IconButton
                    type="button"
                    onClick={handleSaveNickname}
                    disabled={nicknameLoading}
                    title="Save nickname"
                  >
                    <span className="material-symbols-outlined">
                      {nicknameLoading ? "hourglass_empty" : "check"}
                    </span>
                  </IconButton>

                  <IconButton
                    type="button"
                    onClick={handleCancelNicknameEdit}
                    disabled={nicknameLoading}
                    title="Cancel"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </IconButton>
                </NicknameEditRow>
              ) : (
                <NicknameRow>
                  <h1>{nickname}</h1>

                  <IconButton
                    type="button"
                    onClick={() => {
                      setNicknameDraft(nickname || "");
                      setIsEditingNickname(true);
                    }}
                    title="Edit nickname"
                    aria-label="Edit nickname"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </IconButton>
                </NicknameRow>
              )}

           
              <p className="scientific">{plantTypeId?.scientificName}</p>

              <StatusBadge
                $bgColor={statusStyle.bg}
                $borderColor={statusStyle.border}
              >
                <BadgeIcon src={statusStyle.icon} alt="" />
                {statusStyle.text}
              </StatusBadge>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  color: COLORS.secondaryText,
                  marginBottom: 20,
                }}
              >
                <span className="material-symbols-outlined">location_on</span>
                {location}
              </div>

              <ActionButton
                onClick={handleWater}
                disabled={actionLoading === "water"}
              >
                <span className="material-symbols-outlined">water_drop</span>
                {actionLoading === "water" ? "Watering…" : "Mark as Watered"}
              </ActionButton>
              <ActionButton
                variant="secondary"
                onClick={handleFertilize}
                disabled={actionLoading === "fertilize"}
              >
                <span className="material-symbols-outlined">potted_plant</span>
                {actionLoading === "fertilize"
                  ? "Fertilizing…"
                  : "Mark as Fertilized"}
              </ActionButton>
              <ActionButton
                variant="delete"
                onClick={() => setShowConfirmRemove(true)}
              >
                <span className="material-symbols-outlined">delete</span>
                Remove Plant
              </ActionButton>
            </SidebarContent>
          </Sidebar>

          <div>
            <div style={{ marginBottom: 30 }}>
              <PillSelector
                options={tabOptions}
                activeValue={activeTab}
                onChange={setActiveTab}
              />
            </div>
            {activeTab === "care" && (
              <CareInfoTab
                plant={plantTypeId}
                careSchedule={careSchedule}
                lastWatered={lastWatered}
                lastFertilized={lastFertilized}
              />
            )}
            {activeTab === "growth" && <GrowthTrackingTab userPlantId={id} />}
            {activeTab === "health" && (
              <HealthStatusTab currentStatus={healthStatus} />
            )}
          </div>
        </DetailsGrid>
      </PageContainer>

      {showConfirmRemove && (
        <ConfirmOverlay>
          <ConfirmBox>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 48, color: COLORS.deleteButton }}
            >
              warning
            </span>
            <h3 style={{ margin: "12px 0 8px", color: COLORS.primaryText }}>
              Remove {nickname}?
            </h3>
            <p
              style={{
                color: COLORS.secondaryText,
                fontSize: "0.9rem",
                margin: "0 0 24px",
              }}
            >
              This will permanently delete this plant and all its care history.
              This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => setShowConfirmRemove(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "1.5px solid #e2e8f0",
                  background: "white",
                  cursor: "pointer",
                  fontFamily: "Poppins,sans-serif",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "none",
                  background: COLORS.deleteButton,
                  color: "white",
                  cursor: "pointer",
                  fontFamily: "Poppins,sans-serif",
                  fontWeight: 600,
                }}
              >
                Yes, Remove
              </button>
            </div>
          </ConfirmBox>
        </ConfirmOverlay>
      )}
    </>
  );
}

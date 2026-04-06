import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import NavBar from "./general/NavBar";
import PillSelector from "./general/pillSelector";
import { useNavigate } from "react-router-dom";

import CareInfoTab from "./careInfoTab";
import GrowthTrackingTab from "./GrowthTrackingTab";
import HealthStatusTab from "./HealthStatusTab";

import HealthyBadge from "./../images/badges/Healthy.png";
import CriticalBadge from "./../images/badges/Critical.png";
import AttentionBadge from "./../images/badges/NeedsAttention.png";

import {
      PageContainer,
    BackButton,
    DetailsGrid,
    Sidebar,
    PlantImg,
    SidebarContent,
    ActionButton,
    StatusBadge,
    BadgeIcon
} from "./../styles/plantDetailsStyles"

export default function PlantDetails({ userPlant }) {
  const [activeTab, setActiveTab] = useState("care");
  const { nickname, plantDetails, location, healthStatus } = userPlant;

  const navigate = useNavigate();

  // Helper to get badge styling based on status
  const getStatusStyles = (status) => {
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
      case "attention":
      default:
        return {
          bg: COLORS.attentionBg,
          border: COLORS.attentionStroke,
          icon: AttentionBadge,
          text: "Needs attention",
        };
    }
  };

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
            <PlantImg src={plantDetails.imagePath} alt={nickname} />
            <SidebarContent>
              <h1>{nickname}</h1>
              <p className="scientific">{plantDetails.scientificName}</p>

              {/* Dynamic Status Badge */}
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
                <span className="material-symbols-outlined">location_on</span>{" "}
                {location}
              </div>

              <ActionButton>
                <span className="material-symbols-outlined">water_drop</span>{" "}
                Mark as Watered
              </ActionButton>
              <ActionButton variant="secondary">
                <span className="material-symbols-outlined">potted_plant</span>{" "}
                Mark as Fertilized
              </ActionButton>
              <ActionButton variant="delete">
                <span className="material-symbols-outlined">delete</span> Remove
                Plant
              </ActionButton>
            </SidebarContent>
          </Sidebar>

          <div>
            {" "}
            {/* This div holds both the selector AND the content */}
            <div style={{ marginBottom: 30 }}>
              <PillSelector
                options={tabOptions}
                activeValue={activeTab}
                onChange={(id) => setActiveTab(id)}
              />
            </div>
            {/* Put the content logic back here! */}
            {activeTab === "care" && <CareInfoTab plant={plantDetails} />}
            {activeTab === "growth" && <GrowthTrackingTab />}
            {activeTab === "health" && (
              <HealthStatusTab currentStatus={healthStatus} />
            )}
          </div>
        </DetailsGrid>
      </PageContainer>
    </>
  );
}

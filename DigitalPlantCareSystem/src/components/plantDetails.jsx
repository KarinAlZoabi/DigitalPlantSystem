import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import NavBar from "./general/NavBar";
import PillSelector from "./general/pillSelector";
import { useNavigate } from "react-router-dom";


import CareInfoTab from "./careInfoTab";
import GrowthTrackingTab from "./GrowthTrackingTab";
import HealthStatusTab from "./HealthStatusTab";



const PageContainer = styled.div`
  background-color: ${COLORS.backgroundGreen};
  min-height: 100vh;
  padding: 20px 50px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${COLORS.primaryText};
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;
  align-items: start;
`;

const Sidebar = styled.div`
  background: ${COLORS.white};
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
`;

const PlantImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const SidebarContent = styled.div`
  padding: 25px;
  h1 {
    margin: 0;
    font-size: 32px;
    color: ${COLORS.primaryText};
  }
  p.scientific {
    font-style: italic;
    color: ${COLORS.secondaryText};
    margin-bottom: 20px;
    margin-top:0;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "delete"
      ? COLORS.deleteButton
      : props.variant === "secondary"
        ? COLORS.white
        : COLORS.primaryButton};
  color: ${(props) =>
    props.variant === "secondary" ? COLORS.primaryButton : COLORS.white};
  border: ${(props) =>
    props.variant === "secondary"
      ? `2px solid ${COLORS.primaryButton}`
      : "none"};
`;


const StatusBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${props => props.$bgColor};
  color: ${COLORS.primaryText};
  padding: 6px 12px;
  border-radius: 20px;
  width: fit-content;
  font-size: 14px;
  margin-bottom: 15px;
  border: 1px solid ${props => props.$borderColor};
  font-weight: 500;
  text-transform: capitalize;
`;

const BadgeIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
`;

export default function PlantDetails({ userPlant }) {
  const [activeTab, setActiveTab] = useState("care");
  const { nickname, plantDetails, location, healthStatus } = userPlant;

  const navigate = useNavigate();

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

              {/* Status Badge would go here */}

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

          <div> {/* This div holds both the selector AND the content */}
            <div style={{ marginBottom: 30 }}>
              <PillSelector
                options={tabOptions}
                activeValue={activeTab}
                onChange={(id) => setActiveTab(id)}
              />
            </div>

            {/* Put the content logic back here! */}
            {activeTab === 'care' && <CareInfoTab plant={plantDetails} />}
            {activeTab === 'growth' && <GrowthTrackingTab />}
            {activeTab === 'health' && <HealthStatusTab currentStatus={healthStatus} />}
          </div>
        </DetailsGrid>
      </PageContainer>
    </>
  );
}

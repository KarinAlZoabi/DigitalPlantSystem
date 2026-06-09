//user plant card
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../../styles/colors";
const HealthyBadge = "images/badges/Healthy.png";
const CriticalBadge = "images/badges/Critical.png";
const AttentionBadge = "images/badges/NeedsAttention.png";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysUntil(date) {
  if (!date) return null;
  return Math.ceil((new Date(date).getTime() - Date.now()) / MS_PER_DAY);
}

function daysSince(date) {
  if (!date) return null;

  const diff = Date.now() - new Date(date).getTime();

  // Prevent weird values like -1d ago when server time is slightly ahead
  return Math.max(0, Math.floor(diff / MS_PER_DAY));
}

const STATUS_BADGES = {
  healthy: HealthyBadge,
  attention: AttentionBadge,
  critical: CriticalBadge,
};

const BadgeImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`;

const ImageContainer = styled.div`
  height: 190px;
  width: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;

  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 20px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const TitleGroup = styled.div`
  h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
  }
  span {
    font-style: italic;
    color: #888;
    font-size: 14px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #666;
  font-size: 15px;

  .label {
    flex: 1;
  }
  .value {
    font-weight: bold;
    color: #333;
  }
  .icon {
    color: ${(props) => props.iconColor || "#888"};
    font-size: 20px;
  }
`;
const waterWave = keyframes`
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  50% {
    transform: translateX(0%) skewX(-15deg);
  }
  100% {
    transform: translateX(100%) skewX(-15deg);
  }
`;

const dropletBounce = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.08);
  }
`;
const WaterButton = styled.button`
  width: 100%;
  background-color: ${COLORS.primaryButton};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 5px;
  transition:
    background 0.2s,
    transform 0.2s;
  position: relative;
  overflow: hidden;

  .material-symbols-outlined {
    position: relative;
    z-index: 2;
    animation: ${(props) => (props.$watering ? dropletBounce : "none")} 0.7s
      ease-in-out infinite;
  }

  span,
  .button-text {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.22);
    transform: translateX(-100%) skewX(-15deg);
    animation: ${(props) => (props.$watering ? waterWave : "none")} 1s
      ease-in-out infinite;
  }

  &:hover {
    background-color: ${COLORS.primaryButtonHover};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.85;
  }
`;

export default function UserPlantCard({ userPlant, onWatered }) {
  const [isWatering, setIsWatering] = useState(false);
  const navigate = useNavigate();
  const { _id, nickname, plantTypeId, lastWatered, healthStatus, location } =
    userPlant;

  const daysAgoWatered = daysSince(lastWatered);
const daysUntilNextWater = daysUntil(
  userPlant.careSchedule?.watering?.nextDue
);

  const handleCardClick = () => {
    // Navigates to a dynamic route like /plant/up-1
    navigate(`/plant/${_id}`);
  };

  const handleWater = async (e) => {
    e.stopPropagation();

    if (isWatering) return;

    setIsWatering(true);

    try {
      const updated = await api.markWatered(_id);
      onWatered(updated);
    } catch (err) {
      alert(err.message || "Failed to mark plant as watered.");
    } finally {
      setIsWatering(false);
    }
  };

  return (
    <Card onClick={handleCardClick}>
      <ImageContainer src={plantTypeId.imagePath} />
      <Content>
        <Header>
          <TitleGroup>
            <h2>{nickname}</h2>
            <span>{plantTypeId.scientificName}</span>
          </TitleGroup>
          <BadgeImage
            src={STATUS_BADGES[healthStatus] || HealthyBadge}
            alt={healthStatus}
          />
        </Header>

        <InfoRow>
          <span className="material-symbols-outlined icon">location_on</span>
          <span className="label">{location}</span>
        </InfoRow>

        <InfoRow iconColor="#3498db">
          <span className="material-symbols-outlined icon">water_drop</span>
          <span className="label">Last watered:</span>
          <span className="value">{daysAgoWatered}d ago</span>
        </InfoRow>

        <InfoRow iconColor="#2ecc71">
          <span className="material-symbols-outlined icon">calendar_today</span>
          <span className="label">Next watering:</span>
          <span className="value">
            {daysUntilNextWater >= 0
              ? `in ${daysUntilNextWater}d`
              : `${Math.abs(daysUntilNextWater)}d overdue`}
          </span>
        </InfoRow>

        <WaterButton
          onClick={handleWater}
          disabled={isWatering}
          $watering={isWatering}
        >
          <span className="material-symbols-outlined">water_drop</span>
          <span className="button-text">
            {isWatering ? "Watering..." : "Water Now"}
          </span>
        </WaterButton>
      </Content>
    </Card>
  );
}

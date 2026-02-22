import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/colors';
import HealthyBadge from "./../images/badges/Healthy.png"
import CriticalBadge from "./../images/badges/Critical.png"
import AttentionBadge from "./../images/badges/NeedsAttention.png"
import { useNavigate } from 'react-router-dom';

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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;

  transition: transform 0.5s ease;


  ${Card}:hover & {
    transform: scale(1.1);
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

  .label { flex: 1; }
  .value { font-weight: bold; color: #333; }
  .icon { color: ${props => props.iconColor || '#888'}; font-size: 20px; }
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
  transition: background 0.2s;

  &:hover { background-color: ${COLORS.primaryButtonHover}; }
`;

export default function UserPlantCard({ userPlant }) {
  const navigate = useNavigate();
  const { id, nickname, plantDetails, lastWatered, healthStatus, location } = userPlant;

  const handleCardClick = () => {
    // Navigates to a dynamic route like /plant/up-1
    navigate(`/plant/${id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <ImageContainer src={plantDetails.imagePath} />
      <Content>
        <Header>
          <TitleGroup>
            <h2>{nickname}</h2>
            <span>{plantDetails.scientificName}</span>
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
          <span className="value">2d ago</span> 
        </InfoRow>

        <InfoRow iconColor="#2ecc71">
          <span className="material-symbols-outlined icon">calendar_today</span>
          <span className="label">Next watering:</span>
          <span className="value">in 5d</span>
        </InfoRow>

        <WaterButton>
          <span className="material-symbols-outlined">water_drop</span>
          Water Now
        </WaterButton>
      </Content>
    </Card>
  );
}
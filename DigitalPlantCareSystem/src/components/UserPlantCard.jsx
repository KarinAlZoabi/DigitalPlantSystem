import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/colors';

const Card = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 350px;
`;

const ImageContainer = styled.div`
  height: 220px;
  width: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
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
    font-size: 28px;
    color: #333;
  }
  span {
    font-style: italic;
    color: #888;
    font-size: 16px;
  }
`;

const HealthDot = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${props => 
    props.status === 'healthy' ? '#E9B84C' : // Golden/Orange like image
    props.status === 'critical' ? '#E74C3C' : '#5DA480'};
  box-shadow: inset 0px -2px 5px rgba(0,0,0,0.2);
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: #666;
  font-size: 15px;

  .label { flex: 1; }
  .value { font-weight: bold; color: #333; }
  .icon { color: ${props => props.iconColor || '#888'}; font-size: 20px; }
`;

const WaterButton = styled.button`
  width: 100%;
  background-color: #3E7D5F;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;

  &:hover { background-color: #2D5D46; }
`;

export default function UserPlantCard({ userPlant }) {
  const { nickname, plantDetails, lastWatered, healthStatus, location } = userPlant;

  return (
    <Card>
      <ImageContainer src={plantDetails.imagePath} />
      <Content>
        <Header>
          <TitleGroup>
            <h2>{nickname}</h2>
            <span>{plantDetails.scientificName}</span>
          </TitleGroup>
          <HealthDot status={healthStatus} />
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
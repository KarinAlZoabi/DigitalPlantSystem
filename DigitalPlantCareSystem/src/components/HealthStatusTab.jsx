import React from 'react';
import styled from 'styled-components';
import { COLORS } from './../styles/colors';
import HealthyBadge from "./../images/badges/Healthy.png"
import CriticalBadge from "./../images/badges/Critical.png"
import AttentionBadge from "./../images/badges/NeedsAttention.png"

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: ${props => props.bg};
  border: 1px solid ${props => props.border};
`;

const CurrentStatusSection = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.$color || COLORS.primaryGreen};
  font-size: 14px;
  margin-top: 8px;
  font-weight: 500;
`;

export default function HealthStatusTab({ currentStatus }) {

  const statusContent = {
    healthy: {
      text: "All care tasks are on schedule",
      color: COLORS.healthy
    },
    attention: {
      text: "Care tasks are coming up soon or slightly overdue",
      color: COLORS.attentionStroke
    },
    critical: {
      text: "Immediate attention required for overdue tasks!",
      color: COLORS.criticalStroke
    }
  };

  const content = statusContent[currentStatus] || statusContent.healthy;

  return (
    <div style={{ background: 'white', padding: 24, borderRadius: 20 }}>
      <h3>Health Status Explanation</h3>
      <StatusBox bg={COLORS.healthyBg} border={COLORS.healthyStroke}>
        <img src={HealthyBadge} alt="" style={{ width: 24, height: 24, borderRadius: '50%'}}/>
        <div>
          <strong style={{ color: COLORS.healthy }}>Healthy</strong>
          <div style={{ fontSize: 12 }}>All care tasks are up to date.</div>
        </div>
      </StatusBox>
      <StatusBox bg={COLORS.attentionBg} border={COLORS.attentionStroke}>
         <img src={AttentionBadge} alt="" style={{ width: 24, height: 24, borderRadius: '50%'}}/>
        <div>
          <strong style={{ color: COLORS.attentionStroke }}>Needs Attention</strong>
          <div style={{ fontSize: 12 }}>Care tasks are coming up soon.</div>
        </div>
      </StatusBox>
       <StatusBox bg={COLORS.criticalBg} border={COLORS.criticalStroke}>
        <img src={CriticalBadge} alt="" style={{ width: 24, height: 24, borderRadius: '50%'}}/>
        <div>
          <strong style={{ color: COLORS.criticalStroke }}>Critical</strong>
          <div style={{ fontSize: 12 }}>Care tasks are significantly overdue. Immediate attention required!</div>
        </div>
      </StatusBox>

      <CurrentStatusSection>
        <div style={{ fontWeight: 600, fontSize: 14 }}>Current Status: {currentStatus}</div>
        <StatusMessage $color={content.color}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {currentStatus === 'healthy' ? 'check_circle' : 'info'}
          </span>
          {content.text}
        </StatusMessage>
      </CurrentStatusSection>
    </div>
  );
}
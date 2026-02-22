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

export default function HealthStatusTab() {
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
    </div>
  );
}
import React from 'react';
import styled from 'styled-components';
import { COLORS } from './../styles/colors';

const NoteArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 12px;
  border: 1px solid #eee;
  padding: 12px;
  background: #f9f9f9;
  resize: none;
  margin: 15px 0;
`;

const TimelineItem = styled.div`
  padding: 12px 0;
  border-left: 2px solid ${COLORS.secondaryGreen};
  padding-left: 20px;
  position: relative;
  margin-left: 10px;
  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 15px;
    width: 12px;
    height: 12px;
    background: ${COLORS.primaryGreen};
    border-radius: 50%;
  }
`;

export default function GrowthTrackingTab() {
  return (
    <>
      <div style={{ background: 'white', padding: 24, borderRadius: 20, marginBottom: 20 }}>
        <h3 style={{ margin: 0 }}>Add Growth Note</h3>
        <NoteArea placeholder="Record growth milestones..." />
        <button style={{ background: COLORS.primaryGreen, color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8 }}>Add Note</button>
      </div>

      <div style={{ background: 'white', padding: 24, borderRadius: 20 }}>
        <h3 style={{ margin: 0 }}>Timeline</h3>
        <TimelineItem>
          <strong>Growth Note</strong> <small>February 3, 2026</small>
          <p style={{ color: COLORS.secondaryText, margin: '5px 0' }}>Plant is looking healthy!</p>
        </TimelineItem>
      </div>
    </>
  );
}
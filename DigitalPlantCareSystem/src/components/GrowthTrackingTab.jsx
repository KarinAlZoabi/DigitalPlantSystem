import React from 'react';
import styled from 'styled-components';
import { COLORS } from './../styles/colors';

import { 
 NoteArea, TimelineItem
} from "./../styles/TabStyles";

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
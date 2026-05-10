//growth schedule in plant details page
import React, { useState, useEffect } from "react";
import { COLORS } from "./../styles/colors";
import { NoteArea, TimelineItem } from "./../styles/TabStyles";
import { api } from "../api/api";

//transform raw date to a readable format
function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
//return label based on activity
function typeLabel(type) {
  return type === "watering"
    ? "Watered"
    : type === "fertilizing"
      ? "Fertilized"
      : "Growth Note";
}
//theme color based on action type
function typeColor(type) {
  return type === "watering"
    ? COLORS.iconBlue
    : type === "fertilizing"
      ? COLORS.iconGreen
      : COLORS.secondaryText;
}

//return google material symbol
function typeIcon(type) {
  return type === "watering"
    ? "water_drop"
    : type === "fertilizing"
      ? "eco"
      : "edit_note";
}

export default function GrowthTrackingTab({ userPlantId }) {
  const [timeline, setTimeline] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch the timeline whenever the component loads or the selected plant changes
  useEffect(() => {
    if (!userPlantId) return;
    api
      .getTimeline(userPlantId)
      .then(setTimeline)
      .finally(() => setLoading(false));
  }, [userPlantId]);

  //Submits a manual growth note to the backend.
  const handleAdd = async () => {
    if (!note.trim()) return;
    setSaving(true);
    try {
      const entry = await api.addNote({ userPlantId, note: note.trim() });
      setTimeline((prev) => [entry, ...prev]);
      setNote("");
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 20,
          marginBottom: 20,
        }}
      >
        <h3 style={{ margin: "0 0 4px" }}>Add Growth Note</h3>
        <p
          style={{
            color: COLORS.secondaryText,
            fontSize: "0.88rem",
            margin: "0 0 4px",
          }}
        >
          Record observations, milestones, or anything notable about your
          plant's growth.
        </p>
        <NoteArea
          placeholder="e.g. New leaf sprouting, repotted today, noticed yellowing..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          onClick={handleAdd}
          disabled={saving || !note.trim()}
          style={{
            background: COLORS.primaryGreen,
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            fontFamily: "Poppins,sans-serif",
            fontWeight: 600,
            cursor: "pointer",
            opacity: saving || !note.trim() ? 0.6 : 1,
          }}
        >
          {saving ? "Saving…" : "Add Note"}
        </button>
      </div>

      <div style={{ background: "white", padding: 24, borderRadius: 20 }}>
        <h3 style={{ margin: "0 0 4px" }}>Care & Growth Timeline</h3>
        <p
          style={{
            color: COLORS.secondaryText,
            fontSize: "0.88rem",
            margin: "0 0 16px",
          }}
        >
          A chronological record of all care events and notes for this plant.
        </p>
        {loading ? (
          <p style={{ color: COLORS.secondaryText }}>Loading timeline…</p>
        ) : timeline.length === 0 ? (
          <p
            style={{
              color: COLORS.secondaryText,
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            No activity yet. Water or fertilize your plant to see entries here.
          </p>
        ) : (
          timeline.map((entry, i) => (
            <TimelineItem key={entry._id || i}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, color: typeColor(entry.type) }}
                >
                  {typeIcon(entry.type)}
                </span>
                <strong style={{ color: typeColor(entry.type) }}>
                  {typeLabel(entry.type)}
                </strong>
                <small
                  style={{ color: COLORS.secondaryText, marginLeft: "auto" }}
                >
                  {formatDate(entry.createdAt)}
                </small>
              </div>
              {entry.note && (
                <p
                  style={{
                    color: COLORS.secondaryText,
                    margin: "5px 0 0",
                    fontSize: "0.9rem",
                  }}
                >
                  {entry.note}
                </p>
              )}
            </TimelineItem>
          ))
        )}
      </div>
    </>
  );
}

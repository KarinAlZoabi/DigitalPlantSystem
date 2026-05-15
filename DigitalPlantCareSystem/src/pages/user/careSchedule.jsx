import { useState, useEffect } from "react";
import NavBar from "../../components/general/NavBar";
import { api } from "../../api/api";


const styles = `
  .cs-app { font-family: 'Poppins', sans-serif; background: #EEFDF4; min-height: 100vh; }

  .cs-page { width: 100%; margin: 0 auto; padding: 32px 40px; box-sizing: border-box; }
  @media(max-width:600px){ .cs-page{ padding: 20px 16px; } }

  .cs-page-header { margin-bottom: 24px; }
  .cs-page-title { font-family: 'Poppins', sans-serif; font-size: 28px; color: #1a3a2a; font-weight: 700; margin: 0 0 4px; }
  .cs-page-subtitle { font-size: 14px; color: #8aab96; margin: 0; }

  .cs-view-toggle {
    display: inline-flex; background: #d8f3dc; border-radius: 20px;
    padding: 4px; margin-bottom: 28px; gap: 2px;
  }
  .cs-view-btn {
    padding: 7px 20px; border-radius: 20px; border: none; cursor: pointer;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; transition: all 0.2s;
  }
  .cs-view-btn.active { background: #40916c; color: white; box-shadow: 0 2px 8px rgba(64,145,108,0.3); }
  .cs-view-btn.inactive { background: transparent; color: #4a6157; }

  .cs-stat-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 32px; }
  @media(max-width:600px){ .cs-stat-row{ grid-template-columns: 1fr; } }
  .cs-stat-card {
    background: white; border-radius: 14px; padding: 18px 20px;
    border: 1px solid #c8e6d0; display: flex; align-items: center;
    justify-content: space-between; box-shadow: 0 2px 12px rgba(40,100,60,0.08);
  }
  .cs-stat-label { font-size: 12px; color: #8aab96; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px; }
  .cs-stat-num { font-family: 'Poppins', sans-serif; font-size: 32px; line-height: 1; }
  .cs-stat-num.red { color: #e63946; }
  .cs-stat-num.amber { color: #e98a15; }
  .cs-stat-num.green { color: #40916c; }

  .cs-section { margin-bottom: 32px; }
  .cs-section-title { font-family: 'Poppins', sans-serif; font-size: 20px; color: #1a3a2a; margin-bottom: 14px; font-weight: 700; }
  .cs-section-title.overdue { color: #e63946; }

  .cs-task-card {
    background: white; border-radius: 14px; padding: 16px 20px;
    border: 1px solid #c8e6d0; display: flex; align-items: center;
    justify-content: space-between; margin-bottom: 10px;
    box-shadow: 0 2px 12px rgba(40,100,60,0.08); transition: all 0.2s;
    animation: csSlideIn 0.3s ease both;
  }
  .cs-task-card:hover { box-shadow: 0 6px 24px rgba(40,100,60,0.15); transform: translateY(-1px); }
  .cs-task-card.overdue-card { border-left: 3px solid #e63946; }
  @keyframes csSlideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

  .cs-task-left { display: flex; align-items: center; gap: 14px; }
  .cs-plant-icon {
    width: 44px; height: 44px; border-radius: 10px; background: #d8f3dc;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden;
  }
  .cs-plant-icon img { width: 100%; height: 100%; object-fit: cover; }
  .cs-task-name { font-weight: 600; font-size: 15px; color: #1b2e22; display: flex; align-items: center; gap: 8px; margin-bottom: 3px; }
  .cs-task-action { font-size: 13px; color: #8aab96; }

  .cs-badge { padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }
  .cs-badge.overdue { background: #fff0f1; color: #e63946; }
  .cs-badge.today { background: #fff8e7; color: #e98a15; }
  .cs-badge.upcoming { background: #d8f3dc; color: #2d6a4f; }

  .cs-mark-btn {
    padding: 9px 20px; background: #1a3a2a; color: white; border: none;
    border-radius: 9px; font-family: 'Poppins', sans-serif; font-size: 13px;
    font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
  }
  .cs-mark-btn:hover { background: #40916c; transform: scale(1.03); }
  .cs-mark-btn:disabled { background: #d8f3dc; color: #2d6a4f; cursor: default; transform: none; }

  /* Calendar */
  .cs-cal-wrap { background: white; border-radius: 14px; border: 1px solid #c8e6d0; overflow: hidden; margin-bottom: 24px; box-shadow: 0 2px 12px rgba(40,100,60,0.08); }
  .cs-cal-nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 0; }
  .cs-cal-header { font-family: 'Poppins', sans-serif; font-size: 22px; color: #1a3a2a; font-weight: 600; }
  .cs-cal-nav-btn { background: none; border: 1px solid #c8e6d0; border-radius: 8px; padding: 4px 12px; cursor: pointer; font-family: 'Poppins', sans-serif; font-size: 16px; }
  .cs-cal-grid { display: grid; grid-template-columns: repeat(7,1fr); padding: 12px 12px 16px; gap: 4px; }
  .cs-cal-day-name { text-align: center; font-size: 12px; font-weight: 600; color: #8aab96; text-transform: uppercase; letter-spacing: 0.06em; padding: 8px 0 10px; }
  .cs-cal-cell { min-height: 80px; border-radius: 10px; padding: 6px; cursor: pointer; transition: background 0.15s; border: 1.5px solid transparent; }
  .cs-cal-cell:hover { background: #f0faf3; }
  .cs-cal-cell.other-month { opacity: 0.35; }
  .cs-cal-cell.is-today { border-color: #40916c; background: #f0faf3; }
  .cs-cal-cell.is-selected { background: #d8f3dc; border-color: #40916c; }
  .cs-cal-date { font-size: 13px; font-weight: 600; color: #1b2e22; margin-bottom: 4px; }
  .cs-today-dot { display:inline-flex; width:22px; height:22px; background:#40916c; border-radius:50%; color:white; font-size:12px; font-weight:700; align-items:center; justify-content:center; }
  .cs-cal-pill { font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 5px; margin-bottom: 2px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cs-cal-pill.water { background: #dbeeff; color: #1565c0; }
  .cs-cal-pill.fertilize { background: #fde8f5; color: #9c27b0; }

  .cs-cal-detail { background: white; border-radius: 14px; border: 1px solid #c8e6d0; padding: 20px 24px; box-shadow: 0 2px 12px rgba(40,100,60,0.08); }
  .cs-cal-detail-title { font-family: 'Poppins', sans-serif; font-size: 16px; color: #1a3a2a; font-weight: 600; margin-bottom: 14px; }
  .cs-empty-state { color: #8aab96; font-size: 14px; text-align: center; padding: 20px 0; }
  @media (max-width: 700px) {
  .cs-task-card {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 14px;
  }

  .cs-task-left {
    align-items: flex-start;
    width: 100%;
  }

  .cs-task-name {
    flex-wrap: wrap;
    line-height: 1.35;
  }

  .cs-mark-btn {
    width: 100%;
    justify-content: center;
  }
}
  @media (max-width: 760px) {
  .cs-cal-wrap {
    overflow-x: auto;
  }

  .cs-cal-grid {
    min-width: 720px;
  }

  .cs-cal-nav {
    padding: 16px 16px 0;
    gap: 12px;
  }

  .cs-cal-header {
    font-size: 18px;
  }

  .cs-cal-cell {
    min-height: 72px;
  }

  .cs-cal-detail {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .cs-view-toggle {
    width: 100%;
  }

  .cs-view-btn {
    flex: 1;
    padding: 8px 10px;
    font-size: 13px;
  }

  .cs-page-title {
    font-size: 24px;
  }
}
`;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad(n) {
  return String(n).padStart(2, "0");
}

function buildCalGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: prevDays - i, current: false, month: month - 1, year });
  for (let d = 1; d <= days; d++)
    cells.push({ day: d, current: true, month, year });
  const rem = 42 - cells.length;
  for (let d = 1; d <= rem; d++)
    cells.push({ day: d, current: false, month: month + 1, year });
  return cells;
}
function cellKey(c) {
  return `${c.year}-${pad(c.month + 1)}-${pad(c.day)}`;
}

export default function CareSchedule() {
  const [view, setView] = useState("overview");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState("");
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const todayKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const [selected, setSelected] = useState(todayKey);

  useEffect(() => {
    api
      .getCareTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = tasks.filter((t) => {
    const d = new Date(t.dueDate);
    d.setHours(0, 0, 0, 0);
    return d < today;
  });
  const dueToday = tasks.filter((t) => {
    const d = new Date(t.dueDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });
  const in7 = new Date(today);
  in7.setDate(today.getDate() + 7);
  const upcoming = tasks.filter((t) => {
    const d = new Date(t.dueDate);
    d.setHours(0, 0, 0, 0);
    return d > today && d <= in7;
  });

  const handleComplete = async (taskId) => {
    setCompleting(taskId);
    setTasks((prev) => prev.filter((t) => t._id !== taskId)); // optimistic
    try {
      await api.completeTask(taskId);
    } catch {
      api.getCareTasks().then(setTasks);
    }
    setCompleting("");
  };

  // Build calendar events from tasks
  const calEvents = {};
  tasks.forEach((t) => {
    const key = t.dueDate?.slice(0, 10);
    if (!key) return;
    if (!calEvents[key]) calEvents[key] = [];
    calEvents[key].push({
      label: `${t.userPlantId?.nickname} – ${t.taskType === "watering" ? "Water" : "Fert."}`,
      type: t.taskType,
      taskId: t._id,
      plant: t.userPlantId,
    });
  });

  const cells = buildCalGrid(calYear, calMonth);
  const selectedDateLabel = selected
    ? new Date(selected + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else setCalMonth((m) => m + 1);
  };

  const renderTask = (task) => {
    const d = new Date(task.dueDate);
    d.setHours(0, 0, 0, 0);
    const isOver = d < today;
    const isToday = d.getTime() === today.getTime();
    const badgeClass = isOver ? "overdue" : isToday ? "today" : "upcoming";
    const badgeText = isOver ? "Overdue" : isToday ? "Today" : "Upcoming";
    return (
      <div
        key={task._id}
        className={`cs-task-card${isOver ? " overdue-card" : ""}`}
      >
        <div className="cs-task-left">
          <div className="cs-plant-icon">
            {task.userPlantId?.plantTypeId?.imagePath ? (
              <img src={task.userPlantId.plantTypeId.imagePath} alt="" />
            ) : (
              <span style={{ fontSize: 22 }}>🌿</span>
            )}
          </div>
          <div>
            <div className="cs-task-name">
              {task.userPlantId?.nickname}
              <span className={`cs-badge ${badgeClass}`}>{badgeText}</span>
            </div>
            <div className="cs-task-action">
              {task.taskType === "watering" ? "Watering" : "Fertilizing"}
            </div>
          </div>
        </div>
        <button
          className="cs-mark-btn"
          onClick={() => handleComplete(task._id)}
          disabled={completing === task._id}
        >
          {completing === task._id ? "…" : "Mark Done"}
        </button>
      </div>
    );
  };

  return (
    <>
      <style>{styles}</style>
      <NavBar />
      <div className="cs-app">
        <div className="cs-page">
          <div className="cs-page-header">
            <div className="cs-page-title">Care Schedule</div>
            <div className="cs-page-subtitle">
              View and manage your plant care tasks
            </div>
          </div>

          {/* View Toggle */}
          <div className="cs-view-toggle">
            <button
              className={`cs-view-btn ${view === "overview" ? "active" : "inactive"}`}
              onClick={() => setView("overview")}
            >
              Overview
            </button>
            <button
              className={`cs-view-btn ${view === "calendar" ? "active" : "inactive"}`}
              onClick={() => setView("calendar")}
            >
              Calendar View
            </button>
          </div>

          {view === "overview" ? (
            <>
              {/* Stat Cards */}
              <div className="cs-stat-row">
                <div className="cs-stat-card">
                  <div>
                    <div className="cs-stat-label">Overdue Tasks</div>
                    <div className={`cs-stat-num red`}>
                      {loading ? "…" : overdue.length}
                    </div>
                  </div>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#e63946", fontSize: 28 }}
                  >
                    warning
                  </span>
                </div>
                <div className="cs-stat-card">
                  <div>
                    <div className="cs-stat-label">Due Today</div>
                    <div className="cs-stat-num amber">
                      {loading ? "…" : dueToday.length}
                    </div>
                  </div>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#e98a15", fontSize: 28 }}
                  >
                    today
                  </span>
                </div>
                <div className="cs-stat-card">
                  <div>
                    <div className="cs-stat-label">Next 7 Days</div>
                    <div className="cs-stat-num green">
                      {loading ? "…" : upcoming.length}
                    </div>
                  </div>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#40916c", fontSize: 28 }}
                  >
                    event_upcoming
                  </span>
                </div>
              </div>

              {loading ? (
                <div
                  style={{ textAlign: "center", padding: 60, color: "#8aab96" }}
                >
                  Loading tasks…
                </div>
              ) : tasks.length === 0 ? (
                <div
                  style={{ textAlign: "center", padding: 60, color: "#8aab96" }}
                >
                  <div style={{ fontSize: 56 }}>🌿</div>
                  <div
                    style={{ fontWeight: 600, color: "#1a3a2a", marginTop: 8 }}
                  >
                    All caught up!
                  </div>
                  <div style={{ marginTop: 4 }}>
                    No pending care tasks. Your plants are happy!
                  </div>
                </div>
              ) : (
                <>
                  {overdue.length > 0 && (
                    <div className="cs-section">
                      <div className="cs-section-title overdue">
                        ⚠ Overdue Tasks
                      </div>
                      {overdue.map(renderTask)}
                    </div>
                  )}
                  {dueToday.length > 0 && (
                    <div className="cs-section">
                      <div className="cs-section-title">Today's Tasks</div>
                      {dueToday.map(renderTask)}
                    </div>
                  )}
                  {upcoming.length > 0 && (
                    <div className="cs-section">
                      <div className="cs-section-title">
                        Upcoming — Next 7 Days
                      </div>
                      {upcoming.map(renderTask)}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {/* Calendar */}
              <div className="cs-cal-wrap">
                <div className="cs-cal-nav">
                  <div className="cs-cal-header">
                    {MONTH_NAMES[calMonth]} {calYear}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="cs-cal-nav-btn" onClick={prevMonth}>
                      ‹
                    </button>
                    <button className="cs-cal-nav-btn" onClick={nextMonth}>
                      ›
                    </button>
                  </div>
                </div>
                <div className="cs-cal-grid">
                  {DAY_NAMES.map((d) => (
                    <div key={d} className="cs-cal-day-name">
                      {d}
                    </div>
                  ))}
                  {cells.map((cell, i) => {
                    const key = cellKey(cell);
                    const events = calEvents[key] || [];
                    const isToday = key === todayKey;
                    const isSel = key === selected && !isToday;
                    return (
                      <div
                        key={i}
                        className={`cs-cal-cell${!cell.current ? " other-month" : ""}${isToday ? " is-today" : ""}${isSel ? " is-selected" : ""}`}
                        onClick={() => cell.current && setSelected(key)}
                      >
                        <div className="cs-cal-date">
                          {isToday ? (
                            <span className="cs-today-dot">{cell.day}</span>
                          ) : (
                            cell.day
                          )}
                        </div>
                        {events.slice(0, 3).map((ev, j) => (
                          <span
                            key={j}
                            className={`cs-cal-pill ${ev.type === "watering" ? "water" : "fertilize"}`}
                          >
                            {ev.label}
                          </span>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day Detail */}
              <div className="cs-cal-detail">
                <div className="cs-cal-detail-title">{selectedDateLabel}</div>
                {selected && calEvents[selected] ? (
                  calEvents[selected].map((ev, i) => (
                    <div key={i} className="cs-task-card">
                      <div className="cs-task-left">
                        <div className="cs-plant-icon">
                          {ev.plant?.plantTypeId?.imagePath ? (
                            <img src={ev.plant.plantTypeId.imagePath} alt="" />
                          ) : (
                            <span style={{ fontSize: 22 }}>🌿</span>
                          )}
                        </div>
                        <div>
                          <div className="cs-task-name">
                            {ev.label.split(" – ")[0]}
                            <span className="cs-badge today">Scheduled</span>
                          </div>
                          <div className="cs-task-action">
                            {ev.type === "watering"
                              ? "Watering"
                              : "Fertilizing"}
                          </div>
                        </div>
                      </div>
                      <button
                        className="cs-mark-btn"
                        onClick={() => ev.taskId && handleComplete(ev.taskId)}
                        disabled={completing === ev.taskId}
                      >
                        {completing === ev.taskId ? "…" : "Mark Done"}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="cs-empty-state">
                    No tasks scheduled for this day 🌿
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

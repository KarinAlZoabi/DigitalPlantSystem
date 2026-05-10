//admin dashboard
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { api } from "../../api/api";

//styled components
import {
  AdminPage,
  Content,
  Title,
  Subtitle,
  StatsGrid,
  StatCard,
  StatLeft,
  StatLabel,
  StatValue,
  StatHint,
  StatIconCircle,
  Section,
  SectionHeader,
  SectionTitle,
  ViewAll,
  ActionsGrid,
  ActionCard,
  ActionLeft,
  ActionText,
  ActionTitle,
  ActionDesc,
  ArrowBtn,
  PlantsList,
  PlantRow,
  PlantLeft,
  PlantImg,
  PlantInfo,
  PlantName,
  PlantLatin,
  PlantMeta,
} from "../../styles/adminDashboardStyles";
import { COLORS } from "../../styles/colors";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch system wide statistics
  useEffect(() => {
    api
      .getAdminStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  //map stat data into cards
  const statCards = [
    {
      label: "Plant Types",
      value: loading ? "…" : (stats?.totalPlantTypes ?? 0),
      hint: "in database",
      valueColor: "#9810FA",
      iconBg: "#F3E8FF",
      icon: "database",
    },
    {
      label: "Total Users",
      value: loading ? "…" : (stats?.totalUsers ?? 0),
      hint: "registered",
      valueColor: "#155DFC",
      iconBg: "#DBEAFE",
      icon: "group",
    },
    {
      label: "User Plants",
      value: loading ? "…" : (stats?.totalUserPlants ?? 0),
      hint: "being tracked",
      valueColor: "#4CAF50",
      iconBg: "#F0FDF4",
      icon: "potted_plant",
    },
    {
      label: "Avg. Plants/User",
      value: loading ? "…" : (stats?.avgPlantsPerUser ?? 0),
      hint: "per user",
      valueColor: "#F54900",
      iconBg: "#FFEDD4",
      icon: "trending_up",
    },
  ];

  //quick actions array
  const actions = [
    {
      title: "Manage Plant Database",
      desc: "Add, edit, or remove plant types",
      icon: "database",
      valueColor: "#9810FA",
      path: "/admin/database",
    },
    {
      title: "View Care Rules",
      desc: "Review overall care rules",
      icon: "trending_up",
      valueColor: `${COLORS.iconOrange}`,
      path: "/admin/care-schedule",
    },
    {
      title: "View Profile",
      desc: "View and edit admin account",
      icon: "person",
      valueColor: `${COLORS.primaryText}`,
      path: "/profile",
    },
  ];

  return (
    <AdminPage>
      <AdminHeader />
      <Content>
        <Title>Admin Dashboard</Title>
        <Subtitle>System overview and quick actions</Subtitle>

        {/* Statistics Grid */}
        <StatsGrid>
          {statCards.map((s) => (
            <StatCard key={s.label}>
              <StatLeft>
                <StatLabel>{s.label}</StatLabel>
                <StatValue color={s.valueColor}>{s.value}</StatValue>
                <StatHint>{s.hint}</StatHint>
              </StatLeft>
              <StatIconCircle bg={s.iconBg}>
                <span
                  class="material-symbols-outlined"
                  style={{ color: `${s.valueColor}` }}
                >
                  {s.icon}
                </span>
              </StatIconCircle>
            </StatCard>
          ))}
        </StatsGrid>

        {/* Quick actions */}
        <Section>
          <SectionHeader>
            <SectionTitle>Quick Actions</SectionTitle>
          </SectionHeader>
          <ActionsGrid>
            {actions.map((a) => (
              <ActionCard key={a.title} onClick={() => navigate(a.path)}>
                <ActionLeft>
                  <span
                    class="material-symbols-outlined"
                    style={{ fontSize: 35, color: `${a.valueColor}` }}
                  >
                    {a.icon}
                  </span>
                  <ActionText>
                    <ActionTitle>{a.title}</ActionTitle>
                    <ActionDesc>{a.desc}</ActionDesc>
                  </ActionText>
                </ActionLeft>
                <ArrowBtn
                  aria-label="open action"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(a.path);
                  }}
                />
              </ActionCard>
            ))}
          </ActionsGrid>
        </Section>

        {/* Recently added plants */}
        <Section>
          <SectionHeader>
            <SectionTitle>Recently Added Plants</SectionTitle>
            <ViewAll onClick={() => navigate("/admin/database")}>
              View All <span>➜</span>
            </ViewAll>
          </SectionHeader>
          <PlantsList>
            {loading ? (
              <div style={{ color: "#6b7280", padding: "10px 0" }}>
                Loading…
              </div>
            ) : stats?.recentPlants?.length === 0 ? (
              <div style={{ color: "#6b7280", padding: "10px 0" }}>
                No plants in database yet.
              </div>
            ) : (
              stats?.recentPlants?.map((p) => (
                <PlantRow key={p._id}>
                  <PlantLeft>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        overflow: "hidden",
                        background: "#e9e9e9",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={p.imagePath}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <PlantInfo>
                      <PlantName>{p.name}</PlantName>
                      <PlantLatin>{p.scientificName}</PlantLatin>
                      <PlantMeta>
                        Watering: {p.careRules?.wateringFrequencyDays}d
                        &nbsp;·&nbsp; Fertilizing:{" "}
                        {p.careRules?.fertilizingFrequencyDays}d &nbsp;·&nbsp;
                        Difficulty: {p.difficulty}
                      </PlantMeta>
                    </PlantInfo>
                  </PlantLeft>
                </PlantRow>
              ))
            )}
          </PlantsList>
        </Section>
      </Content>
    </AdminPage>
  );
}

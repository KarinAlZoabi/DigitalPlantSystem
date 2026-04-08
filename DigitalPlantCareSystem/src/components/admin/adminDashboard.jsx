import AdminHeader from "./AdminHeader";
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

// ✅ ICONS
import databaseIcon from "../../images/icons/database.png";
import usersIcon from "../../images/icons/users.png";
import userPlantIcon from "../../images/icons/user-plant.png";
import trendIcon from "../../images/icons/arrow-trend-up.svg";
import userIcon from "../../images/icons/User (1).png";

export default function AdminDashboard({ setPage }) {
  const stats = [
    {
      label: "Plant Types",
      value: 6,
      hint: "in database",
      valueColor: "#9810FA",
      iconBg: "#F3E8FF",
      icon: databaseIcon,
    },
    {
      label: "Total Users",
      value: 1,
      hint: "registered",
      valueColor: "#155DFC",
      iconBg: "#DBEAFE",
      icon: usersIcon,
    },
    {
      label: "User Plants",
      value: 6,
      hint: "being tracked",
      valueColor: "#4CAF50",
      iconBg: "#F0FDF4",
      icon: userPlantIcon,
    },
    {
      label: "Avg. Plants/User",
      value: "6.0",
      hint: "per user",
      valueColor: "#F54900",
      iconBg: "#FFEDD4",
      icon: trendIcon,
    },
  ];

  const actions = [
    {
      title: "Manage Plant Database",
      desc: "Add, edit, remove plant type",
      icon: databaseIcon,
      page: "admin-db",
    },
    {
      title: "View Care Rules",
      desc: "Review overall care rules",
      icon: trendIcon,
      page: "admin-calendar",
    },
    {
      title: "View Profile",
      desc: "View and edit admin account",
      icon: userIcon,
      page: "profile",
    },
  ];

  const plants = [
    {
      name: "Fiddle Leaf Fig",
      latin: "Ficus lyrata",
      meta: "Watering: 7d  Fertilizing: 30d  Difficulty: hard",
    },
    {
      name: "Fiddle Leaf Fig",
      latin: "Ficus lyrata",
      meta: "Watering: 7d  Fertilizing: 30d  Difficulty: hard",
    },
    {
      name: "Fiddle Leaf Fig",
      latin: "Ficus lyrata",
      meta: "Watering: 7d  Fertilizing: 30d  Difficulty: hard",
    },
  ];

  return (
    <AdminPage>
      <AdminHeader
        active="dashboard"
        adminName="Admin"
        onDashboard={() => setPage("admin")}
        onDatabase={() => setPage("admin-db")}
        onCalendar={() => setPage("admin-calendar")}
        onAdmin={() => setPage("profile")}
      />

      <Content>
        <Title>Admin Dashboard</Title>
        <Subtitle>System overview and quick actions</Subtitle>

        <StatsGrid>
          {stats.map((s) => (
            <StatCard key={s.label}>
              <StatLeft>
                <StatLabel>{s.label}</StatLabel>
                <StatValue color={s.valueColor}>{s.value}</StatValue>
                <StatHint>{s.hint}</StatHint>
              </StatLeft>

              <StatIconCircle bg={s.iconBg}>
                <img
                  src={s.icon}
                  alt={s.label}
                  style={{ width: 26, height: 26 }}
                />
              </StatIconCircle>
            </StatCard>
          ))}
        </StatsGrid>

        <Section>
          <SectionHeader>
            <SectionTitle>Quick Actions</SectionTitle>
          </SectionHeader>

          <ActionsGrid>
            {actions.map((a) => (
              <ActionCard
                key={a.title}
                onClick={() => setPage(a.page)}
                style={{ cursor: "pointer" }}
              >
                <ActionLeft>
                  <img
                    src={a.icon}
                    alt={a.title}
                    style={{ width: 40, height: 40 }}
                  />
                  <ActionText>
                    <ActionTitle>{a.title}</ActionTitle>
                    <ActionDesc>{a.desc}</ActionDesc>
                  </ActionText>
                </ActionLeft>

                <ArrowBtn
                  aria-label="open action"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPage(a.page);
                  }}
                />
              </ActionCard>
            ))}
          </ActionsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Recently Added Plants</SectionTitle>
            <ViewAll onClick={() => setPage("admin-db")}>
              View All <span>➜</span>
            </ViewAll>
          </SectionHeader>

          <PlantsList>
            {plants.map((p, idx) => (
              <PlantRow key={`${p.name}-${idx}`}>
                <PlantLeft>
                  <PlantImg />
                  <PlantInfo>
                    <PlantName>{p.name}</PlantName>
                    <PlantLatin>{p.latin}</PlantLatin>
                    <PlantMeta>{p.meta}</PlantMeta>
                  </PlantInfo>
                </PlantLeft>
              </PlantRow>
            ))}
          </PlantsList>
        </Section>
      </Content>
    </AdminPage>
  );
}
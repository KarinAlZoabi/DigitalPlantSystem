import { COLORS } from "../styles/colors";
import Logo from "./../images/logo/Logo.svg";
import HeroImg from "./../images/image 2.png";
import CalendarIcon from "./../images/icons/calendar.svg";
import HeartIcon from "./../images/icons/heart.svg";
import ArrowUpIcon from "./../images/icons/arrow-trend-up.svg";
import "./../app.css"
import {
  LoginBtn,
  LogoImg,
  ColoredBtn,
  HeaderDiv,
  LandingMainText,
  LandingSubText,
  HeroSection,
  HeroContent,
  FeatureSection,
  FeatureGrid,
  FeatureCard,
  FeatureTitle,
  FeatureDescription,
  CTAsection,
  CTAbtn,
} from "./../styles/landingStyles";

export default function Landing() {
  const features = [
    {
      title: "Track Your Plants",
      description:
        "Add plants to your collection and monitor their health status at a glance.",
      iconType: "material",
      icon: "potted_plant",
      bg: COLORS.iconBackgroundBlue,
      color: COLORS.iconBlue,
    },
    {
      title: "Care Schedules",
      description:
        "Automated schedules based on each plant's needs. Never miss a watering day.",
      iconType: "image",
      icon: CalendarIcon,
      bg: COLORS.iconBackgroundGreen,
    },
    {
      title: "Health Monitoring",
      description:
        "Get alerts when plants need attention. Track overdue care tasks.",
      iconType: "image",
      icon: HeartIcon,
      bg: COLORS.iconBackgroundPurple,
    },
    {
      title: "Growth Tracking",
      description:
        "Log care activities and growth notes. See your plants thrive over time.",
      iconType: "image",
      icon: ArrowUpIcon,
      bg: COLORS.iconBackgroundOrange,
    },
  ];
  return (
    <>
      <header>
        <HeaderDiv>
          <LogoImg src={Logo} alt="PlantCare Logo" />
          <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
            <LoginBtn>Login</LoginBtn>
            <ColoredBtn>Sign Up</ColoredBtn>
          </div>
        </HeaderDiv>
      </header>
      <HeroSection image={HeroImg}>
       <HeroContent>
          <LandingMainText>
            Your Personal{" "}
            <span style={{ color: COLORS.primaryGreen }}>Plant Care</span>{" "}
            Assistant
          </LandingMainText>
          <LandingSubText>
            Never forget to water your plants again. Track, schedule, and
            monitor your plant collection with ease.
          </LandingSubText>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              marginTop: 20,
            }}
          >
            <ColoredBtn style={{ width: 140 }}>Get Started Free</ColoredBtn>
            <LoginBtn>Login</LoginBtn>
          </div>
        </HeroContent>
      </HeroSection>

      <FeatureSection>
        <div style={{ textAlign: "center" }}>
          <LandingMainText style={{ fontSize: "clamp(28px, 4vw, 35px)" }}>
            Everything You Need to Care for Your Plants
          </LandingMainText>
          <LandingSubText style={{ fontSize: 20 }}>
            Simple, powerful tools to keep your plants thriving
          </LandingSubText>
        </div>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <div
                style={{
                  background: feature.bg,
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {feature.iconType === "material" ? (
                  <span
                    class="material-symbols-outlined"
                    style={{ color: feature.color, fontSize: 35 }}
                  >
                    {feature.icon}
                  </span>
                ) : (
                  <img src={feature.icon} alt="" style={{ width: 35 }} />
                )}
              </div>

              <div>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </div>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeatureSection>

      <CTAsection>
        <div
          style={{
            background: COLORS.primaryGreen,
            borderRadius: 25,
            padding: 30,
            width: "90vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 20,
            textAlign: "center",
          }}
        >
          <div>
            <LandingMainText style={{ color: "white", fontSize: 30 }}>
              Ready to start your plant care journey?
            </LandingMainText>
            <LandingSubText style={{ color: "white", fontSize: 15 }}>
              Join thousands of plant lovers keeping their green friends happy
              and healthy
            </LandingSubText>
          </div>
          <CTAbtn>Create Free Account</CTAbtn>
        </div>
      </CTAsection>

      <footer
        style={{
          color: COLORS.secondaryText,
          textAlign: "center",
          padding: 20,
          fontFamily: "Poppins"
        }}
      >
        © 2026 PlantCare. Your digital plant care assistant.
      </footer>
    </>
  );
}

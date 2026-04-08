// ✅ Profile.jsx
import { useEffect, useRef, useState } from "react";
import {
  PageWrapper,
  HeaderBar,
  HeaderContainer,
  HeaderLeft,
  Brand,
  BrandLogo,
  NavLinks,
  NavLinkBtn,
  UserPill,
  UserPillIcon,
  Card,
  LeftSection,
  RightSection,
  AvatarRing,
  AvatarWrapper,
  Avatar,
  ChangePhotoBtn,
  SectionTitle,
  Row,
  ValueText,
  SmallText,
  Input,
  Divider,
  ButtonsWrapper,
  EditButton,
  LogoutButton,
} from "../styles/profileStyles";

import userIcon from "../images/icons/User-white.png";
import mailIcon from "../images/icons/Mail.png";
import lockIcon from "../images/icons/Lock.png";
import editIcon from "../images/icons/edit.png";
import logoutIcon from "../images/icons/logout.png";
import calendarIcon from "../images/icons/date.png";
import careIcon from "../images/icons/care.png";
import cameraIcon from "../images/icons/Camera.png";


import logoIcon from "../images/logo/Logo.svg";
import myPlantsIcon from "../images/icons/plant-profile.png";
import scheduleIcon from "../images/icons/calendar-black.png";

const STORAGE_KEY = "plantcare_user";

const defaultUser = {
  name: "Lara",
  email: "lara@gmail.com",
  avatar: "",
  joinDate: "January 2026",
  totalPlants: 20,
};

export default function Profile({ isAdmin = false }) {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(defaultUser);

  const [form, setForm] = useState({
    name: defaultUser.name,
    email: defaultUser.email,
    password: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
      return;
    }

    const parsed = JSON.parse(saved);
    setUser(parsed);
    setForm({
      name: parsed.name || "",
      email: parsed.email || "",
      password: "",
      confirmPassword: "",
    });
  }, []);

  const setStorageUser = (updated) => {
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const enterEdit = () => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      confirmPassword: "",
    });
    setEditMode(true);
  };

  const save = () => {
    if (!form.name.trim()) return alert("Name is required.");
    if (!form.email.trim()) return alert("Email is required.");

    if (form.password || form.confirmPassword) {
      if (form.password.length < 6)
        return alert("Password must be at least 6 characters.");
      if (form.password !== form.confirmPassword)
        return alert("Passwords do not match.");
    }

    const updated = {
      ...user,
      name: form.name.trim(),
      email: form.email.trim(),
    };

    setStorageUser(updated);
    setEditMode(false);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    alert("Logged out (demo).");
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const onPickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setStorageUser({ ...user, avatar: url });
  };

  const rowWithIcon = { display: "flex", alignItems: "center", gap: "10px" };

  const iconStyle = {
    width: "20px",
    height: "20px",
    objectFit: "contain",
    opacity: 0.95,
  };

  const buttonContent = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  };

  const buttonIcon = { width: "18px", height: "18px", objectFit: "contain" };

  const changePhotoContent = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  };

  const cameraBtnIcon = { width: "18px", height: "18px", objectFit: "contain" };

  return (
    <PageWrapper>
      {/* ✅ HEADER */}
      <HeaderBar>
        <HeaderContainer>
          <HeaderLeft>
            <Brand>
              <BrandLogo src={logoIcon} alt="PlantCare logo" />
            </Brand>

            <NavLinks>
              <NavLinkBtn type="button">
                <img src={myPlantsIcon} alt="plants" />
                <span>My Plants</span>
              </NavLinkBtn>

              <NavLinkBtn type="button">
                <img src={scheduleIcon} alt="schedule" />
                <span>Care Schedule</span>
              </NavLinkBtn>
            </NavLinks>
          </HeaderLeft>

          <UserPill type="button">
            <UserPillIcon src={userIcon} alt="user" />
            <span>{user.name || "John Doe"}</span>
          </UserPill>
        </HeaderContainer>
      </HeaderBar>

      {/* ✅ CARD */}
      <Card>
        {/* LEFT */}
        <LeftSection>
          <AvatarRing>
            <AvatarWrapper>
              <Avatar
                src={user.avatar || "https://i.pravatar.cc/300"}
                alt="profile"
              />
            </AvatarWrapper>
          </AvatarRing>

          <ChangePhotoBtn onClick={openFilePicker}>
            <span style={changePhotoContent}>
              <img src={cameraIcon} alt="camera" style={cameraBtnIcon} />
              Change Photo
            </span>
          </ChangePhotoBtn>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onPickPhoto}
            style={{ display: "none" }}
          />
        </LeftSection>

        {/* RIGHT */}
        <RightSection>
          <SectionTitle>Account Information</SectionTitle>
          <Divider style={{ marginTop: "10px" }} />

          {/* Name */}
          <Row>
            <div style={rowWithIcon}>
              <img src={userIcon} alt="user" style={iconStyle} />
              {editMode ? (
                <Input name="name" value={form.name} onChange={handleChange} />
              ) : (
                <ValueText>{user.name}</ValueText>
              )}
            </div>
          </Row>

          {/* Email */}
          <Row>
            <div style={rowWithIcon}>
              <img src={mailIcon} alt="mail" style={iconStyle} />
              {editMode ? (
                <Input name="email" value={form.email} onChange={handleChange} />
              ) : (
                <SmallText>{user.email}</SmallText>
              )}
            </div>
          </Row>

          {/* Password */}
          <Row>
            <div style={rowWithIcon}>
              <img src={lockIcon} alt="lock" style={iconStyle} />
              {editMode ? (
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="New Password"
                  onChange={handleChange}
                />
              ) : (
                <SmallText>******</SmallText>
              )}
            </div>
          </Row>

          {/* Confirm password */}
          {editMode && (
            <Row>
              <div style={rowWithIcon}>
                <img src={lockIcon} alt="lock" style={iconStyle} />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              </div>
            </Row>
          )}

          <Divider />

          <SectionTitle>User Information</SectionTitle>

          <Row>
            <div style={rowWithIcon}>
              <img src={calendarIcon} alt="calendar" style={iconStyle} />
              <SmallText>Plant parent since {user.joinDate}</SmallText>
            </div>
          </Row>

          <Row>
            <div style={rowWithIcon}>
              <img src={careIcon} alt="care" style={iconStyle} />
              <SmallText>Taking care of {user.totalPlants} plants</SmallText>
            </div>
          </Row>

          <ButtonsWrapper>
            <EditButton admin={isAdmin} onClick={editMode ? save : enterEdit}>
              <span style={buttonContent}>
                <img src={editIcon} alt="edit" style={buttonIcon} />
                {editMode ? "Save Changes" : "Edit Profile"}
              </span>
            </EditButton>

            <LogoutButton onClick={logout}>
              <span style={buttonContent}>
                <img src={logoutIcon} alt="logout" style={buttonIcon} />
                Log out
              </span>
            </LogoutButton>
          </ButtonsWrapper>
        </RightSection>
      </Card>
    </PageWrapper>
  );
}
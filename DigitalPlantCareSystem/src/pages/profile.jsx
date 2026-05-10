//profile page
import { useState, useEffect, useRef } from "react";
import { COLORS } from "../styles/colors";
import NavBar from "../components/general/NavBar";
import AdminHeader from "./admin/AdminHeader";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Importing our separated styles
import * as S from "../styles/ProfileStyles";

const accent = (isAdmin) => (isAdmin ? "#7C3AED" : COLORS.primaryGreen);

export default function Profile() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({ name: "", email: "" });
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });
  
  // Feedback Messages
  const [profileMsg, setProfileMsg] = useState(null);
  const [pwMsg, setPwMsg] = useState(null);
  const [picMsg, setPicMsg] = useState(null);
  
  // Validation Errors
  const [profileErrors, setProfileErrors] = useState({});
  const [pwErrors, setPwErrors] = useState({});
  
  // Interaction Flags
  const [saving, setSaving] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);

  // User Metadata
  const [joinedDate, setJoinedDate] = useState("");
  const [plantCount, setPlantCount] = useState(0);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null);

  // Deletion Flow
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // --- DATA INITIALIZATION ---
  useEffect(() => {
    api
      .getProfile()
      .then((data) => {
        setProfile({ name: data.name, email: data.email });
        setProfilePicture(data.profilePicture || null);
        setJoinedDate(
          data.createdAt
            ? new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "—",
        );
        setPlantCount(data.numberOfPlantsOwned || 0);
      })
      .catch(() => {});
  }, []);

  // --- HANDLERS ---

  //Validates and uploads a profile image 
  const handlePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setPicMsg({ success: false, text: "Only JPEG, PNG, and WebP images are allowed." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPicMsg({ success: false, text: "Image must be smaller than 5 MB." });
      return;
    }

    setUploadingPic(true);
    setPicMsg(null);
    try {
      const data = await api.uploadProfilePicture(file);
      setProfilePicture(data.profilePicture);
      // Sync auth context with new image path
      login(localStorage.getItem("token"), {
        ...user,
        profilePicture: data.profilePicture,
      });
      setPicMsg({ success: true, text: "Profile picture updated!" });
    } catch (err) {
      setPicMsg({ success: false, text: err.message });
    } finally {
      setUploadingPic(false);
      e.target.value = ""; // Clear input for re-selection
      setTimeout(() => setPicMsg(null), 3000);
    }
  };

  //Updates user name and email
  const handleProfileSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!profile.name.trim()) errs.name = "Name required";
    if (!profile.email || !/\S+@\S+\.\S+/.test(profile.email))
      errs.email = "Valid email required";
    
    if (Object.keys(errs).length) {
      setProfileErrors(errs);
      return;
    }
    setSaving(true);
    try {
      const updated = await api.updateProfile(profile);
      // Sync auth context with new text data
      login(localStorage.getItem("token"), {
        ...user,
        name: updated.name,
        email: updated.email,
      });
      setProfileMsg({ success: true, text: "Profile updated successfully!" });
    } catch (err) {
      setProfileMsg({ success: false, text: err.message });
    } finally {
      setSaving(false);
      setTimeout(() => setProfileMsg(null), 3000);
    }
  };

  //Password change flow
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!pwForm.currentPassword) errs.currentPassword = "Required";
    if (pwForm.newPassword.length < 6) errs.newPassword = "Min 6 characters";
    if (pwForm.newPassword !== pwForm.confirm)
      errs.confirm = "Passwords do not match";

    if (Object.keys(errs).length) {
      setPwErrors(errs);
      return;
    }
    setSavingPw(true);
    try {
      await api.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      setPwMsg({ success: true, text: "Password changed successfully!" });
      setPwForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      setPwMsg({ success: false, text: err.message });
    } finally {
      setSavingPw(false);
      setTimeout(() => setPwMsg(null), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  //Final confirmation for account deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      setDeleteError('Please type "DELETE" to confirm.');
      return;
    }
    setDeleting(true);
    setDeleteError("");
    try {
      await api.deleteAccount();
      logout();
      navigate("/login");
    } catch (err) {
      setDeleteError(err.message);
      setDeleting(false);
    }
  };

  const HeaderComponent = isAdmin ? AdminHeader : NavBar;

  return (
    <>
      <HeaderComponent />
      <S.Page>
        {/* Avatar & Identity Header */}
        <S.Card>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            style={{ display: "none" }}
            onChange={handlePictureChange}
          />

          <S.AvatarWrap>
            <S.AvatarCircle $admin={isAdmin}>
              {profilePicture ? (
                <S.AvatarImage src={profilePicture} alt="Profile" />
              ) : (
                profile.name?.[0]?.toUpperCase() || "U"
              )}
            </S.AvatarCircle>
            <S.ChangePhotoBtn
              $admin={isAdmin}
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPic}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: "white" }}>
                {uploadingPic ? "hourglass_empty" : "photo_camera"}
              </span>
            </S.ChangePhotoBtn>
          </S.AvatarWrap>

          {picMsg && (
            <S.AlertBox $success={picMsg.success} style={{ marginBottom: 12 }}>
              {picMsg.text}
            </S.AlertBox>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.2rem", color: COLORS.primaryText }}>{profile.name}</div>
              <div style={{ color: COLORS.secondaryText, fontSize: "0.88rem" }}>{profile.email}</div>
              <div
                style={{ marginTop: 6, fontSize: "0.78rem", color: COLORS.primaryGreen, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>photo_camera</span>
                {profilePicture ? "Change photo" : "Add profile photo"}
              </div>
            </div>
            <S.RoleBadge $admin={isAdmin}>
              {isAdmin ? "Administrator" : "Plant Parent"}
            </S.RoleBadge>
          </div>
        </S.Card>

        {/* Stats */}
        {!isAdmin && (
          <S.Card>
            <S.CardTitle>
              <span className="material-symbols-outlined" style={{ color: COLORS.primaryGreen }}>info</span>
              Account Information
            </S.CardTitle>
            <S.InfoRow>
              <S.InfoLabel>Member Since</S.InfoLabel>
              <S.InfoValue>{joinedDate}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>Plants in Collection</S.InfoLabel>
              <S.InfoValue>{plantCount}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>Account Type</S.InfoLabel>
              <S.InfoValue><S.RoleBadge>Plant Parent</S.RoleBadge></S.InfoValue>
            </S.InfoRow>
          </S.Card>
        )}

        {/* Form - Edit Basic Profile */}
        <S.Card>
          <S.CardTitle>
            <span className="material-symbols-outlined" style={{ color: accent(isAdmin) }}>person</span>
            Edit Profile
          </S.CardTitle>
          {profileMsg && <S.AlertBox $success={profileMsg.success}>{profileMsg.text}</S.AlertBox>}
          <form onSubmit={handleProfileSave}>
            <S.Row2>
              <S.FieldWrap>
                <S.Label>Full Name</S.Label>
                <S.Input
                  $admin={isAdmin}
                  value={profile.name}
                  $err={!!profileErrors.name}
                  onChange={(e) => {
                    setProfile({ ...profile, name: e.target.value });
                    setProfileErrors({ ...profileErrors, name: "" });
                  }}
                />
                {profileErrors.name && <S.ErrText>{profileErrors.name}</S.ErrText>}
              </S.FieldWrap>
              <S.FieldWrap>
                <S.Label>Email Address</S.Label>
                <S.Input
                  $admin={isAdmin}
                  type="email"
                  value={profile.email}
                  $err={!!profileErrors.email}
                  onChange={(e) => {
                    setProfile({ ...profile, email: e.target.value });
                    setProfileErrors({ ...profileErrors, email: "" });
                  }}
                />
                {profileErrors.email && <S.ErrText>{profileErrors.email}</S.ErrText>}
              </S.FieldWrap>
            </S.Row2>
            <S.SaveBtn type="submit" $admin={isAdmin} disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </S.SaveBtn>
          </form>
        </S.Card>

        {/* Form - Update Password */}
        <S.Card>
          <S.CardTitle>
            <span className="material-symbols-outlined" style={{ color: accent(isAdmin) }}>lock</span>
            Change Password
          </S.CardTitle>
          {pwMsg && <S.AlertBox $success={pwMsg.success}>{pwMsg.text}</S.AlertBox>}
          <form onSubmit={handlePasswordSave}>
            <S.FieldWrap>
              <S.Label>Current Password</S.Label>
              <S.Input
                $admin={isAdmin}
                type="password"
                placeholder="Enter current password"
                value={pwForm.currentPassword}
                $err={!!pwErrors.currentPassword}
                onChange={(e) => {
                  setPwForm({ ...pwForm, currentPassword: e.target.value });
                  setPwErrors({ ...pwErrors, currentPassword: "" });
                }}
              />
              {pwErrors.currentPassword && <S.ErrText>{pwErrors.currentPassword}</S.ErrText>}
            </S.FieldWrap>
            <S.Row2>
              <S.FieldWrap>
                <S.Label>New Password</S.Label>
                <S.Input
                  $admin={isAdmin}
                  type="password"
                  placeholder="Min. 6 characters"
                  value={pwForm.newPassword}
                  $err={!!pwErrors.newPassword}
                  onChange={(e) => {
                    setPwForm({ ...pwForm, newPassword: e.target.value });
                    setPwErrors({ ...pwErrors, newPassword: "" });
                  }}
                />
                {pwErrors.newPassword && <S.ErrText>{pwErrors.newPassword}</S.ErrText>}
              </S.FieldWrap>
              <S.FieldWrap>
                <S.Label>Confirm New Password</S.Label>
                <S.Input
                  $admin={isAdmin}
                  type="password"
                  placeholder="Repeat new password"
                  value={pwForm.confirm}
                  $err={!!pwErrors.confirm}
                  onChange={(e) => {
                    setPwForm({ ...pwForm, confirm: e.target.value });
                    setPwErrors({ ...pwErrors, confirm: "" });
                  }}
                />
                {pwErrors.confirm && <S.ErrText>{pwErrors.confirm}</S.ErrText>}
              </S.FieldWrap>
            </S.Row2>
            <S.SaveBtn type="submit" $admin={isAdmin} disabled={savingPw}>
              {savingPw ? "Saving…" : "Update Password"}
            </S.SaveBtn>
          </form>
        </S.Card>

        {/* Logout */}
        <S.Card style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 600, color: COLORS.primaryText }}>Sign Out</div>
            <div style={{ fontSize: "0.83rem", color: COLORS.secondaryText }}>You will be returned to the login page</div>
          </div>
          <S.LogoutBtn onClick={handleLogout}>
            <span className="material-symbols-outlined" style={{ verticalAlign: "middle", marginRight: 4, fontSize: 18 }}>logout</span>
            Logout
          </S.LogoutBtn>
        </S.Card>

        {/* Delete acc */}
        {!isAdmin && (
          <S.Card style={{ borderColor: "#FED7D7", background: "#FFF5F5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, color: "#C53030", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>warning</span>
                  Delete Account
                </div>
                <div style={{ fontSize: "0.83rem", color: COLORS.secondaryText }}>Permanently delete everything. This cannot be undone.</div>
              </div>
              <S.DeleteAccountBtn onClick={() => { setShowDeleteModal(true); setDeleteConfirmText(""); setDeleteError(""); }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete_forever</span>
                Delete Account
              </S.DeleteAccountBtn>
            </div>
          </S.Card>
        )}
      </S.Page>

      {/* MODAL: Delete Confirmation Overlay */}
      {showDeleteModal && (
        <S.ConfirmOverlay onClick={() => setShowDeleteModal(false)}>
          <S.ConfirmBox onClick={(e) => e.stopPropagation()}>
            <span className="material-symbols-outlined" style={{ fontSize: 52, color: "#e53e3e" }}>delete_forever</span>
            <h3 style={{ margin: "12px 0 6px", color: COLORS.primaryText, fontSize: "1.1rem" }}>Delete your account?</h3>
            <p style={{ color: COLORS.secondaryText, fontSize: "0.88rem", margin: "0 0 4px", lineHeight: 1.6 }}>
              This will permanently delete your account and history. <strong style={{ color: "#c53030" }}>This cannot be undone.</strong>
            </p>
            <p style={{ color: COLORS.secondaryText, fontSize: "0.85rem", margin: "12px 0 0" }}>
              Type <strong>DELETE</strong> to confirm:
            </p>
            <S.ConfirmInput
              placeholder="Type DELETE here"
              value={deleteConfirmText}
              $err={!!deleteError}
              onChange={(e) => { setDeleteConfirmText(e.target.value); setDeleteError(""); }}
            />
            {deleteError && <S.ErrText style={{ textAlign: "left", marginTop: 4 }}>{deleteError}</S.ErrText>}
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "center" }}>
              <S.CancelBtn onClick={() => setShowDeleteModal(false)}>Cancel</S.CancelBtn>
              <S.ConfirmDeleteBtn onClick={handleDeleteAccount} disabled={deleting}>
                {deleting ? "Deleting…" : "Yes, Delete Account"}
              </S.ConfirmDeleteBtn>
            </div>
          </S.ConfirmBox>
        </S.ConfirmOverlay>
      )}
    </>
  );
}
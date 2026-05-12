//admin database
import { useMemo, useState, useEffect, useRef } from "react";
import AdminHeader from "./AdminHeader";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

import {
  Page, Container, TopRow,
  Titles, Title, Subtitle, AddButton, PlusImg,
  SearchRow, SearchBox, SearchImg, SearchInput, StatsGrid,
  StatCard, StatValue, StatLabel, CardsGrid,
  PlantCard, PlantImage, PlantBody, PlantName,
  PlantLatin, TagsRow, Tag,
  CareRow, CareItem, MiniImg,
  CareText,  Desc, ButtonsRow, EditBtn,
  DeleteBtn, BtnIcon, Overlay, Modal,
  ModalHeader, ModalTitleWrap, ModalTitle,
  ModalSubTitle, CloseBtn, Form, Grid2,
  Grid3, Field, Label, TextInput,
  TextArea, Select, Actions, CancelBtn,
  PrimaryBtn, ImageUploadArea, PreviewImg,
  UploadOverlay, UploadPlaceholder
} from "../../styles/adminDatabaseStyles";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";

const BACKEND = "http://localhost:5000";

//initial state
const emptyForm = {
  name: "",
  scientific: "",
  description: "",
  type: "",
  sunlight: "",
  difficulty: "",
  wateringDays: "",
  fertilizingDays: "",
  careNotes: "",
};

//delete confirmation modal
const ConfirmOverlay = ({ plant, onConfirm, onCancel }) => (
  <Overlay onMouseDown={onCancel}>
    <Modal style={{ maxWidth: 400 }} onMouseDown={(e) => e.stopPropagation()}>
      <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 48, color: `${COLORS.critical}` }}
        >
          warning
        </span>
        <ModalTitle style={{ marginTop: 12 }}>
          Delete "{plant.name}"?
        </ModalTitle>
        <ModalSubTitle style={{ marginTop: 6 }}>
          This plant type will be permanently removed. It cannot be deleted if
          users currently own it.
        </ModalSubTitle>
        <Actions style={{ justifyContent: "center", marginTop: 20 }}>
          <CancelBtn type="button" onClick={onCancel}>
            Cancel
          </CancelBtn>
          <PrimaryBtn
            type="button"
            onClick={onConfirm}
            style={{ background: `${COLORS.deleteButton}` }}
          >
            Delete
          </PrimaryBtn>
        </Actions>
      </div>
    </Modal>
  </Overlay>
);

export default function AdminDatabase() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null); // File object from picker
  const [imagePreview, setImagePreview] = useState(null); // blob URL or existing URL
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  //refetch when query changes
  useEffect(() => {
    api
      .getPlantTypes(query)
      .then(setPlants)
      .finally(() => setLoading(false));
  }, [query]);

  //memoized so it only recalculates when the plant list changes
  const stats = useMemo(() => {
    const easy = plants.filter(
      (p) => (p.difficulty || "").toLowerCase() === "easy",
    ).length;
    const medium = plants.filter(
      (p) => (p.difficulty || "").toLowerCase() === "medium",
    ).length;
    const hard = plants.filter(
      (p) => (p.difficulty || "").toLowerCase() === "hard",
    ).length;
    return [
      {
        value: plants.length,
        label: "Total Plants in Database",
        color: "#9810FA",
      },
      { value: easy, label: "Easy Care", color: "#4CAF50" },
      { value: medium, label: "Medium Care", color: "#D49F37" },
      { value: hard, label: "Hard Care", color: "#E34F4F" },
    ];
  }, [plants]);

  // modal handlers
  const onAddPlant = () => {
    setMode("add");
    setSelected(null);
    setForm({ ...emptyForm, fertilizingDays: "30" });
    setImageFile(null);
    setImagePreview(null);
    setFeedback("");
    setModalOpen(true);
  };

  const onEdit = (p) => {
    setMode("edit");
    setSelected(p);
    setForm({
      name: p.name || "",
      scientific: p.scientificName || "",
      description: p.description || "",
      type: p.environment || "",
      sunlight: p.careRules?.sunlight || "",
      difficulty: p.difficulty || "",
      wateringDays: String(p.careRules?.wateringFrequencyDays || ""),
      fertilizingDays: String(p.careRules?.fertilizingFrequencyDays || ""),
      careNotes: p.careRules?.notes || "",
    });
    setImageFile(null);
    // Show the existing image as preview
    setImagePreview(
      p.imagePath
        ? p.imagePath.startsWith("/uploads/")
          ? `${BACKEND}${p.imagePath}`
          : p.imagePath
        : null,
    );
    setFeedback("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
    setImageFile(null);
    setImagePreview(null);
    setFeedback("");
  };

  //input handlers
  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Image picker
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setFeedback("Only JPEG, PNG, and WebP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFeedback("Image must be smaller than 5 MB.");
      return;
    }

    setFeedback("");
    setImageFile(file);
    // Create a local blob URL just for the preview — nothing is uploaded yet
    setImagePreview(URL.createObjectURL(file));
    // Reset input so picking the same file again still triggers onChange
    e.target.value = "";
  };

  // ── Submit 
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setFeedback("Plant name is required");
    if (!form.wateringDays || isNaN(form.wateringDays))
      return setFeedback("Valid watering frequency required");
    if (!form.fertilizingDays || isNaN(form.fertilizingDays))
      return setFeedback("Valid fertilizing frequency required");
    if (mode === "add" && !imageFile)
      return setFeedback("Please upload an image for the plant.");

    const payload = {
      name: form.name.trim(),
      scientificName: form.scientific.trim(),
      description: form.description.trim(),
      environment: form.type.trim(),
      difficulty: form.difficulty,
      careRules: {
        wateringFrequencyDays: +form.wateringDays,
        fertilizingFrequencyDays: +form.fertilizingDays,
        sunlight: form.sunlight.trim(),
        notes: form.careNotes.trim(),
      },
    };

    setSubmitting(true);
    try {
      if (mode === "add") {
        const created = await api.createPlantType(payload, imageFile);
        setPlants((prev) => [created, ...prev]);
      } else {
        // imageFile is null if the admin didn't pick a new one — backend keeps the old image
        const updated = await api.updatePlantType(
          selected._id,
          payload,
          imageFile || null,
        );
        setPlants((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p)),
        );
      }
      closeModal();
    } catch (err) {
      setFeedback(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deletePlantType(deleteTarget._id);
      setPlants((prev) => prev.filter((p) => p._id !== deleteTarget._id));
    } catch (err) {
      alert(err.message);
    }
    setDeleteTarget(null);
  };



  const resolveImage = (imagePath) => {
    if (!imagePath) return "images/default-plant.png"; // Fallback

    return imagePath;
  };

  return (
    <Page>
      <AdminHeader />
      <Container>
        <TopRow>
          <Titles>
            <Title>Plant Database</Title>
            <Subtitle>Manage plant types and care information</Subtitle>
          </Titles>
          <AddButton onClick={onAddPlant}>
            <span className="material-symbols-outlined">add_2</span>
            Add Plant
          </AddButton>
        </TopRow>

        <SearchRow>
          <SearchBox>
            <span class="material-symbols-outlined">search</span>{" "}
            <SearchInput
              placeholder="Search Plant Type..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchBox>
        </SearchRow>

        <StatsGrid>
          {stats.map((s) => (
            <StatCard key={s.label}>
              <StatValue color={s.color}>{s.value}</StatValue>
              <StatLabel>{s.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
            Loading plants…
          </div>
        ) : plants.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
            No plant types found. Add your first one!
          </div>
        ) : (
          <CardsGrid>
            {plants.map((p) => (
              <PlantCard key={p._id} onClick={() => navigate(`/admin/database/${p._id}`)}>
                <PlantImage src={resolveImage(p.imagePath)} />
                <PlantBody>
                  <PlantName>{p.name}</PlantName>
                  <PlantLatin>{p.scientificName}</PlantLatin>
                  <TagsRow>
                    <Tag bg="#F0FDF4" color="#4CAF50">
                      {p.difficulty}
                    </Tag>
                    <Tag>{p.environment}</Tag>
                  </TagsRow>
                  <CareRow>
                    <CareItem>
                      <span
                        className="material-symbols-outlined icon"
                        style={{ color: `${COLORS.iconBlue}`, fontSize: 18 }}
                      >
                        water_drop
                      </span>
                      <CareText>{p.careRules?.wateringFrequencyDays}d</CareText>
                    </CareItem>
                    <CareItem>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 18 }}
                      >
                        light_mode
                      </span>
                      <CareText>{p.careRules?.sunlight}</CareText>
                    </CareItem>
                  </CareRow>
                  <Desc>{p.description}</Desc>
                  <ButtonsRow>
                    <EditBtn onClick={() => onEdit(p)}>
                      <span class="material-symbols-outlined">edit</span> Edit
                    </EditBtn>
                    <DeleteBtn onClick={() => setDeleteTarget(p)}>
                      <span class="material-symbols-outlined">delete</span>{" "}
                      Delete
                    </DeleteBtn>
                  </ButtonsRow>
                </PlantBody>
              </PlantCard>
            ))}
          </CardsGrid>
        )}
      </Container>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <Overlay onMouseDown={closeModal}>
          <Modal onMouseDown={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitleWrap>
                <ModalTitle>
                  {mode === "edit" ? "Edit Plant Type" : "Add New Plant Type"}
                </ModalTitle>
                <ModalSubTitle>
                  {mode === "edit"
                    ? "Update plant information in the database"
                    : "Add a new plant type to the database"}
                </ModalSubTitle>
              </ModalTitleWrap>
              <CloseBtn onClick={closeModal} aria-label="close">
                ×
              </CloseBtn>
            </ModalHeader>

            {feedback && (
              <div
                style={{
                  background: "#fff5f5",
                  border: "1px solid #feb2b2",
                  color: "#c53030",
                  padding: "8px 12px",
                  borderRadius: 8,
                  marginTop: 10,
                  fontSize: 13,
                }}
              >
                {feedback}
              </div>
            )}

            <Form onSubmit={onSubmit}>
              <Grid2>
                <Field>
                  <Label>Plant Name *</Label>
                  <TextInput
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="e.g., Monstera Deliciosa"
                  />
                </Field>
                <Field>
                  <Label>Scientific Name</Label>
                  <TextInput
                    name="scientific"
                    value={form.scientific}
                    onChange={onChange}
                    placeholder="e.g., Monstera deliciosa"
                  />
                </Field>
              </Grid2>

              <Field>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Describe the plant..."
                  rows={3}
                />
              </Field>

              {/* ── Image upload ── */}
              <Field>
                <Label>
                  Plant Image{" "}
                  {mode === "add" ? "*" : "(leave empty to keep current)"}
                </Label>
                {/* Hidden real file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <ImageUploadArea
                  $hasImage={!!imagePreview}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <>
                      <PreviewImg src={imagePreview} alt="preview" />
                      <UploadOverlay>
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: 22 }}
                        >
                          photo_camera
                        </span>
                        Change Image
                      </UploadOverlay>
                    </>
                  ) : (
                    <UploadPlaceholder>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 32 }}
                      >
                        add_photo_alternate
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>
                        Click to upload image
                      </span>
                      <span style={{ fontSize: 11 }}>
                        JPEG, PNG or WebP · max 5 MB
                      </span>
                    </UploadPlaceholder>
                  )}
                </ImageUploadArea>
              </Field>

              <Grid3>
                <Field>
                  <Label>Type</Label>
                  <Select name="type" value={form.type} onChange={onChange}>
                    <option value="">Select</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Both">Both</option>
                  </Select>
                </Field>
                <Field>
                  <Label>Sunlight</Label>
                  <Select
                    name="sunlight"
                    value={form.sunlight}
                    onChange={onChange}
                  >
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Bright indirect">Bright indirect</option>
                    <option value="Full Sun">Full Sun</option>
                    <option value="Bright Direct">Bright Direct</option>
                  </Select>
                </Field>
                <Field>
                  <Label>Difficulty</Label>
                  <Select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={onChange}
                  >
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </Select>
                </Field>
              </Grid3>

              <Grid2>
                <Field>
                  <Label>Watering Frequency (days) *</Label>
                  <TextInput
                    name="wateringDays"
                    value={form.wateringDays}
                    onChange={onChange}
                    placeholder="e.g. 7"
                    type="number"
                    min="1"
                  />
                </Field>
                <Field>
                  <Label>Fertilizing Frequency (days) *</Label>
                  <TextInput
                    name="fertilizingDays"
                    value={form.fertilizingDays}
                    onChange={onChange}
                    placeholder="e.g. 30"
                    type="number"
                    min="1"
                  />
                </Field>
              </Grid2>

              <Field>
                <Label>Care Notes</Label>
                <TextArea
                  name="careNotes"
                  value={form.careNotes}
                  onChange={onChange}
                  rows={3}
                  placeholder="Extra care notes..."
                />
              </Field>

              <Actions>
                <CancelBtn type="button" onClick={closeModal}>
                  Cancel
                </CancelBtn>
                <PrimaryBtn type="submit" disabled={submitting}>
                  {submitting
                    ? "Saving…"
                    : mode === "edit"
                      ? "Save Changes"
                      : "Add Plant Type"}
                </PrimaryBtn>
              </Actions>
            </Form>
          </Modal>
        </Overlay>
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <ConfirmOverlay
          plant={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </Page>
  );
}

import { useMemo, useState } from "react";
import AdminHeader from "./AdminHeader";

import {
  Page,
  Container,
  TopRow,
  Titles,
  Title,
  Subtitle,
  AddButton,
  PlusImg,
  SearchRow,
  SearchBox,
  SearchImg,
  SearchInput,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  CardsGrid,
  PlantCard,
  PlantImage,
  PlantBody,
  PlantName,
  PlantLatin,
  TagsRow,
  Tag,
  CareRow,
  CareItem,
  MiniImg,
  CareText,
  Desc,
  ButtonsRow,
  EditBtn,
  DeleteBtn,
  BtnIcon,

  Overlay,
  Modal,
  ModalHeader,
  ModalTitleWrap,
  ModalTitle,
  ModalSubTitle,
  CloseBtn,
  Form,
  Grid2,
  Grid3,
  Field,
  Label,
  TextInput,
  TextArea,
  Select,
  UploadBtn,
  Actions,
  CancelBtn,
  PrimaryBtn,
} from "../../styles/adminDatabaseStyles";

import dropletIcon from "../../images/icons/Droplet.png";
import sunIcon from "../../images/icons/Sun.png";
import editIcon from "../../images/icons/Edit (2).png";
import searchIcon from "../../images/icons/Search.png";
import trashIcon from "../../images/icons/Trash 2.png";
import plusIcon from "../../images/icons/Plus.png";

const initialPlants = [
  {
    id: 1,
    name: "Midori",
    latin: "Monstera deliciosa",
    care: "easy",
    location: "indoors",
    watering: "7d",
    fertilizing: "30d",
    light: "Medium",
    desc:
      "A popular tropical houseplant with large, split leaves. Native to Central America, it can grow quite large indoors.",
    careNotes: "Keep in bright indirect light.",
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Midori 2",
    latin: "Monstera deliciosa",
    care: "easy",
    location: "indoors",
    watering: "7d",
    fertilizing: "30d",
    light: "Medium",
    desc:
      "A popular tropical houseplant with large, split leaves. Native to Central America, it can grow quite large indoors.",
    careNotes: "Avoid direct harsh sun.",
    img: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Midori 3",
    latin: "Monstera deliciosa",
    care: "medium",
    location: "indoors",
    watering: "10d",
    fertilizing: "30d",
    light: "Low",
    desc:
      "A popular tropical houseplant with large, split leaves. Native to Central America, it can grow quite large indoors.",
    careNotes: "Water only when top soil dries.",
    img: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Midori 4",
    latin: "Monstera deliciosa",
    care: "hard",
    location: "outdoors",
    watering: "5d",
    fertilizing: "20d",
    light: "High",
    desc:
      "A popular tropical houseplant with large, split leaves. Native to Central America, it can grow quite large indoors.",
    careNotes: "Needs warmer weather and humidity.",
    img: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Midori 5",
    latin: "Monstera deliciosa",
    care: "easy",
    location: "indoors",
    watering: "7d",
    fertilizing: "30d",
    light: "Medium",
    desc:
      "A popular tropical houseplant with large, split leaves. Native to Central America, it can grow quite large indoors.",
    careNotes: "Mist occasionally.",
    img: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function AdminDatabase({ setPage }) {
  const [query, setQuery] = useState("");
  const [plants, setPlants] = useState(initialPlants);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selected, setSelected] = useState(null);

  const emptyForm = {
    name: "",
    scientific: "",
    description: "",
    imageUrl: "",
    type: "",
    sunlight: "",
    difficulty: "",
    wateringDays: "",
    fertilizingDays: "",
    careNotes: "",
  };

  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return plants;

    return plants.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.latin.toLowerCase().includes(q) ||
        p.care.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.light.toLowerCase().includes(q)
    );
  }, [query, plants]);

  const stats = useMemo(() => {
    const easyCount = plants.filter((p) => p.care === "easy").length;
    const mediumCount = plants.filter((p) => p.care === "medium").length;
    const hardCount = plants.filter((p) => p.care === "hard").length;

    return [
      { value: plants.length, label: "Total Plants in Database", color: "#9810FA" },
      { value: easyCount, label: "Easy Care", color: "#4CAF50" },
      { value: mediumCount, label: "Medium Care", color: "#D49F37" },
      { value: hardCount, label: "Hard Care", color: "#E34F4F" },
    ];
  }, [plants]);

  const onAddPlant = () => {
    setMode("add");
    setSelected(null);
    setForm({
      ...emptyForm,
      fertilizingDays: "30",
    });
    setModalOpen(true);
  };

  const onEdit = (p) => {
    setMode("edit");
    setSelected(p);
    setForm({
      name: p.name || "",
      scientific: p.latin || "",
      description: p.desc || "",
      imageUrl: p.img || "",
      type: p.location || "",
      sunlight: p.light || "",
      difficulty: p.care || "",
      wateringDays: (p.watering || "").replace("d", ""),
      fertilizingDays: (p.fertilizing || "30d").replace("d", ""),
      careNotes: p.careNotes || "",
    });
    setModalOpen(true);
  };

  const onDelete = (p) => {
    const confirmDelete = window.confirm(`Delete ${p.name}?`);
    if (!confirmDelete) return;

    setPlants((prev) => prev.filter((plant) => plant.id !== p.id));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Plant name is required");
    if (!form.scientific.trim()) return alert("Scientific name is required");
    if (!form.description.trim()) return alert("Description is required");
    if (!form.type.trim()) return alert("Type is required");
    if (!form.sunlight.trim()) return alert("Sunlight is required");
    if (!form.difficulty.trim()) return alert("Difficulty is required");
    if (!form.wateringDays.trim()) return alert("Watering frequency is required");
    if (!form.fertilizingDays.trim()) return alert("Fertilizing frequency is required");

    const normalizedPlant = {
      id: mode === "edit" ? selected.id : Date.now(),
      name: form.name.trim(),
      latin: form.scientific.trim(),
      desc: form.description.trim(),
      img:
        form.imageUrl.trim() ||
        "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1200&auto=format&fit=crop",
      location: form.type.trim(),
      light: form.sunlight.trim(),
      care: form.difficulty.trim(),
      watering: `${form.wateringDays.trim()}d`,
      fertilizing: `${form.fertilizingDays.trim()}d`,
      careNotes: form.careNotes.trim(),
    };

    if (mode === "add") {
      setPlants((prev) => [normalizedPlant, ...prev]);
    } else {
      setPlants((prev) =>
        prev.map((plant) =>
          plant.id === selected.id ? normalizedPlant : plant
        )
      );
    }

    closeModal();
    setForm(emptyForm);
  };

  return (
    <Page>
      <AdminHeader
        active="database"
        adminName="Admin"
        onDashboard={() => setPage("admin")}
        onDatabase={() => setPage("admin-db")}
        onCalendar={() => setPage("admin-calendar")}
        onAdmin={() => setPage("profile")}
      />

      <Container>
        <TopRow>
          <Titles>
            <Title>Plant Database</Title>
            <Subtitle>Manage plant types and care information</Subtitle>
          </Titles>

          <AddButton onClick={onAddPlant}>
            <PlusImg src={plusIcon} alt="plus" />
            Add Plant
          </AddButton>
        </TopRow>

        <SearchRow>
          <SearchBox>
            <SearchImg src={searchIcon} alt="search" />
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

        <CardsGrid>
          {filtered.map((p) => (
            <PlantCard key={p.id}>
              <PlantImage src={p.img} />
              <PlantBody>
                <PlantName>{p.name}</PlantName>
                <PlantLatin>{p.latin}</PlantLatin>

                <TagsRow>
                  <Tag bg="#F0FDF4" color="#4CAF50">
                    {p.care}
                  </Tag>
                  <Tag>{p.location}</Tag>
                </TagsRow>

                <CareRow>
                  <CareItem>
                    <MiniImg src={dropletIcon} alt="water" />
                    <CareText>{p.watering}</CareText>
                  </CareItem>

                  <CareItem>
                    <MiniImg src={sunIcon} alt="sun" />
                    <CareText>{p.light}</CareText>
                  </CareItem>
                </CareRow>

                <Desc>{p.desc}</Desc>

                <ButtonsRow>
                  <EditBtn onClick={() => onEdit(p)}>
                    <BtnIcon src={editIcon} alt="edit" />
                    Edit
                  </EditBtn>

                  <DeleteBtn onClick={() => onDelete(p)}>
                    <BtnIcon src={trashIcon} alt="trash" />
                    Delete
                  </DeleteBtn>
                </ButtonsRow>
              </PlantBody>
            </PlantCard>
          ))}
        </CardsGrid>
      </Container>

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
                  <Label>Scientific Name *</Label>
                  <TextInput
                    name="scientific"
                    value={form.scientific}
                    onChange={onChange}
                    placeholder="e.g., Monstera deliciosa"
                  />
                </Field>
              </Grid2>

              <Field>
                <Label>Description *</Label>
                <TextArea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Describe the plant..."
                  rows={4}
                />
              </Field>

              <Field>
                <Label>Image URL</Label>
                <TextInput
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={onChange}
                  placeholder="Paste image URL here..."
                />
              </Field>

              <Grid3>
                <Field>
                  <Label>Type *</Label>
                  <Select name="type" value={form.type} onChange={onChange}>
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="indoors">indoors</option>
                    <option value="outdoors">outdoors</option>
                  </Select>
                </Field>

                <Field>
                  <Label>Sunlight *</Label>
                  <Select
                    name="sunlight"
                    value={form.sunlight}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Select>
                </Field>

                <Field>
                  <Label>Difficulty *</Label>
                  <Select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                  </Select>
                </Field>
              </Grid3>

              <Grid2>
                <Field>
                  <Label>Watering Frequency(days) *</Label>
                  <TextInput
                    name="wateringDays"
                    value={form.wateringDays}
                    onChange={onChange}
                  />
                </Field>

                <Field>
                  <Label>Fertilizing Frequency(days) *</Label>
                  <TextInput
                    name="fertilizingDays"
                    value={form.fertilizingDays}
                    onChange={onChange}
                  />
                </Field>
              </Grid2>

              <Field>
                <Label>Care Notes</Label>
                <TextArea
                  name="careNotes"
                  value={form.careNotes}
                  onChange={onChange}
                  rows={4}
                  placeholder="Extra care notes..."
                />
              </Field>

              <Actions>
                <CancelBtn type="button" onClick={closeModal}>
                  Cancel
                </CancelBtn>

                <PrimaryBtn type="submit">
                  {mode === "edit" ? "Save Changes" : "Add Plant Type"}
                </PrimaryBtn>
              </Actions>
            </Form>
          </Modal>
        </Overlay>
      )}
    </Page>
  );
}
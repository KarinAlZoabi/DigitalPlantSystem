import { useState, useEffect } from "react";
import { api } from "../api/api";
// Importing the new separate style file (see section 2 below)
import * as S from "../styles/AddPlantModalStyles";

export default function AddPlantModal({ onClose, onAdded }) {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1); // 1: Search, 2: Customize
  const [plantTypes, setPlantTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [nickname, setNickname] = useState("");
  // const [location, setLocation] = useState("Indoor");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // --- API LOGIC ---
  // Re-run search whenever the "search" string changes
  useEffect(() => {
    setFetching(true);
    api
      .getPlantTypes(search)
      .then((data) => setPlantTypes(data))
      .finally(() => setFetching(false));
  }, [search]);

  // --- VALIDATION ---
  const validateNickname = (val) => {
    if (!val.trim()) return "Nickname is required";
    if (val.trim().length < 2) return "Minimum 2 characters";
    if (val.trim().length > 30) return "Maximum 30 characters";
    // Regex: Only allow letters, numbers, spaces, hyphens, and apostrophes
    if (!/^[a-zA-Z0-9\s\-']+$/.test(val.trim()))
      return "Letters, numbers, spaces, hyphens only";
    return "";
  };

  // --- HANDLERS ---
  const handleSelect = (pt) => {
    setSelected(pt);
    setStep(2); // Move to customization screen
    setNickname("");
    setErrors({});
  };

  const handleAdd = async () => {
    const err = validateNickname(nickname);
    if (err) {
      setErrors({ nickname: err });
      return;
    }

    setLoading(true);
    try {
      // Send the selection to the backend to create a UserPlant
      const plant = await api.addUserPlant({
        plantTypeId: selected._id,
        nickname: nickname.trim(),
       
      });
      onAdded(plant); // Update the parent UI list
      onClose(); // Close modal
    } catch (e) {
      setErrors({ api: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      {/* stopPropagation prevents clicking inside the modal from closing it */}
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <div>
            <S.Title>
              {step === 1 ? "Add a Plant" : "Customize Your Plant"}
            </S.Title>
            <S.Subtitle>
              {step === 1
                ? "Browse our plant database and select a species"
                : "Give your plant a nickname and choose its location"}
            </S.Subtitle>
          </div>
          <S.CloseBtn onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </S.CloseBtn>
        </S.Header>

        <S.Body>
          {/* --- STEP 1: THE SEARCH GRID --- */}
          {step === 1 && (
            <>
              <S.SearchWrap>
                <S.SearchIcon className="material-symbols-outlined">
                  search
                </S.SearchIcon>
                <S.SearchInput
                  placeholder="Search by name, difficulty..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </S.SearchWrap>

              {fetching ? (
                <S.EmptyMsg>Loading plants…</S.EmptyMsg>
              ) : plantTypes.length === 0 ? (
                <S.EmptyMsg>No plants found matching "{search}"</S.EmptyMsg>
              ) : (
                <S.Grid>
                  {plantTypes.map((pt) => (
                    <S.PlantCard
                      key={pt._id}
                      $sel={selected?._id === pt._id}
                      onClick={() => handleSelect(pt)}
                    >
                      <S.PlantCardImg src={pt.imagePath} alt={pt.name} />
                      <S.PlantCardBody>
                        <S.PlantCardName>{pt.name}</S.PlantCardName>
                        <S.PlantCardSci>{pt.scientificName}</S.PlantCardSci>
                        <S.DiffBadge $d={pt.difficulty}>
                          {pt.difficulty}
                        </S.DiffBadge>
                      </S.PlantCardBody>
                    </S.PlantCard>
                  ))}
                </S.Grid>
              )}
            </>
          )}

          {/* --- STEP 2: THE CUSTOMIZATION FORM --- */}
          {step === 2 && selected && (
            <>
              <S.BackBtn onClick={() => setStep(1)}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 }}
                >
                  arrow_back
                </span>
                Back to plant list
              </S.BackBtn>

              <S.Preview>
                <S.PreviewImg src={selected.imagePath} alt={selected.name} />
                <div>
                  <div style={{ fontWeight: 700 }}>{selected.name}</div>
                  <S.DiffBadge $d={selected.difficulty}>
                    {selected.difficulty}
                  </S.DiffBadge>
                </div>
              </S.Preview>

              <S.FieldWrap>
                <S.Label>Plant Nickname *</S.Label>
                <S.Input
                  placeholder='e.g. "Leafy"'
                  value={nickname}
                  $err={!!errors.nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setErrors({});
                  }}
                  autoFocus
                />
                {errors.nickname ? (
                  <S.ErrText>{errors.nickname}</S.ErrText>
                ) : (
                  <S.HintText>2–30 characters.</S.HintText>
                )}
              </S.FieldWrap>

              <S.InfoText>
                Location is automatically set based on the plant type to ensure
                proper care.
              </S.InfoText>

              <S.InfoText>
                Recommended environment: <strong>{selected.environment}</strong>
              </S.InfoText>

              {/* AUTOMATIC CARE RULES DISPLAY */}
              <div
                style={{ background: "#f0fdf4", borderRadius: 12, padding: 14 }}
              >
                <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                  Schedule:
                </div>
                <div style={{ display: "flex", gap: 15, fontSize: "0.75rem" }}>
                  <span>
                    💧 {selected.careRules?.wateringFrequencyDays} days
                  </span>
                  <span>
                    🌿 {selected.careRules?.fertilizingFrequencyDays} days
                  </span>
                </div>
              </div>
            </>
          )}
        </S.Body>

        <S.Footer>
          <S.CancelBtn onClick={onClose}>Cancel</S.CancelBtn>
          {step === 2 && (
            <S.AddBtn onClick={handleAdd} disabled={loading}>
              {loading ? "Adding..." : "Add to My Plants"}
            </S.AddBtn>
          )}
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  );
}

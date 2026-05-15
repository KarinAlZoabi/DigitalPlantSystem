import { useEffect, useState } from "react";
import CareInfoTab from "../../components/careInfoTab";
import { api } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";
import { ActionButton } from "../../styles/plantDetailsStyles";

import {
  PageContainer,
  BackButton,
  DetailsGrid,
  Sidebar,
  PlantImg,
  SidebarContent,
  InfoCard,
} from "../../styles/adminPlantDetailsStyles";

export default function AdminPlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  useEffect(() => {
    api
      .getPlantTypeById(id)
      .then(setPlant)
      .catch(() => setPlant(null));
  }, [id]);

  const closeDeleteConfirm = () => {
    setShowConfirmDelete(false);
    setDeleteText("");
  };

  const handleDeletePlantType = async () => {
    if (deleteText !== "DELETE") return;

    setDeleteLoading(true);

    try {
      await api.deletePlantType(id);
      navigate("/admin/database", { replace: true });
    } catch (err) {
      alert(err.message || "Failed to delete plant type.");
    } finally {
      setDeleteLoading(false);
      closeDeleteConfirm();
    }
  };

  if (!plant) {
    return (
      <>
        <AdminHeader />
        <PageContainer>Loading...</PageContainer>
      </>
    );
  }

  return (
    <>
      <AdminHeader />

      <PageContainer>
        <BackButton onClick={() => navigate("/admin/database")}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Database
        </BackButton>

        <DetailsGrid>
          <Sidebar>
            <PlantImg src={plant.imagePath} alt={plant.name} />

            <SidebarContent>
              <h1>{plant.name}</h1>

              <p className="scientific">{plant.scientificName}</p>

              <ActionButton
                type="button"
                variant="delete"
                onClick={() => setShowConfirmDelete(true)}
              >
                <span className="material-symbols-outlined">delete</span>
                Delete Plant Type
              </ActionButton>
            </SidebarContent>
          </Sidebar>

          <InfoCard>
            <CareInfoTab plant={plant} isAdmin={true} />
          </InfoCard>
        </DetailsGrid>
      </PageContainer>

      {showConfirmDelete && (
        <ConfirmOverlay>
          <ConfirmBox>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 48, color: COLORS.deleteButton }}
            >
              warning
            </span>

            <h3>Delete {plant.name}?</h3>

            <p>
              This will permanently delete this plant type from the admin
              database. It cannot be deleted if users currently own it.
            </p>

            <DeleteInstruction>
              Type <strong>DELETE</strong> to confirm.
            </DeleteInstruction>

            <DeleteInput
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder="Type DELETE"
              autoFocus
            />

            <ConfirmActions>
              <CancelButton
                type="button"
                onClick={closeDeleteConfirm}
                disabled={deleteLoading}
              >
                Cancel
              </CancelButton>

              <ConfirmDeleteButton
                type="button"
                onClick={handleDeletePlantType}
                disabled={deleteLoading || deleteText !== "DELETE"}
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </ConfirmDeleteButton>
            </ConfirmActions>
          </ConfirmBox>
        </ConfirmOverlay>
      )}
    </>
  );
}

const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ConfirmBox = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

  h3 {
    margin: 12px 0 8px;
    color: ${COLORS.primaryText};
  }

  p {
    color: ${COLORS.secondaryText};
    font-size: 0.9rem;
    margin: 0 0 18px;
    line-height: 1.6;
  }
`;

const DeleteInstruction = styled.div`
  color: ${COLORS.primaryText};
  font-size: 0.9rem;
  margin-bottom: 10px;

  strong {
    color: ${COLORS.deleteButton};
    letter-spacing: 0.5px;
  }
`;

const DeleteInput = styled.input`
  width: 100%;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 11px 14px;
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  outline: none;
  margin-bottom: 20px;
  text-align: center;

  &:focus {
    border-color: ${COLORS.deleteButton};
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
  }
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: white;
  color: #374151;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-weight: 600;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ConfirmDeleteButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: ${COLORS.deleteButton};
  color: white;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-weight: 600;

  &:hover {
    background: #b91c1c;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #fca5a5;
  }
`;

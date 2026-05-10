import { useEffect, useState } from "react";
import CareInfoTab from "../../components/careInfoTab";
import { api } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";

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

  useEffect(() => {
    api.getPlantTypeById(id)
      .then(setPlant)
      .catch(() => setPlant(null));
  }, [id]);

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
        <BackButton onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">
            arrow_back
          </span>

          Back to Database
        </BackButton>

        <DetailsGrid>
          <Sidebar>
            <PlantImg
              src={plant.imagePath}
              alt={plant.name}
            />

            <SidebarContent>
              <h1>{plant.name}</h1>

              <p className="scientific">
                {plant.scientificName}
              </p>
            </SidebarContent>
          </Sidebar>

          <InfoCard>
            <CareInfoTab plant={plant}   isAdmin={true} />
          </InfoCard>
        </DetailsGrid>
      </PageContainer>
    </>
  );
}
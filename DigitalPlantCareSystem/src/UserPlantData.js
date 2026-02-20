import { plants } from "./PlantDummyData";

export const userPlants = [
  {
    id: "up-1",
    nickname: "Midori",
    plantDetails: plants[0], // Monstera
    lastWatered: "2024-02-16T10:00:00Z",
    healthStatus: "attention", // Matches the orange dot in your image
    location: "Indoors",
  },
  {
    id: "up-2",
    nickname: "Serpentina",
    plantDetails: plants[1], // Snake Plant
    lastWatered: "2024-02-10T08:30:00Z",
    healthStatus: "healthy",
    location: "Indoors",
  },
  {
    id: "up-3",
    nickname: "Figgy Smalls",
    plantDetails: plants[2], // Fiddle Leaf Fig
    lastWatered: "2024-02-17T14:00:00Z",
    healthStatus: "critical",
    location: "Indoors",
  },
  {
    id: "up-4",
    nickname: "Lulu",
    plantDetails: plants[3], // Lavender
    lastWatered: "2024-02-18T09:00:00Z",
    healthStatus: "healthy",
    location: "Outdoors",
  },
  {
    id: "up-5",
    nickname: "Ivy",
    plantDetails: plants[4], // Golden Pothos
    lastWatered: "2024-02-12T11:00:00Z",
    healthStatus: "healthy",
    location: "Indoors",
  },
  {
    id: "up-6",
    nickname: "Vera",
    plantDetails: plants[5], // Aloe Vera
    lastWatered: "2024-01-30T10:00:00Z",
    healthStatus: "attention",
    location: "Indoors",
  }
];
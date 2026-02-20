import monsteraImg from "./images/plants/Monstera-Deliciosa.jpg";
import DracaenaImg from "./images/plants/Dracaena-Trifasciata.jpg";
import FicusImg from "./images/plants/Ficus-Lyrata.jpg";
import LavandulaImg from "./images/plants/Lavandula-Angustifolia.jpg";
import EpipremnumImg from "./images/plants/Epipremnum-Aureum.jpg";
import AloeImg from "./images/plants/Aloe-Barbadensis-Miller.jpg";


export const plants = [
  {
    id: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-01T14:30:00Z",
    imagePath: monsteraImg,
    scientificName: "Monstera Deliciosa",
    name: "Monstera",
    description: "Known for its iconic natural leaf holes, this 'Swiss Cheese Plant' is a statement piece for any room.",
    sunlight: "Bright indirect",
    difficulty: "Easy",
    careRules: {
        wateringFrequencyDays: 7,
        fertilizingFrequencyDays: 30,
        sunlight: "medium",
        notes: "Wipe leaves regularly to prevent dust buildup and encourage growth."
    },
    location: "indoor"
  },
  {
    id: 2,
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
    imagePath: DracaenaImg,
    scientificName: "Dracaena Trifasciata",
    name: "Snake Plant",
    description: "A hardy succulent that can tolerate low light and irregular watering.",
    sunlight: "Low to Bright indirect",
    difficulty: "Beginner",
    careRules: {
        wateringFrequencyDays: 14,
        fertilizingFrequencyDays: 60,
        sunlight: "low",
        notes: "Better to underwater than overwater; ensure soil is completely dry."
    },
    location: "indoor"
  },
  {
    id: 3,
    createdAt: "2024-01-18T11:20:00Z",
    updatedAt: "2024-01-20T16:45:00Z",
    imagePath: FicusImg,
    scientificName: "Ficus Lyrata",
    name: "Fiddle Leaf Fig",
    description: "A popular indoor tree with large, violin-shaped leaves.",
    sunlight: "Bright indirect",
    difficulty: "Hard",
    careRules: {
        wateringFrequencyDays: 10,
        fertilizingFrequencyDays: 30,
        sunlight: "high",
        notes: "Does not like being moved; keep away from cold drafts."
    },
    location: "indoor"
  },
  {
    id: 4,
    createdAt: "2024-01-22T08:15:00Z",
    updatedAt: "2024-01-22T08:15:00Z",
    imagePath: LavandulaImg,
    scientificName: "Lavandula Angustifolia",
    name: "Lavender",
    description: "Fragrant purple flowers that thrive in sunny outdoor spots.",
    sunlight: "Full Sun",
    difficulty: "Medium",
    careRules: {
        wateringFrequencyDays: 4,
        fertilizingFrequencyDays: 45,
        sunlight: "high",
        notes: "Requires well-draining soil and plenty of airflow."
    },
    location: "outdoor"
  },
  {
    id: 5,
    createdAt: "2024-01-25T14:00:00Z",
    updatedAt: "2024-01-25T14:00:00Z",
    imagePath: EpipremnumImg,
    scientificName: "Epipremnum Aureum",
    name: "Golden Pothos",
    description: "A trailing vine that is nearly impossible to kill.",
    sunlight: "Low to Medium",
    difficulty: "Easy",
    careRules: {
        wateringFrequencyDays: 7,
        fertilizingFrequencyDays: 60,
        sunlight: "low",
        notes: "Can be easily propagated from stem cuttings in water."
    },
    location: "indoor"
  },
  {
    id: 6,
    createdAt: "2024-02-05T12:00:00Z",
    updatedAt: "2024-02-05T12:00:00Z",
    imagePath: AloeImg,
    scientificName: "Aloe Barbadensis Miller",
    name: "Aloe Vera",
    description: "A functional succulent known for the soothing gel inside its leaves.",
    sunlight: "Bright Direct",
    difficulty: "Easy",
    careRules: {
        wateringFrequencyDays: 21,
        fertilizingFrequencyDays: 90,
        sunlight: "high",
        notes: "Avoid watering the center of the rosette to prevent rot."
    },
    location: "indoor"
  }
];
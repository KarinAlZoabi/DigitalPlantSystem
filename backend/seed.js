require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const User = require("./models/User");
const PlantType = require("./models/PlantType");
const UserPlant = require("./models/UserPlant");

console.log("ENV TEST:", process.env.MONGO_URI);

async function MasterSeed() {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear collections
  await User.deleteMany({});
  await PlantType.deleteMany({});
  await UserPlant.deleteMany({});

  const user = await User.create({
    name: "Karin",
    email: "karin@example.com",
    passwordHash: "secure_hash",
    role: "user",
    numberOfPlantsOwned: 1,
  });
  console.log("COPY THIS ID:", user._id);

  const plantTypes = await PlantType.insertMany([
  {
    name: "Monstera",
    scientificName: "Monstera Deliciosa",
    description: "A tropical plant known for its large, split leaves. Perfect for indoor spaces.",
    difficulty: "Easy",
    imagePath: "/images/plants/Monstera-Deliciosa.jpg",
    careRules: {
      wateringFrequencyDays: 7,
      fertilizingFrequencyDays: 30,
      sunlight: "Bright indirect",
      notes: "Avoid direct sunlight. Wipe leaves occasionally to keep them healthy.",
    },
  },
  {
    name: "Snake Plant",
    scientificName: "Dracaena Trifasciata",
    description: "A hardy plant that tolerates low light and irregular watering.",
    difficulty: "Beginner",
    imagePath: "/images/plants/Dracaena-Trifasciata.jpg",
    careRules: {
      wateringFrequencyDays: 14,
      fertilizingFrequencyDays: 60,
      sunlight: "Low",
      notes: "Do not overwater. Thrives on neglect.",
    },
  },
  {
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus Lyrata",
    description: "A popular but sensitive plant with large violin-shaped leaves.",
    difficulty: "Hard",
    imagePath: "/images/plants/Ficus-Lyrata.jpg",
    careRules: {
      wateringFrequencyDays: 10,
      fertilizingFrequencyDays: 30,
      sunlight: "Bright indirect",
      notes: "Keep in consistent conditions. Avoid moving it frequently.",
    },
  },
  {
    name: "Lavender",
    scientificName: "Lavandula Angustifolia",
    description: "A fragrant outdoor plant known for its calming scent and purple flowers.",
    difficulty: "Medium",
    imagePath: "/images/plants/Lavandula-Angustifolia.jpg",
    careRules: {
      wateringFrequencyDays: 4,
      fertilizingFrequencyDays: 45,
      sunlight: "Full Sun",
      notes: "Needs well-drained soil and plenty of sunlight.",
    },
  },
  {
    name: "Golden Pothos",
    scientificName: "Epipremnum Aureum",
    description: "A fast-growing vine that adapts well to indoor environments.",
    difficulty: "Easy",
    imagePath: "/images/plants/Epipremnum-Aureum.jpg",
    careRules: {
      wateringFrequencyDays: 7,
      fertilizingFrequencyDays: 60,
      sunlight: "Low",
      notes: "Very forgiving plant. Great for beginners.",
    },
  },
  {
    name: "Aloe Vera",
    scientificName: "Aloe Barbadensis Miller",
    description: "A succulent known for its medicinal gel and low maintenance needs.",
    difficulty: "Easy",
    imagePath: "/images/plants/Aloe-Barbadensis-Miller.jpg",
    careRules: {
      wateringFrequencyDays: 21,
      fertilizingFrequencyDays: 90,
      sunlight: "Bright Direct",
      notes: "Let soil dry completely between watering.",
    },
  },
]);

  console.log("Plant Types Created");

  const userPlantsData = [
    {
      nickname: "Midori",
      plantIndex: 0,
      location: "Indoor",
      daysAgoWatered: 2,
    },
    {
      nickname: "Serpentina",
      plantIndex: 1,
      location: "Indoor",
      daysAgoWatered: 5,
    },
    {
      nickname: "Figgy Smalls",
      plantIndex: 2,
      location: "Indoor",
      daysAgoWatered: 13,
    },
    {
      nickname: "Lulu",
      plantIndex: 3,
      location: "Outdoor",
      daysAgoWatered: 1,
    },
    {
      nickname: "Ivy",
      plantIndex: 4,
      location: "Indoor",
      daysAgoWatered: 4,
    },
    {
      nickname: "Vera",
      plantIndex: 5,
      location: "Outdoor",
      daysAgoWatered: 15,
    },
  ];

  for (const plant of userPlantsData) {
    const plantType = plantTypes[plant.plantIndex];

    const lastWatered = new Date();
    lastWatered.setDate(lastWatered.getDate() - plant.daysAgoWatered);

    const nextDue = new Date(lastWatered);
    nextDue.setDate(
      nextDue.getDate() + plantType.careRules.wateringFrequencyDays,
    );

    await UserPlant.create({
      userId: user._id,
      plantTypeId: plantType._id,
      nickname: plant.nickname,
      location: plant.location,
      lastWatered,
      careSchedule: {
        watering: {
          lastDone: lastWatered,
          nextDue,
        },
      },
    });
  }

  console.log("User Plants Created");

  console.log("Database seeded successfully! 🌱");
  process.exit();
}

MasterSeed();

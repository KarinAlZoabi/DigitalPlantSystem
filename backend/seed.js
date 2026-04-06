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
    numberOfPlantsOwned: 1
  });
  console.log("COPY THIS ID:", user._id);

  
  const monsteraType = await PlantType.create({
    name: "Monstera",
    scientificName: "Monstera Deliciosa",
    difficulty: "Easy",
    imagePath: "/images/plants/Monstera-Deliciosa.jpg",
    careRules: {
      wateringFrequencyDays: 7,
      fertilizingFrequencyDays: 30,
      sunlight: "Bright indirect"
    }
  });
    console.log("plant created!");


  // 3. Logic: Calculate dates 
  const lastWateredDate = new Date();
  lastWateredDate.setDate(lastWateredDate.getDate() - 2); // 2 days ago

  const nextWateringDate = new Date(lastWateredDate);
  nextWateringDate.setDate(nextWateringDate.getDate() + monsteraType.careRules.wateringFrequencyDays);

  
  await UserPlant.create({
    userId: user._id,
    plantTypeId: monsteraType._id,
    nickname: "Midori",
    location: "Living Room",
    healthStatus: "healthy",
    lastWatered: lastWateredDate,
    careSchedule: {
      watering: {
        lastDone: lastWateredDate,
        nextDue: nextWateringDate
      }
    }
  });

  console.log("Database seeded successfully! 🌱");
  process.exit();
}

MasterSeed();
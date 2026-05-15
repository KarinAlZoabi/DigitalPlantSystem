require("dotenv").config({ path: __dirname + "/.env" });

const mongoose = require("mongoose");
const PlantType = require("./models/PlantType");
const User = require("./models/User");
const UserPlant = require("./models/UserPlant");
const CareTask = require("./models/CareTask");
const CareTimeline = require("./models/CareTimeline");

const TARGET_USER_EMAILS = [
  "karinalzoabi15@gmail.com",
];

// Use an existing image until you add real images for these plants.
// If you add real files later, replace these imagePath values.
const DEFAULT_IMAGE = "/images/plants/Monstera-Deliciosa.jpg";

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function taskStatus(dueDate) {
  return new Date(dueDate) < new Date() ? "overdue" : "pending";
}

async function upsertPlantTypes() {
  const plantTypesData = [
    {
      name: "Peace Lily",
      scientificName: "Spathiphyllum Wallisii",
      description:
        "An elegant indoor plant with glossy green leaves and white flowers. It prefers consistent moisture and indirect light.",
      difficulty: "Easy",
      environment: "Indoor",
      imagePath: DEFAULT_IMAGE,
      careRules: {
        wateringFrequencyDays: 5,
        fertilizingFrequencyDays: 30,
        sunlight: "Medium indirect light",
        notes:
          "Keep soil lightly moist. Leaves may droop when the plant needs water.",
      },
    },
    {
      name: "Rubber Plant",
      scientificName: "Ficus Elastica",
      description:
        "A bold indoor plant with thick, shiny leaves. It grows well in bright indirect light and moderate watering.",
      difficulty: "Medium",
      environment: "Indoor",
      imagePath: DEFAULT_IMAGE,
      careRules: {
        wateringFrequencyDays: 8,
        fertilizingFrequencyDays: 35,
        sunlight: "Bright indirect light",
        notes:
          "Allow the top layer of soil to dry before watering. Wipe leaves to remove dust.",
      },
    },
    {
      name: "Boston Fern",
      scientificName: "Nephrolepis Exaltata",
      description:
        "A lush fern with soft arching fronds. It enjoys humidity, regular watering, and indirect light.",
      difficulty: "Medium",
      environment: "Indoor",
      imagePath: DEFAULT_IMAGE,
      careRules: {
        wateringFrequencyDays: 3,
        fertilizingFrequencyDays: 30,
        sunlight: "Indirect light",
        notes:
          "Mist regularly or keep in a humid area. Do not let the soil fully dry out.",
      },
    },
    {
      name: "Calathea",
      scientificName: "Calathea Orbifolia",
      description:
        "A decorative foliage plant known for large patterned leaves. It needs stable humidity and filtered light.",
      difficulty: "Hard",
      environment: "Indoor",
      imagePath: DEFAULT_IMAGE,
      careRules: {
        wateringFrequencyDays: 4,
        fertilizingFrequencyDays: 30,
        sunlight: "Filtered indirect light",
        notes:
          "Sensitive to dry air and inconsistent watering. Avoid direct sun.",
      },
    },
    {
      name: "Jade Plant",
      scientificName: "Crassula Ovata",
      description:
        "A succulent with thick oval leaves. It stores water and prefers bright light with infrequent watering.",
      difficulty: "Easy",
      environment: "Indoor/Outdoor",
      imagePath: DEFAULT_IMAGE,
      careRules: {
        wateringFrequencyDays: 18,
        fertilizingFrequencyDays: 60,
        sunlight: "Bright direct or indirect light",
        notes:
          "Let soil dry completely between watering. Avoid overwatering.",
      },
    },
    {
      name: "Rosemary",
      scientificName: "Salvia Rosmarinus",
      description:
        "A fragrant herb that grows well outdoors in sunny conditions. It prefers well-drained soil.",
      difficulty: "Medium",
      environment: "Outdoor",
      imagePath: DEFAULT_IMAGE,
      careRules: {
        wateringFrequencyDays: 6,
        fertilizingFrequencyDays: 45,
        sunlight: "Full sun",
        notes:
          "Needs strong sunlight and good drainage. Avoid keeping the soil soggy.",
      },
    },
  ];

  const plantMap = {};

  for (const plant of plantTypesData) {
    const savedPlant = await PlantType.findOneAndUpdate(
      { name: plant.name },
      { $set: plant },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    plantMap[savedPlant.name] = savedPlant;
    console.log(`Plant type ready: ${savedPlant.name}`);
  }

  return plantMap;
}

async function upsertUserPlant({ user, plantType, nickname, location, waterDueOffsetDays, fertilizeDueOffsetDays }) {
  const today = new Date();

  const waterNextDue = addDays(today, waterDueOffsetDays);
  const waterLastDone = addDays(
    waterNextDue,
    -plantType.careRules.wateringFrequencyDays
  );

  const fertilizeNextDue = addDays(today, fertilizeDueOffsetDays);
  const fertilizeLastDone = addDays(
    fertilizeNextDue,
    -plantType.careRules.fertilizingFrequencyDays
  );

  let userPlant = await UserPlant.findOne({
    userId: user._id,
    nickname,
  });

  const userPlantData = {
    userId: user._id,
    plantTypeId: plantType._id,
    nickname,
    location,
    lastWatered: waterLastDone,
    lastFertilized: fertilizeLastDone,
    careSchedule: {
      watering: {
        lastDone: waterLastDone,
        nextDue: waterNextDue,
      },
      fertilizing: {
        lastDone: fertilizeLastDone,
        nextDue: fertilizeNextDue,
      },
    },
  };

  if (userPlant) {
    await UserPlant.findByIdAndUpdate(userPlant._id, userPlantData, {
      runValidators: true,
    });
    userPlant = await UserPlant.findById(userPlant._id);
    console.log(`Updated user plant: ${nickname}`);
  } else {
    userPlant = await UserPlant.create(userPlantData);
    console.log(`Created user plant: ${nickname}`);
  }

  // Rebuild tasks only for this seeded plant, not for the whole user/database.
  await CareTask.deleteMany({ userPlantId: userPlant._id });

  await CareTask.create([
    {
      userId: user._id,
      userPlantId: userPlant._id,
      taskType: "watering",
      dueDate: waterNextDue,
      status: taskStatus(waterNextDue),
    },
    {
      userId: user._id,
      userPlantId: userPlant._id,
      taskType: "fertilizing",
      dueDate: fertilizeNextDue,
      status: taskStatus(fertilizeNextDue),
    },
  ]);

  // Add/refresh a simple timeline note for seeded plants.
  await CareTimeline.deleteMany({
    userPlantId: userPlant._id,
    type: "note",
    note: "Demo plant added by safe seed script.",
  });

  await CareTimeline.create({
    userId: user._id,
    userPlantId: userPlant._id,
    type: "note",
    note: "Demo plant added by safe seed script.",
  });

  return userPlant;
}

async function seedDemoPlantsOnly() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const users = await User.find({
      email: { $in: TARGET_USER_EMAILS },
    });

    if (!users.length) {
      throw new Error(
        `No users found for emails: ${TARGET_USER_EMAILS.join(", ")}`
      );
    }

    const plantMap = await upsertPlantTypes();

    const demoPlants = [
  // Healthy: next watering is today or in the future
  {
    plantName: "Jade Plant",
    nickname: "Jade Baby",
    location: "Indoor",
    waterDueOffsetDays: 8,
    fertilizeDueOffsetDays: 25,
  },
  {
    plantName: "Rosemary",
    nickname: "Sunny Rosemary",
    location: "Outdoor",
    waterDueOffsetDays: 2,
    fertilizeDueOffsetDays: 12,
  },

  // Attention: watering overdue by 1–2 days
  {
    plantName: "Peace Lily",
    nickname: "Lily Alert",
    location: "Indoor",
    waterDueOffsetDays: -1,
    fertilizeDueOffsetDays: 18,
  },
  {
    plantName: "Rubber Plant",
    nickname: "Rubber Reminder",
    location: "Indoor",
    waterDueOffsetDays: -2,
    fertilizeDueOffsetDays: 10,
  },

  // Critical: watering overdue by more than 2 days
  {
    plantName: "Boston Fern",
    nickname: "Fern Rescue",
    location: "Indoor",
    waterDueOffsetDays: -4,
    fertilizeDueOffsetDays: -1,
  },
  {
    plantName: "Calathea",
    nickname: "Calathea Care",
    location: "Indoor",
    waterDueOffsetDays: -6,
    fertilizeDueOffsetDays: 7,
  },
];
    for (const user of users) {
      console.log(`\nAdding demo plants for user: ${user.email}`);

      for (const plant of demoPlants) {
        const plantType = plantMap[plant.plantName];

        if (!plantType) {
          console.warn(`Plant type not found: ${plant.plantName}`);
          continue;
        }

        await upsertUserPlant({
          user,
          plantType,
          nickname: plant.nickname,
          location: plant.location,
          waterDueOffsetDays: plant.waterDueOffsetDays,
          fertilizeDueOffsetDays: plant.fertilizeDueOffsetDays,
        });
      }

      // Recalculate plant count safely instead of blindly incrementing.
      const count = await UserPlant.countDocuments({ userId: user._id });

      await User.findByIdAndUpdate(user._id, {
        numberOfPlantsOwned: count,
      });

      console.log(`Updated numberOfPlantsOwned for ${user.email}: ${count}`);
    }

    console.log("\nSafe demo seeding completed successfully.");
  } catch (err) {
    console.error("Safe demo seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seedDemoPlantsOnly();
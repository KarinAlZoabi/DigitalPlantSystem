require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const userPlantRoutes = require('./routes/userPlantRoutes');
app.use('/api/userPlants', userPlantRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected ✅'))
.catch(err => console.error('MongoDB connection error ❌', err));

app.listen(5000, () => console.log('Server running on port 5000'));
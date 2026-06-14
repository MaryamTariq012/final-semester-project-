const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected Successfully! 🎉"))
  .catch((err) => console.log("DB Connection Error: ", err));

// Routes Link karein
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/doctorRoutes'));
app.use('/api', require('./routes/historyRoutes')); // ◄ Yeh nayi line add karein

// Base Route
app.get('/', (req, res) => {
  res.send("Doctor Hub Server is Running smoothly...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
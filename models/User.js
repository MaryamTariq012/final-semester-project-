const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Patient', 'Doctor', 'Assistant', 'Admin'], 
    default: 'Patient' 
  },
  // Doctor ki details
  specialization: String,
  treatmentType: { type: String, enum: ['Allopathic', 'Homeopathic', 'Herbal'] },
  fees: Number
});

module.exports = mongoose.model('User', UserSchema);
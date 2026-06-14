const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  // Kis patient ne book kiya (User table se link)
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Kis doctor ke sath book kiya (User table se link)
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Appointment ki tareekh aur time slot
  date: { type: String, required: true },       // e.g., "2026-06-15"
  timeSlot: { type: String, required: true },   // e.g., "10:00 AM - 10:30 AM"
  
  // Appointment ka status (Shuru me 'Pending Payment' hoga)
  status: { 
    type: String, 
    enum: ['Pending Payment', 'Awaiting Verification', 'Confirmed', 'Cancelled'], 
    default: 'Pending Payment' 
  },
  
  // Payment check karne ke liye features
  paymentScreenshot: { type: String, default: "" }, // Yahan image/screenshot ka path save hoga
  
  // Kis assistant ne payment verify ki (User table se link)
  paymentVerifiedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null
  }
}, { timestamps: true }); // Is se automatic create aur update ka time save ho jata hai

module.exports = mongoose.model('Appointment', AppointmentSchema);
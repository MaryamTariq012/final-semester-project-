const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// 1. GET ALL DOCTORS WITH FILTERS (Sab ke liye open hai)
// URL test karne ke liye: /api/doctors?treatmentType=Herbal ya /api/doctors?specialization=Skin
router.get('/doctors', async (req, res) => {
  try {
    const { treatmentType, specialization } = req.query;
    let query = { role: 'Doctor' };

    if (treatmentType) query.treatmentType = treatmentType;
    if (specialization) query.specialization = specialization;

    const doctors = await User.find(query).select('-password'); // Passwords hide kar diye
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 2. BOOK AN APPOINTMENT (Sirf Patient kar sakta hai)
router.post('/appointments', protect, authorizeRoles('Patient'), async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;

    const newAppointment = new Appointment({
      patientId: req.user.id, // Token se patient ki ID khud nikal aayegi
      doctorId,
      date,
      timeSlot
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked! Please upload payment screenshot. 🎉", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 3. VERIFY PAYMENT (Sirf Assistant ya Admin kar sakta hai)
router.put('/appointments/verify/:id', protect, authorizeRoles('Assistant', 'Admin'), async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Appointment not found!" });

    // Status update kar diya
    appointment.status = 'Confirmed';
    appointment.paymentVerifiedBy = req.user.id; // Kis assistant ne kiya uska id

    await appointment.save();
    res.json({ message: "Payment verified and appointment confirmed! ✅", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// 1. ADD PRESCRIPTION / HISTORY (Sirf Doctor kar sakta hai)
// POST /api/history
router.post('/history', protect, authorizeRoles('Doctor'), async (req, res) => {
  try {
    const { patientId, disease, prescription } = req.body;

    const newRecord = new MedicalHistory({
      patientId,
      doctorId: req.user.id, // Login doctor ki ID token se khud aayegi
      disease,
      prescription
    });

    await newRecord.save();
    res.status(201).json({ message: "Prescription added successfully! 📄", record: newRecord });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 2. GET MEDICAL HISTORY (Doctor aur Patient dono dekh sakte hain)
// GET /api/history/:patientId
router.get('/history/:patientId', protect, authorizeRoles('Doctor', 'Patient', 'Admin'), async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // History find karein aur doctor/patient ka naam bhi sath lekar aayein (populate)
    const history = await MedicalHistory.find({ patientId })
      .populate('patientId', 'name email')
      .populate('doctorId', 'name specialization');

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 3. SECURITY GUARD ROUTES: Agar koi chalaki se Edit ya Delete karne ki koshish kare
// Hamein rules ke mutabiq PUT aur DELETE ko block karna hai

router.put('/history/:id', protect, (req, res) => {
  return res.status(403).json({ message: "CRITICAL: Medical history and prescriptions cannot be edited!" });
});

router.delete('/history/:id', protect, (req, res) => {
  return res.status(403).json({ message: "CRITICAL: Medical history and prescriptions cannot be deleted from the system!" });
});

module.exports = router;
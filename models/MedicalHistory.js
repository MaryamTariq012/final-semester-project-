const mongoose = require('mongoose');

const MedicalHistorySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  disease: { type: String, required: true },
  prescription: { type: String, required: true }
}, { timestamps: true });

// Rule: Edit ya Delete nahi ho sakta
MedicalHistorySchema.pre('save', function(next) {
  if (!this.isNew) {
    return next(new Error('Medical history cannot be edited!'));
  }
  next();
});

module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);
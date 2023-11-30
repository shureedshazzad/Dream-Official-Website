import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  // Reference to the Doctor model
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },

  // Patient information
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },

  // Appointment details
  appointmentDate: {
    type: Date,
    required: true,
  },
  patientProblem: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
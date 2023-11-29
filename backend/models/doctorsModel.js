import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    unique:true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  specializedArea: {
    type: String,
    required: true,
  },
  availableDays: {
    type: [String], // An array of strings representing days of the week (e.g., ["Monday", "Wednesday"])
    required: true,
  },

  availableTime: {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },

}, {
  timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;

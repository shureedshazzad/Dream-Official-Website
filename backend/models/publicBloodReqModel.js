// publicBloodReqModel.js

import mongoose from 'mongoose';

const publicBloodReqSchema = new mongoose.Schema({
  name: {
    type: String,
    default : null
  },
  patientProblem: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  amountOfBlood: {
    type: Number,
    required: true,
  },
  deadlineForDonation: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    default : null
  },
},

{
  timestamps: true,
});

const PublicBloodReq = mongoose.model('PublicBloodReq', publicBloodReqSchema);

export default PublicBloodReq;

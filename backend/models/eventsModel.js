import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  // Patient information
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  availableday: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },


}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
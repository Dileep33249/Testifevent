import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Keep track of the creation and update timestamps
);

const Event = mongoose.model('Event', eventSchema);

export default Event;

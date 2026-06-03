const mongoose = require('mongoose');

const journeyEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['milestone', 'reflection', 'task', 'streak', 'card'],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model('JourneyEntry', journeyEntrySchema);


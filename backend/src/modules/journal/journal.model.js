const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    rawText: {
      type: String,
      required: true,
      trim: true,
    },
    aiVersion: {
      type: String,
      default: '',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model('Journal', journalSchema);


const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    rarity: {
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary'],
      default: 'common',
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

cardSchema.index({ userId: 1, cardNumber: 1 }, { unique: true });

module.exports = mongoose.model('Card', cardSchema);


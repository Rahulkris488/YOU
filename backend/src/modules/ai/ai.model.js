const mongoose = require('mongoose');

const aiRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: ['openai', 'claude', 'gemini'],
      default: 'openai',
    },
    task: {
      type: String,
      enum: ['roadmap', 'journal', 'card'],
      required: true,
    },
    input: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    output: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('AiRequest', aiRequestSchema);


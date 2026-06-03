const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    xp: { type: Number, default: 10 },
  },
  { _id: true },
);

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    levels: {
      type: [String],
      default: [],
    },
    tasks: {
      type: [taskSchema],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Roadmap', roadmapSchema);


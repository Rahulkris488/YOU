const Roadmap = require('./roadmap.model');

async function createRoadmap(userId, payload) {
  return Roadmap.create({
    userId,
    levels: payload.levels,
    tasks: payload.tasks,
  });
}

async function listRoadmaps(userId) {
  return Roadmap.find({ userId }).sort({ createdAt: -1 });
}

module.exports = {
  createRoadmap,
  listRoadmaps,
};


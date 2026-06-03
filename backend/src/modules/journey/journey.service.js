const JourneyEntry = require('./journey.model');

async function createEntry(userId, payload) {
  return JourneyEntry.create({
    userId,
    ...payload,
  });
}

async function listEntries(userId) {
  return JourneyEntry.find({ userId }).sort({ createdAt: -1 });
}

module.exports = {
  createEntry,
  listEntries,
};


const Journal = require('./journal.model');

async function createJournal(userId, payload) {
  return Journal.create({
    userId,
    rawText: payload.rawText,
    aiVersion: payload.aiVersion,
  });
}

async function listJournals(userId) {
  return Journal.find({ userId }).sort({ createdAt: -1 });
}

module.exports = {
  createJournal,
  listJournals,
};


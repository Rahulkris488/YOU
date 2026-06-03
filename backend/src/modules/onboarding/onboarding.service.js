const Identity = require('./onboarding.model');

async function upsertIdentity(userId, payload) {
  return Identity.findOneAndUpdate({ userId }, payload, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

async function getIdentity(userId) {
  return Identity.findOne({ userId });
}

module.exports = {
  upsertIdentity,
  getIdentity,
};


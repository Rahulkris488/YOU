const Card = require('./cards.model');

async function createCard(userId, payload) {
  return Card.create({
    userId,
    ...payload,
  });
}

async function listCards(userId) {
  return Card.find({ userId }).sort({ cardNumber: 1 });
}

module.exports = {
  createCard,
  listCards,
};


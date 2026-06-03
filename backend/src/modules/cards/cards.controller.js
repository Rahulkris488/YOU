const asyncHandler = require('../../utils/asyncHandler');
const cardsService = require('./cards.service');

const createCard = asyncHandler(async (req, res) => {
  const card = await cardsService.createCard(req.user.id, req.validated.body);
  res.status(201).json({ data: card });
});

const listCards = asyncHandler(async (req, res) => {
  const cards = await cardsService.listCards(req.user.id);
  res.json({ data: cards });
});

module.exports = {
  createCard,
  listCards,
};


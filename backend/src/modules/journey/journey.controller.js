const asyncHandler = require('../../utils/asyncHandler');
const journeyService = require('./journey.service');

const createEntry = asyncHandler(async (req, res) => {
  const entry = await journeyService.createEntry(req.user.id, req.validated.body);
  res.status(201).json({ data: entry });
});

const listEntries = asyncHandler(async (req, res) => {
  const entries = await journeyService.listEntries(req.user.id);
  res.json({ data: entries });
});

module.exports = {
  createEntry,
  listEntries,
};


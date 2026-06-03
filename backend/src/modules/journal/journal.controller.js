const asyncHandler = require('../../utils/asyncHandler');
const journalService = require('./journal.service');

const createJournal = asyncHandler(async (req, res) => {
  const journal = await journalService.createJournal(req.user.id, req.validated.body);
  res.status(201).json({ data: journal });
});

const listJournals = asyncHandler(async (req, res) => {
  const journals = await journalService.listJournals(req.user.id);
  res.json({ data: journals });
});

module.exports = {
  createJournal,
  listJournals,
};


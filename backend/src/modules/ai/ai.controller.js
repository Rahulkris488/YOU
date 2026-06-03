const asyncHandler = require('../../utils/asyncHandler');
const aiService = require('./ai.service');

const generate = asyncHandler(async (req, res) => {
  const result = await aiService.generate(req.user.id, req.validated.body);
  res.json({ data: result });
});

module.exports = {
  generate,
};


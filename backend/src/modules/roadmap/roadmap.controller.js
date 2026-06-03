const asyncHandler = require('../../utils/asyncHandler');
const roadmapService = require('./roadmap.service');

const createRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.createRoadmap(req.user.id, req.validated.body);
  res.status(201).json({ data: roadmap });
});

const listRoadmaps = asyncHandler(async (req, res) => {
  const roadmaps = await roadmapService.listRoadmaps(req.user.id);
  res.json({ data: roadmaps });
});

module.exports = {
  createRoadmap,
  listRoadmaps,
};


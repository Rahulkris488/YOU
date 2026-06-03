function buildRoadmapPrompt(input) {
  return [
    'Create a practical YOUmap for the user.',
    `Becoming: ${input.becoming || 'Not provided'}`,
    `Goal: ${input.goal || 'Not provided'}`,
    `Driver: ${input.driver || 'Not provided'}`,
    'Return levels, tasks, and progression milestones.',
  ].join('\n');
}

module.exports = buildRoadmapPrompt;


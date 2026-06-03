const { z } = require('zod');

const createJourneyEntrySchema = z.object({
  body: z.object({
    type: z.enum(['milestone', 'reflection', 'task', 'streak', 'card']),
    title: z.string().min(1),
    description: z.string().default(''),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  createJourneyEntrySchema,
};


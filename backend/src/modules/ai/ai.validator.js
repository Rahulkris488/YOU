const { z } = require('zod');

const generateSchema = z.object({
  body: z.object({
    provider: z.enum(['openai', 'claude', 'gemini']).default('openai'),
    task: z.enum(['roadmap', 'journal', 'card']),
    input: z.record(z.unknown()).default({}),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  generateSchema,
};


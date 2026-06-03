const { z } = require('zod');

const createJournalSchema = z.object({
  body: z.object({
    rawText: z.string().min(1),
    aiVersion: z.string().default(''),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  createJournalSchema,
};


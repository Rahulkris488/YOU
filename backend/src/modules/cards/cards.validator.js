const { z } = require('zod');

const createCardSchema = z.object({
  body: z.object({
    cardNumber: z.number().int().positive(),
    rarity: z.enum(['common', 'rare', 'epic', 'legendary']).default('common'),
    level: z.number().int().positive().default(1),
    avatar: z.string().default(''),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  createCardSchema,
};


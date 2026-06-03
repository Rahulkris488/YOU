const { z } = require('zod');

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    avatar: z.string().url().or(z.literal('')).optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  updateProfileSchema,
};


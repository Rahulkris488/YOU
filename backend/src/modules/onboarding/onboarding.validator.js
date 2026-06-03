const { z } = require('zod');

const saveIdentitySchema = z.object({
  body: z.object({
    becoming: z.string().min(2),
    goal: z.string().min(2),
    driver: z.string().min(2),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  saveIdentitySchema,
};


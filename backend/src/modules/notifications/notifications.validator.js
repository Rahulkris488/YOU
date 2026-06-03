const { z } = require('zod');

const createNotificationSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    body: z.string().default(''),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  createNotificationSchema,
};


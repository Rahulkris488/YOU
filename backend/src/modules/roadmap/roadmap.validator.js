const { z } = require('zod');

const createRoadmapSchema = z.object({
  body: z.object({
    levels: z.array(z.string().min(1)).default([]),
    tasks: z
      .array(
        z.object({
          title: z.string().min(1),
          completed: z.boolean().optional(),
          xp: z.number().int().positive().optional(),
        }),
      )
      .default([]),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  createRoadmapSchema,
};


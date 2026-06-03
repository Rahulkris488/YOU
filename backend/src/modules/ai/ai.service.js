const AiRequest = require('./ai.model');
const buildRoadmapPrompt = require('./prompts/roadmap.prompt');
const buildJournalPrompt = require('./prompts/journal.prompt');
const buildCardPrompt = require('./prompts/card.prompt');
const openai = require('./providers/openai');
const claude = require('./providers/claude');
const gemini = require('./providers/gemini');

const promptBuilders = {
  roadmap: buildRoadmapPrompt,
  journal: buildJournalPrompt,
  card: buildCardPrompt,
};

const providers = {
  openai,
  claude,
  gemini,
};

async function generate(userId, payload) {
  const prompt = promptBuilders[payload.task](payload.input);
  const output = await providers[payload.provider].generate(prompt);

  const aiRequest = await AiRequest.create({
    userId,
    provider: payload.provider,
    task: payload.task,
    input: payload.input,
    output,
  });

  return {
    prompt,
    output,
    requestId: aiRequest.id,
  };
}

module.exports = {
  generate,
};


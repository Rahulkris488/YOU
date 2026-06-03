const env = require('../../../config/env');

async function generate(prompt) {
  if (!env.geminiApiKey) {
    return {
      provider: 'gemini',
      mocked: true,
      text: `Gemini placeholder response for prompt: ${prompt}`,
    };
  }

  throw new Error('Gemini provider is not implemented yet');
}

module.exports = {
  generate,
};


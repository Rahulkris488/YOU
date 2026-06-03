const env = require('../../../config/env');

async function generate(prompt) {
  if (!env.openaiApiKey) {
    return {
      provider: 'openai',
      mocked: true,
      text: `OpenAI placeholder response for prompt: ${prompt}`,
    };
  }

  throw new Error('OpenAI provider is not implemented yet');
}

module.exports = {
  generate,
};


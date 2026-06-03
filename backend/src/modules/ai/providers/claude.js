const env = require('../../../config/env');

async function generate(prompt) {
  if (!env.claudeApiKey) {
    return {
      provider: 'claude',
      mocked: true,
      text: `Claude placeholder response for prompt: ${prompt}`,
    };
  }

  throw new Error('Claude provider is not implemented yet');
}

module.exports = {
  generate,
};


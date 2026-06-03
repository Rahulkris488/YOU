function buildCardPrompt(input) {
  return [
    'Design a YOU card based on the user identity and current level.',
    `Identity: ${input.identity || 'Not provided'}`,
    `Level: ${input.level || 1}`,
    'Return card name, rarity, visual direction, and power statement.',
  ].join('\n');
}

module.exports = buildCardPrompt;


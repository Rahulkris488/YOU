function buildJournalPrompt(input) {
  return [
    'Analyze this journal entry with a warm, direct coaching style.',
    `Entry: ${input.rawText || ''}`,
    'Return insight, emotional pattern, next action, and a short affirmation.',
  ].join('\n');
}

module.exports = buildJournalPrompt;


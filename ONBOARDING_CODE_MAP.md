# Onboarding Animation Map

This file focuses only on the onboarding animation surface in the mobile app.

## Files To Focus On

- [mobile/src/app/onboarding/index.tsx](mobile/src/app/onboarding/index.tsx)
  - Main animation controller for the onboarding flow.
  - Handles the fade and slide transition when the question changes.
  - Switches between the question, analysis, and reveal phases.

- [mobile/src/components/onboarding/QuestionCard.tsx](mobile/src/components/onboarding/QuestionCard.tsx)
  - Renders the current question card.
  - This is the visual container that the flow animates between questions.

- [mobile/src/components/onboarding/AnswerOption.tsx](mobile/src/components/onboarding/AnswerOption.tsx)
  - Adds the press-scale animation for each answer choice.
  - Controls the selected state styling.

- [mobile/src/components/onboarding/ProgressBar.tsx](mobile/src/components/onboarding/ProgressBar.tsx)
  - Animates the progress fill as the user moves through the questions.
  - Shows the current position in the flow.

- [mobile/src/components/onboarding/AnalysisScreen.tsx](mobile/src/components/onboarding/AnalysisScreen.tsx)
  - Plays the timed loading/analysis animation after the last question.
  - Fades and scales in, then auto-advances after the delay.

- [mobile/src/components/onboarding/DriverReveal.tsx](mobile/src/components/onboarding/DriverReveal.tsx)
  - Animates the final driver reveal screen.
  - Fades and scales the result card into view.

## What Each One Does

- [mobile/src/app/onboarding/index.tsx](mobile/src/app/onboarding/index.tsx) is the orchestration layer. It owns the current phase and applies the screen transition animation when the question index changes.
- [mobile/src/components/onboarding/QuestionCard.tsx](mobile/src/components/onboarding/QuestionCard.tsx) is the content wrapper for the animated question block.
- [mobile/src/components/onboarding/AnswerOption.tsx](mobile/src/components/onboarding/AnswerOption.tsx) is responsible for the tap feedback animation on each answer.
- [mobile/src/components/onboarding/ProgressBar.tsx](mobile/src/components/onboarding/ProgressBar.tsx) animates the visual progress indicator.
- [mobile/src/components/onboarding/AnalysisScreen.tsx](mobile/src/components/onboarding/AnalysisScreen.tsx) is the timed transition between answering and reveal.
- [mobile/src/components/onboarding/DriverReveal.tsx](mobile/src/components/onboarding/DriverReveal.tsx) is the final reveal animation before entering the app.
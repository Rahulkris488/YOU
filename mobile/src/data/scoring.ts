import { driverList } from '@/data/drivers';
import { onboardingQuestions } from '@/data/questions';
import type { AttributeKey, Attributes, DriverResult, OnboardingAnswers } from '@/types/onboarding';
import { getAttributeDistance } from '@/utils/driverDistance';

const attributeKeys: AttributeKey[] = ['ambition', 'ego', 'connection', 'healing', 'chaos', 'logic'];

export function createEmptyAttributes(): Attributes {
  return attributeKeys.reduce(
    (attributes, key) => {
      attributes[key] = 0;
      return attributes;
    },
    {} as Attributes,
  );
}

export function buildAttributesFromAnswers(answers: OnboardingAnswers): Attributes {
  const attributes = createEmptyAttributes();

  onboardingQuestions.forEach(question => {
    const answer = answers[question.id];
    const option = question.options.find(item => item.answer === answer);

    if (!option) {
      return;
    }

    Object.entries(option.attributes).forEach(([key, value]) => {
      attributes[key as AttributeKey] += value ?? 0;
    });
  });

  return attributes;
}

export function getDriverResult(answers: OnboardingAnswers): DriverResult {
  const attributes = buildAttributesFromAnswers(answers);
  const ranked = driverList
    .map(driver => ({
      driver,
      distance: getAttributeDistance(attributes, driver.attributes),
    }))
    .sort((left, right) => left.distance - right.distance);

  return {
    driver: ranked[0].driver,
    distance: ranked[0].distance,
    attributes,
  };
}

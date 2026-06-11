import type { Attributes } from '@/types/onboarding';

export function getAttributeDistance(left: Attributes, right: Attributes): number {
  const squaredDistance = Object.keys(left).reduce((total, key) => {
    const attributeKey = key as keyof Attributes;
    const delta = left[attributeKey] - right[attributeKey];
    return total + delta * delta;
  }, 0);

  return Math.sqrt(squaredDistance);
}

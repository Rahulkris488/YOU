import * as FileSystem from 'expo-file-system';

import type { DriverId, OnboardingAnswers, PersistedOnboardingState } from '@/types/onboarding';

const onboardingStatePath = `${FileSystem.documentDirectory ?? ''}you-onboarding-state.json`;

export async function loadOnboardingState(): Promise<PersistedOnboardingState | null> {
  if (!FileSystem.documentDirectory) {
    return null;
  }

  try {
    const info = await FileSystem.getInfoAsync(onboardingStatePath);

    if (!info.exists) {
      return null;
    }

    const rawState = await FileSystem.readAsStringAsync(onboardingStatePath);
    return JSON.parse(rawState) as PersistedOnboardingState;
  } catch {
    return null;
  }
}

export async function saveOnboardingState(
  answers: OnboardingAnswers,
  completedDriverId?: DriverId,
): Promise<void> {
  if (!FileSystem.documentDirectory) {
    return;
  }

  const state: PersistedOnboardingState = {
    answers,
    completedDriverId,
    updatedAt: new Date().toISOString(),
  };

  await FileSystem.writeAsStringAsync(onboardingStatePath, JSON.stringify(state));
}

export async function clearOnboardingState(): Promise<void> {
  if (!FileSystem.documentDirectory) {
    return;
  }

  const info = await FileSystem.getInfoAsync(onboardingStatePath);

  if (info.exists) {
    await FileSystem.deleteAsync(onboardingStatePath, { idempotent: true });
  }
}

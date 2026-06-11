import * as FileSystem from 'expo-file-system';

import type { User } from '@/types/user';

type PersistedSession = {
  token: string;
  user: User;
};

const sessionPath = `${FileSystem.documentDirectory ?? ''}you-session.json`;

export async function loadSession(): Promise<PersistedSession | null> {
  if (!FileSystem.documentDirectory) {
    return null;
  }

  try {
    const info = await FileSystem.getInfoAsync(sessionPath);

    if (!info.exists) {
      return null;
    }

    const rawSession = await FileSystem.readAsStringAsync(sessionPath);
    return JSON.parse(rawSession) as PersistedSession;
  } catch {
    return null;
  }
}

export async function saveSession(token: string, user: User): Promise<void> {
  if (!FileSystem.documentDirectory) {
    return;
  }

  await FileSystem.writeAsStringAsync(sessionPath, JSON.stringify({ token, user }));
}

export async function clearSessionStorage(): Promise<void> {
  if (!FileSystem.documentDirectory) {
    return;
  }

  const info = await FileSystem.getInfoAsync(sessionPath);

  if (info.exists) {
    await FileSystem.deleteAsync(sessionPath, { idempotent: true });
  }
}

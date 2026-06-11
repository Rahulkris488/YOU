import { API_BASE_URL } from '@/constants/env';

const API_V1_BASE_URL = `${API_BASE_URL}/api/v1`;

type RequestOptions = RequestInit & {
  token?: string;
};

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_V1_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'API request failed');
  }

  return payload;
}

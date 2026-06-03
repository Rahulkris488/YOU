const API_BASE_URL = 'http://localhost:5000/api/v1';

type RequestOptions = RequestInit & {
  token?: string;
};

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'API request failed');
  }

  return payload;
}


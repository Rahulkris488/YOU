import axios from 'axios';

import { API_BASE_URL } from '@/constants/env';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 15000,
});

export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}


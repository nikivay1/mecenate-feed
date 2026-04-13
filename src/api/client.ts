import type { ErrorResponse } from '../types/feed';

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const userToken = process.env.EXPO_PUBLIC_USER_TOKEN;

  if (!apiUrl) {
    throw new Error('EXPO_PUBLIC_API_URL is not set');
  }

  if (!userToken) {
    throw new Error('EXPO_PUBLIC_USER_TOKEN is not set');
  }

  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = 'Не удалось загрузить публикации';

    try {
      const errorData = (await response.json()) as ErrorResponse;
      if (errorData?.error?.message) {
        message = errorData.error.message;
      }
    } catch {
      
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}
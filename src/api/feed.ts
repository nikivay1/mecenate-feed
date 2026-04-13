import { apiFetch } from './client';
import type { PostsResponse } from '../types/feed';

type GetPostsParams = {
  cursor?: string | null;
  limit?: number;
  simulateError?: boolean;
};

export async function getPosts({
  cursor = null,
  limit = 10,
  simulateError = false,
}: GetPostsParams = {}): Promise<PostsResponse> {
  const query = [
    `limit=${limit}`,
    cursor ? `cursor=${encodeURIComponent(cursor)}` : null,
    simulateError ? 'simulate_error=true' : null,
  ]
    .filter(Boolean)
    .join('&');

  return apiFetch<PostsResponse>(`/posts?${query}`);
}
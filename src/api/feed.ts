import { apiFetch } from './client';
import type { PostsResponse } from '../types/feed';

type GetPostsParams = {
  cursor?: string | null;
  limit?: number;
  tier?: 'free' | 'paid';
  simulateError?: boolean;
};

export async function getPosts({
  cursor = null,
  limit = 10,
  tier,
  simulateError = false,
}: GetPostsParams = {}): Promise<PostsResponse> {
  const params = new URLSearchParams();

  params.append('limit', String(limit));

  if (cursor) {
    params.append('cursor', cursor);
  }

  if (tier) {
    params.append('tier', tier);
  }

  if (simulateError) {
    params.append('simulate_error', 'true');
  }

  return apiFetch<PostsResponse>(`/posts?${params.toString()}`);
}
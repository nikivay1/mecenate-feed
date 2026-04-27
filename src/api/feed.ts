import { apiFetch } from './client';
import type {
  CommentsResponse,
  CommentCreatedResponse,
  LikePostResponse,
  PostDetailResponse,
  PostsResponse,
} from '../types/feed';

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

export async function getPostById(postId: string): Promise<PostDetailResponse> {
  return apiFetch<PostDetailResponse>(`/posts/${postId}`);
}

type GetCommentsParams = {
  postId: string;
  cursor?: string | null;
  limit?: number;
};

export async function getPostComments({
  postId,
  cursor = null,
  limit = 20,
}: GetCommentsParams): Promise<CommentsResponse> {
  const params = new URLSearchParams();

  params.append('limit', String(limit));

  if (cursor) {
    params.append('cursor', cursor);
  }

  return apiFetch<CommentsResponse>(
    `/posts/${postId}/comments?${params.toString()}`
  );
}

export async function togglePostLike(postId: string): Promise<LikePostResponse> {
  return apiFetch<LikePostResponse>(`/posts/${postId}/like`, {
    method: 'POST',
  });
}

type CreatePostCommentParams = {
  postId: string;
  text: string;
};

export async function createPostComment({
  postId,
  text,
}: CreatePostCommentParams): Promise<CommentCreatedResponse> {
  return apiFetch<CommentCreatedResponse>(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      text,
    }),
  });
}
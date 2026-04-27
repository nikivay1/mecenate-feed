import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { togglePostLike } from '../api/feed';
import type { Post, PostDetailResponse, PostsResponse } from '../types/feed';

type FeedSnapshot = [
  queryKey: readonly unknown[],
  data: InfiniteData<PostsResponse> | undefined,
];

const updatePost = (
  post: Post,
  likeState: Pick<Post, 'isLiked' | 'likesCount'>
): Post => ({
  ...post,
  isLiked: likeState.isLiked,
  likesCount: likeState.likesCount,
});

const updateFeedPost = (
  data: InfiniteData<PostsResponse> | undefined,
  postId: string,
  likeState: Pick<Post, 'isLiked' | 'likesCount'>
): InfiniteData<PostsResponse> | undefined => {
  if (!data) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      data: {
        ...page.data,
        posts: page.data.posts.map((post) =>
          post.id === postId ? updatePost(post, likeState) : post
        ),
      },
    })),
  };
};

const updatePostDetail = (
  data: PostDetailResponse | undefined,
  postId: string,
  likeState: Pick<Post, 'isLiked' | 'likesCount'>
): PostDetailResponse | undefined => {
  if (!data || data.data.post.id !== postId) {
    return data;
  }

  return {
    ...data,
    data: {
      ...data.data,
      post: updatePost(data.data.post, likeState),
    },
  };
};

export const useTogglePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Post) => togglePostLike(post.id),
    onMutate: async (post) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['feed'] }),
        queryClient.cancelQueries({ queryKey: ['post', post.id] }),
      ]);

      const feedSnapshots = queryClient.getQueriesData<
        InfiniteData<PostsResponse>
      >({ queryKey: ['feed'] }) as FeedSnapshot[];
      const postSnapshot = queryClient.getQueryData<PostDetailResponse>([
        'post',
        post.id,
      ]);
      const optimisticState = {
        isLiked: !post.isLiked,
        likesCount: post.likesCount + (post.isLiked ? -1 : 1),
      };

      queryClient.setQueriesData<InfiniteData<PostsResponse>>(
        { queryKey: ['feed'] },
        (data) => updateFeedPost(data, post.id, optimisticState)
      );
      queryClient.setQueryData<PostDetailResponse>(['post', post.id], (data) =>
        updatePostDetail(data, post.id, optimisticState)
      );

      return { feedSnapshots, postSnapshot };
    },
    onError: (_error, post, context) => {
      context?.feedSnapshots.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      queryClient.setQueryData(['post', post.id], context?.postSnapshot);
    },
    onSuccess: (response, post) => {
      const serverState = response.data;

      queryClient.setQueriesData<InfiniteData<PostsResponse>>(
        { queryKey: ['feed'] },
        (data) => updateFeedPost(data, post.id, serverState)
      );
      queryClient.setQueryData<PostDetailResponse>(['post', post.id], (data) =>
        updatePostDetail(data, post.id, serverState)
      );
    },
  });
};

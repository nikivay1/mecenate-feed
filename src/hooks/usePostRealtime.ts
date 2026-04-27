import { useEffect } from 'react';
import {
  InfiniteData,
  useQueryClient,
} from '@tanstack/react-query';

import { getWsUrl } from '../api/ws';
import type {
  CommentsResponse,
  PostDetailResponse,
  PostsResponse,
  RealtimeEvent,
} from '../types/feed';

type UsePostRealtimeParams = {
  postId: string;
  enabled?: boolean;
};

export function usePostRealtime({
  postId,
  enabled = true,
}: UsePostRealtimeParams) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectAttempt = 0;
    let isUnmounted = false;

    const updatePostLikes = (likesCount: number) => {
      queryClient.setQueryData<PostDetailResponse>(
        ['post', postId],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            data: {
              ...oldData.data,
              post: {
                ...oldData.data.post,
                likesCount,
              },
            },
          };
        }
      );

      queryClient.setQueriesData<InfiniteData<PostsResponse>>(
        { queryKey: ['feed'] },
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                posts: page.data.posts.map((post) =>
                  post.id === postId
                    ? {
                        ...post,
                        likesCount,
                      }
                    : post
                ),
              },
            })),
          };
        }
      );
    };

    const addRealtimeComment = (
      event: Extract<RealtimeEvent, { type: 'comment_added' }>
    ) => {
      let wasAdded = false;

      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        ['post-comments', postId],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          const alreadyExists = oldData.pages.some((page) =>
            page.data.comments.some(
              (comment) => comment.id === event.comment.id
            )
          );

          if (alreadyExists) {
            return oldData;
          }

          wasAdded = true;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              if (index !== 0) {
                return page;
              }

              return {
                ...page,
                data: {
                  ...page.data,
                  comments: [event.comment, ...page.data.comments],
                },
              };
            }),
          };
        }
      );

      if (!wasAdded) {
        return;
      }

      queryClient.setQueryData<PostDetailResponse>(
        ['post', postId],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            data: {
              ...oldData.data,
              post: {
                ...oldData.data.post,
                commentsCount: oldData.data.post.commentsCount + 1,
              },
            },
          };
        }
      );

      queryClient.setQueriesData<InfiniteData<PostsResponse>>(
        { queryKey: ['feed'] },
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                posts: page.data.posts.map((post) =>
                  post.id === postId
                    ? {
                        ...post,
                        commentsCount: post.commentsCount + 1,
                      }
                    : post
                ),
              },
            })),
          };
        }
      );
    };

    const handleMessage = (message: MessageEvent) => {
      try {
        const event = JSON.parse(message.data) as RealtimeEvent;

        if (event.type === 'ping') {
          return;
        }

        if (event.postId !== postId) {
          return;
        }

        if (event.type === 'like_updated') {
          updatePostLikes(event.likesCount);
          return;
        }

        if (event.type === 'comment_added') {
          addRealtimeComment(event);
        }
      } catch {
        // Ignore invalid WS messages
      }
    };

    const connect = () => {
      socket = new WebSocket(getWsUrl());

      socket.onopen = () => {
        reconnectAttempt = 0;
      };

      socket.onmessage = handleMessage;

      socket.onerror = () => {
        socket?.close();
      };

      socket.onclose = () => {
        if (isUnmounted) {
          return;
        }

        const delay = Math.min(1000 * 2 ** reconnectAttempt, 10_000);
        reconnectAttempt += 1;

        reconnectTimer = setTimeout(() => {
          connect();
        }, delay);
      };
    };

    connect();

    return () => {
      isUnmounted = true;

      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }

      socket?.close();
    };
  }, [enabled, postId, queryClient]);
}
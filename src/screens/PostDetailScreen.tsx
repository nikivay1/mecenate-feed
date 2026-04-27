import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PostCard } from '../components/PostCard';
import { CommentsSectionHeader } from '../components/CommentsSectionHeader';
import { CommentItem } from '../components/CommentItem';
import { ErrorState } from '../components/ErrorState';
import { CommentComposer } from '../components/CommentComposer';

import { usePostRealtime } from '../hooks/usePostRealtime';
import { useTogglePostLike } from '../hooks/useTogglePostLike';

import {
  createPostComment,
  getPostById,
  getPostComments,
} from '../api/feed';

import type { RootStackParamList } from '../navigation/types';

import type {
  Comment,
  CommentsResponse,
  PostDetailResponse,
  PostsResponse,
} from '../types/feed';

import { colors } from '../tokens/colors';
import { fontSizes } from '../tokens/fontSizes';
import { spacing } from '../tokens/spacing';

type PostDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PostDetail'
>;

export const PostDetailScreen = ({
  route,
  navigation,
}: PostDetailScreenProps) => {
  const { postId } = route.params;
  const toggleLikeMutation = useTogglePostLike();
  const queryClient = useQueryClient();

  const {
    data: postData,
    isPending: isPostPending,
    isError: isPostError,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  });

  usePostRealtime({
    postId,
    enabled: Boolean(postData?.data.post),
  });

  const {
    data: commentsData,
    isPending: isCommentsPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['post-comments', postId],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      getPostComments({
        postId,
        cursor: pageParam,
        limit: 20,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor : undefined,
    enabled: Boolean(postData?.data.post),
  });

  const createCommentMutation = useMutation({
    mutationFn: createPostComment,
    onSuccess: (response) => {
      const newComment = response.data.comment;

      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        ['post-comments', postId],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          const alreadyExists = oldData.pages.some((page) =>
            page.data.comments.some((comment) => comment.id === newComment.id)
          );

          if (alreadyExists) {
            return oldData;
          }

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
                  comments: [newComment, ...page.data.comments],
                },
              };
            }),
          };
        }
      );

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
    },
  });

  const post = postData?.data.post;
  const comments =
    commentsData?.pages.flatMap((page) => page.data.comments) ?? [];

  const handleLoadMoreComments = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  };

  const handleSubmitComment = (text: string) => {
    createCommentMutation.mutate({
      postId,
      text,
    });
  };

  const renderComment = ({ item, index }: { item: Comment; index: number }) => {
    const mockLikes = [2, 3, 2, 2];
    const mockLiked = [false, true, false, false];

    return (
      <CommentItem
        comment={item}
        likesCount={mockLikes[index % mockLikes.length] ?? 0}
        isLiked={mockLiked[index % mockLiked.length] ?? false}
      />
    );
  };

  if (isPostPending) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" translucent />
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (isPostError || !post) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" translucent />
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
          <ErrorState onRetry={() => refetchPost()} />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
            ListHeaderComponent={
              <>
                <PostCard
                  authorName={post.author.displayName}
                  authorAvatar={post.author.avatarUrl}
                  imageUrl={post.coverUrl}
                  title={post.title}
                  previewText={post.body || post.preview}
                  likesCount={post.likesCount}
                  commentsCount={post.commentsCount}
                  isLiked={post.isLiked}
                  isLikeLoading={
                    toggleLikeMutation.isPending &&
                    toggleLikeMutation.variables?.id === post.id
                  }
                  onLikePress={() => toggleLikeMutation.mutate(post)}
                />

                <CommentsSectionHeader commentsCount={post.commentsCount} />
              </>
            }
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMoreComments}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isCommentsPending || isFetchingNextPage ? (
                <View style={styles.footerLoader}>
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />
          <CommentComposer
            loading={createCommentMutation.isPending}
            onSubmit={handleSubmitComment}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
    backgroundColor: colors.surface,
  },
  backButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  backText: {
    fontSize: fontSizes.lg,
    color: colors.primary,
    fontWeight: '600',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLoader: {
    paddingVertical: spacing.lg,
  },
});

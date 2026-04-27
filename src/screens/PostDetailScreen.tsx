import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PostCard } from '../components/PostCard';
import { CommentsSectionHeader } from '../components/CommentsSectionHeader';

import { getPostById, getPostComments } from '../api/feed';
import { CommentItem } from '../components/CommentItem';
import { ErrorState } from '../components/ErrorState';
import type { RootStackParamList } from '../navigation/types';
import type { Comment } from '../types/feed';
import { colors } from '../tokens/colors';
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

  const {
    data: postData,
    isPending: isPostPending,
    isError: isPostError,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
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

  const post = postData?.data.post;
  const comments =
    commentsData?.pages.flatMap((page) => page.data.comments) ?? [];

  const handleLoadMoreComments = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  };

  const renderComment = ({ item }: { item: Comment }) => {
    return <CommentItem comment={item} />;
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
      <StatusBar style="dark" translucent />

      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
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
    fontSize: 16,
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
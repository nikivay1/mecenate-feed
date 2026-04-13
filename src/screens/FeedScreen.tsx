import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '../api/feed';
import { ErrorState } from '../components/ErrorState';
import { PaidPostCard } from '../components/PaidPostCard';
import { PostCard } from '../components/PostCard';
import type { Post } from '../types/feed';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

export const FeedScreen = () => {
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      getPosts({
        cursor: pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor : null,
  });

  const posts = data?.pages.flatMap((page) => page.data.posts) ?? [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: Post }) => {
    if (item.tier === 'paid') {
      return (
        <PaidPostCard
          authorName={item.author.displayName}
          authorAvatar={item.author.avatarUrl}
          imageUrl={item.coverUrl}
        />
      );
    }

    return (
      <PostCard
        authorName={item.author.displayName}
        authorAvatar={item.author.avatarUrl}
        imageUrl={item.coverUrl}
        title={item.title}
        previewText={item.preview}
        likesCount={item.likesCount}
        isLiked={item.isLiked}
        commentsCount={item.commentsCount}
      />
    );
  };

  if (isError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState onRetry={() => refetch()} />
      </SafeAreaView>
    );
  }

  if (isPending) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: spacing.md,
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
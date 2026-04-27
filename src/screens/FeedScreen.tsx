import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

import { getPosts } from '../api/feed';
import { ErrorState } from '../components/ErrorState';
import {
  FeedFilterTabs,
  type FeedFilter,
} from '../components/FeedFilterTabs';
import { useTogglePostLike } from '../hooks/useTogglePostLike';
import { PaidPostCard } from '../components/PaidPostCard';
import { PostCard } from '../components/PostCard';
import type { Post } from '../types/feed';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

export const FeedScreen = () => {
  const [activeFilter, setActiveFilter] = React.useState<FeedFilter>('all');
  const toggleLikeMutation = useTogglePostLike();

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
    queryKey: ['feed', activeFilter],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      getPosts({
        cursor: pageParam,
        limit: 10,
        tier: activeFilter === 'all' ? undefined : activeFilter,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor : null,
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const posts = data?.pages.flatMap((page) => page.data.posts) ?? [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: Post }) => {
    const handlePress = () => {
      navigation.navigate('PostDetail', {
        postId: item.id,
      });
    };

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
      <Pressable onPress={handlePress}>
        <PostCard
          authorName={item.author.displayName}
          authorAvatar={item.author.avatarUrl}
          imageUrl={item.coverUrl}
          title={item.title}
          previewText={item.preview}
          likesCount={item.likesCount}
          commentsCount={item.commentsCount}
          isLiked={item.isLiked}
          isLikeLoading={
            toggleLikeMutation.isPending &&
            toggleLikeMutation.variables?.id === item.id
          }
          onLikePress={() => toggleLikeMutation.mutate(item)}
        />
      </Pressable>
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
      <FeedFilterTabs
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />
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
    paddingBottom: spacing.md,
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

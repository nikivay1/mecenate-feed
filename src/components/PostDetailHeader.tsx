import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AuthorRow } from './AuthorRow';
import { MetricButton } from './MetricButton';
import type { Post } from '../types/feed';
import { colors } from '../tokens/colors';
import { fontSizes } from '../tokens/fontSizes';
import { spacing } from '../tokens/spacing';

type PostDetailHeaderProps = {
  post: Post;
  commentsCount: number;
};

export const PostDetailHeader = ({
  post,
  commentsCount,
}: PostDetailHeaderProps) => {
  return (
    <View style={styles.container}>
      <AuthorRow
        name={post.author.displayName}
        avatarUrl={post.author.avatarUrl}
      />

      <Image
        source={{ uri: post.coverUrl }}
        style={styles.cover}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>

        <Text style={styles.body}>{post.body || post.preview}</Text>

        <View style={styles.metrics}>
          <MetricButton
            kind="like"
            count={post.likesCount}
            active={post.isLiked}
          />
          <MetricButton kind="comment" count={post.commentsCount} />
        </View>

        <View style={styles.commentsHeader}>
          <Text style={styles.commentsTitle}>
            {commentsCount} комментария
          </Text>

          <Text style={styles.sortText}>Сначала новые</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  cover: {
    width: '100%',
    aspectRatio: 0.86,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.display,
    lineHeight: 31,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: fontSizes.titleLg,
    lineHeight: 29,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentsTitle: {
    fontSize: fontSizes.title,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  sortText: {
    fontSize: fontSizes.title,
    lineHeight: 24,
    color: colors.primary,
  },
});

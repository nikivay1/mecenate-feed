import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthorRow } from './AuthorRow';
import { MetricButton } from './MetricButton';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

type PostCardProps = {
  authorName: string;
  authorAvatar: string;
  imageUrl: string;
  title?: string;
  previewText?: string;
  likesCount?: number;
  commentsCount?: number;
  isPreviewCollapsed?: boolean;
};

export const PostCard = ({
  authorName,
  authorAvatar,
  imageUrl,
  title,
  previewText,
  likesCount,
  commentsCount,
  isPreviewCollapsed = false,
}: PostCardProps) => {
  return (
    <View style={styles.wrapper}>
      <AuthorRow name={authorName} avatarUrl={authorAvatar} />

      <Image source={{ uri: imageUrl }} style={styles.cover} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.preview} numberOfLines={isPreviewCollapsed ? 2 : 3}>
          {previewText}
        </Text>

        <View style={styles.metrics}>
          <MetricButton icon="♡" count={likesCount!} />
          <MetricButton icon="💬" count={commentsCount!} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  cover: {
    width: '100%',
    aspectRatio: 1.55,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  preview: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
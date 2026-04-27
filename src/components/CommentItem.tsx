import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import LikeIcon from '../assets/icons/mecenatka_solid.svg';
import type { Comment } from '../types/feed';
import { colors } from '../tokens/colors';
import { fontSizes } from '../tokens/fontSizes';
import { spacing } from '../tokens/spacing';

type CommentItemProps = {
  comment: Comment;
  likesCount?: number;
  isLiked?: boolean;
};

export const CommentItem = ({
  comment,
  likesCount,
  isLiked = false,
}: CommentItemProps) => {
  const hasLikes = typeof likesCount === 'number';

  return (
    <View style={styles.container}>
      <Image source={{ uri: comment.author.avatarUrl }} style={styles.avatar} />

      <View style={styles.content}>
        <Text style={styles.authorName} numberOfLines={1}>
          {comment.author.displayName}
        </Text>

        <Text style={styles.text}>{comment.text}</Text>
      </View>

      {hasLikes ? (
        <View style={styles.likesBlock}>
          <LikeIcon
            width={22}
            height={22}
            color={isLiked ? colors.liked : colors.textSecondary}
          />
          <Text style={[styles.likesCount, isLiked && styles.likesCountActive]}>
            {likesCount}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: spacing.md,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    flex: 1,
    paddingRight: spacing.md,
  },
  authorName: {
    fontSize: fontSizes.base,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  text: {
    fontSize: fontSizes.md,
    lineHeight: 20,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  likesBlock: {
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 4,
  },
  likesCount: {
    fontSize: fontSizes.lg,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  likesCountActive: {
    color: colors.textSecondary,
  },
});

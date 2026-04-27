import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../tokens/colors';
import { fontSizes } from '../tokens/fontSizes';
import { spacing } from '../tokens/spacing';

type CommentsSectionHeaderProps = {
  commentsCount: number;
};

export const CommentsSectionHeader = ({
  commentsCount,
}: CommentsSectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{commentsCount} комментария</Text>
      <Text style={styles.sort}>Сначала новые</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.base,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  sort: {
    fontSize: fontSizes.base,
    lineHeight: 20,
    fontWeight: '400',
    color: colors.primary,
  },
});

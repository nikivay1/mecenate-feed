import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';

import LikeIcon from '../assets/icons/mecenatka_solid.svg';
import CommentIcon from '../assets/icons/comment_soild.svg';

type MetricButtonProps = {
  kind: 'like' | 'comment';
  count: number;
  active?: boolean;
};

export const MetricButton = ({
  kind,
  count,
  active = false,
}: MetricButtonProps) => {
  const Icon = kind === 'like' ? LikeIcon : CommentIcon;
  return (
    <View style={[styles.container, active && styles.activeContainer]}>
      <Icon style={[styles.icon, active && styles.iconActive]} />
      <Text style={[styles.count, active && styles.activeText]}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activeContainer: {
    backgroundColor: '#FF4D94',
  },
  icon: {
    color: colors.textSecondary,
    height: 24,
    width: 24
  },
  iconActive: {
    color: colors.surface
  },
  count: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeText: {
    color: colors.surface,
  },
});
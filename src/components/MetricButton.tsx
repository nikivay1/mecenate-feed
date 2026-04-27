import React from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';

import LikeIcon from '../assets/icons/mecenatka_solid.svg';
import LikeIconChecd from '../assets/icons/mecenatka_solid_checed.svg';
import CommentIcon from '../assets/icons/comment_soild.svg';

type MetricButtonProps = {
  kind: 'like' | 'comment';
  count: number;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export const MetricButton = ({
  kind,
  count,
  active = false,
  disabled = false,
  onPress,
}: MetricButtonProps) => {
  const Icon =
    kind === 'like'
      ? active
        ? LikeIconChecd
        : LikeIcon
      : CommentIcon;
  const isPressable = Boolean(onPress) && !disabled;

  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onPress?.();
  };

  return (
    <Pressable
      accessibilityRole={isPressable ? 'button' : undefined}
      disabled={!isPressable}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        active && styles.activeContainer,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Icon
        color={active ? colors.surface : colors.textSecondary}
        style={styles.icon}
      />
      <Text style={[styles.count, active && styles.activeText]}>{count}</Text>
    </Pressable>
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
  disabled: {
    opacity: 0.64,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    color: colors.textSecondary,
    height: 24,
    width: 24
  },
  count: {
    fontSize: 12,
    color: colors.textSecondary,
    paddingRight: spacing.xs,
    fontWeight: '500',
  },
  activeText: {
    color: colors.surface,
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';

type MetricButtonProps = {
  icon: string;
  count: number;
  active?: boolean;
};

export const MetricButton = ({
  icon,
  count,
  active = false,
}: MetricButtonProps) => {
  return (
    <View style={[styles.container, active && styles.activeContainer]}>
      <Text style={[styles.icon, active && styles.activeText]}>{icon}</Text>
      <Text style={[styles.count, active && styles.activeText]}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 28,
    paddingHorizontal: spacing.sm,
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
    fontSize: 12,
    color: colors.textSecondary,
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
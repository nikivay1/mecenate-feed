import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

type ErrorStateProps = {
  onRetry: () => void;
};

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🪼</Text>
      <Text style={styles.title}>Не удалось загрузить публикации</Text>
      <PrimaryButton title="Повторить" onPress={onRetry} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  emoji: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  button: {
    width: '100%',
  },
});
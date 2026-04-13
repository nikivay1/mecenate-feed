import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

type ErrorStateProps = {
  onRetry: () => void;
};

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/error-illustration.png')}
        style={styles.image}
        resizeMode="contain"
      />
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
  image: {
    width: 96,
    height: 96,
    alignSelf: 'center',
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
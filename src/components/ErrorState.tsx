import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IllustrationSticker from '../assets/icons/illustration_sticker.svg';
import { PrimaryButton } from './PrimaryButton';
import { colors } from '../tokens/colors';
import { fontSizes } from '../tokens/fontSizes';
import { spacing } from '../tokens/spacing';

type ErrorStateProps = {
  onRetry: () => void;
};

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <IllustrationSticker width={112} height={112} style={styles.image} />
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
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    fontSize: fontSizes.xxl,
    lineHeight: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  button: {
    width: '100%',
  },
});

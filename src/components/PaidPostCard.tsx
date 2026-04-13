import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { AuthorRow } from './AuthorRow';
import { PrimaryButton } from './PrimaryButton';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';

type PaidPostCardProps = {
  authorName: string;
  authorAvatar: string;
  imageUrl: string;
};

export const PaidPostCard = ({
  authorName,
  authorAvatar,
  imageUrl,
}: PaidPostCardProps) => {
  return (
    <View style={styles.wrapper}>
      <AuthorRow name={authorName} avatarUrl={authorAvatar} />

      <ImageBackground source={{ uri: imageUrl }} style={styles.cover}>
        <View style={styles.overlay}>
          <View style={styles.coin}>
            <Text style={styles.coinText}>$</Text>
          </View>

          <Text style={styles.message}>
            Контент скрыт пользователем.{"\n"}
            Доступ откроется после доната
          </Text>

          <PrimaryButton title="Отправить донат" onPress={() => {}} style={styles.button} />
        </View>
      </ImageBackground>
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
    aspectRatio: 1.3,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  coin: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginBottom: spacing.lg,
  },
  coinText: {
    color: colors.surface,
    fontWeight: '700',
  },
  message: {
    color: colors.surface,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    width: '100%',
  },
});
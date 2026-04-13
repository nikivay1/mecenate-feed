import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { AuthorRow } from './AuthorRow';
import { PrimaryButton } from './PrimaryButton';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';

import MoneyIcon from "../assets/icons/money.svg"

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

      <ImageBackground source={{ uri: imageUrl }} style={styles.cover} blurRadius={40}>
        <View style={styles.overlay}>
          <View style={styles.coin}>
            <MoneyIcon height={20} width={20}/>
          </View>

          <Text style={styles.message}>
            Контент скрыт пользователем.{"\n"}
            Доступ откроется после доната
          </Text>

          <PrimaryButton title="Отправить донат" onPress={() => {}} style={styles.button} />
        </View>
      </ImageBackground>

      <View style={styles.contentPlaceholder}>
        <View style={styles.placeholderLineShort} />
        <View style={styles.placeholderLineLong} />
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
    aspectRatio: 1,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  coin: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  coinText: {
    color: colors.surface,
    fontWeight: '700',
  },
  message: {
    color: colors.surface,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    width: '68%',
  },
  contentPlaceholder: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  placeholderLineShort: {
    width: 164,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    marginBottom: spacing.sm,
  },
  placeholderLineLong: {
    width: '100%',
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
  },
});

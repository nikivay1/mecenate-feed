import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

type AuthorRowProps = {
  name: string;
  avatarUrl: string;
};

export const AuthorRow = ({ name, avatarUrl }: AuthorRowProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
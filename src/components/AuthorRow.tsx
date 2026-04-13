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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 99,
    marginRight: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
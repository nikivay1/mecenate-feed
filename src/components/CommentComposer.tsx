import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';

import CommentIcon from '../assets/icons/chat-message.svg';

type CommentComposerProps = {
  onSubmit: (text: string) => void;
  loading?: boolean;
};

export const CommentComposer = ({
  onSubmit,
  loading = false,
}: CommentComposerProps) => {
  const [text, setText] = useState('');

  const trimmedText = text.trim();
  const isDisabled = trimmedText.length === 0 || loading;

  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    onSubmit(trimmedText);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Ваш комментарий"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        maxLength={500}
        editable={!loading}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />

      <Pressable
        onPress={handleSubmit}
        disabled={isDisabled}
        hitSlop={10}
        style={styles.sendButton}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
            <CommentIcon style={[styles.sendIcon, isDisabled && styles.sendIconDisabled]} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.borderInput,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  sendButton: {
    width: 40,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: 30,
    lineHeight: 34,
  },
  sendIconDisabled: {
    opacity: 0.7,
  },
});
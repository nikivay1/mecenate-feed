import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthorRow } from './AuthorRow';
import { MetricButton } from './MetricButton';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

type PostCardProps = {
  authorName: string;
  authorAvatar: string;
  imageUrl: string;
  title: string;
  previewText: string;
  likesCount: number;
  commentsCount: number;
  isPreviewCollapsed?: boolean;
};

export const PostCard = ({
  authorName,
  authorAvatar,
  imageUrl,
  title,
  previewText,
  likesCount,
  commentsCount,
}: PostCardProps) => {
  const [isPreviewExpanded, setIsPreviewExpanded] = React.useState(false);
  const [isPreviewLong, setIsPreviewLong] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setIsPreviewExpanded(false);
    setIsPreviewLong(null);
  }, [previewText]);

  return (
    <View style={styles.wrapper}>
      <AuthorRow name={authorName} avatarUrl={authorAvatar} />

      <Image source={{ uri: imageUrl }} style={styles.cover} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text
          style={styles.previewMeasure}
          onTextLayout={(event) => {
            setIsPreviewLong(event.nativeEvent.lines.length > 2);
          }}
        >
          {previewText}
        </Text>

        {!isPreviewExpanded && isPreviewLong !== false ? (
          <View style={styles.previewBlock}>
            <Text style={styles.previewCollapsed} numberOfLines={2}>
              {previewText}
            </Text>
            {isPreviewLong ? (
              <View style={styles.showMoreOverlay}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0)', colors.surface]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.showMoreFade}
                  pointerEvents="none"
                />
                <Text style={styles.showMore} onPress={() => setIsPreviewExpanded(true)}>
                  Показать еще
                </Text>
              </View>
            ) : null}
          </View>
        ) : (
          <Text style={styles.preview}>{previewText}</Text>
        )}

        <View style={styles.metrics}>
          <MetricButton kind="like" count={likesCount} />
          <MetricButton kind="comment" count={commentsCount} />
        </View>
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
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  preview: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  previewBlock: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  previewCollapsed: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  previewMeasure: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    opacity: 0,
    fontSize: 15,
    lineHeight: 20,
  },
  showMoreOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  showMoreFade: {
    width: 28,
    height: 20,
  },
  showMore: {
    paddingLeft: spacing.xs,
    backgroundColor: colors.surface,
    fontSize: 15,
    lineHeight: 20,
    color: colors.primary,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});

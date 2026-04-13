import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { PostCard } from '../components/PostCard';
import { PaidPostCard } from '../components/PaidPostCard';
import { colors } from '../tokens/colors';

const mockData = [
  {
    id: '1',
    type: 'free',
    authorName: 'Петр Федько',
    authorAvatar: 'https://i.pravatar.cc/100?img=1',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    title: 'Подготовка к лету',
    previewText:
      'Когда вы начинаете бегать по утрам, но чувствуете, что каждый шаг дается особенно тяжело.',
    likesCount: 12,
    commentsCount: 19,
  },
  {
    id: '2',
    type: 'free',
    authorName: 'Леша Крид',
    authorAvatar: 'https://i.pravatar.cc/100?img=2',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    title: 'Подготовка к лету',
    previewText:
      'Когда вы начинаете бегать по утрам, но чувствуете, что каждый шаг дается особенно тяжело.',
    likesCount: 12,
    commentsCount: 19,
  },
  {
    id: '3',
    type: 'paid',
    authorName: 'Петр Федько',
    authorAvatar: 'https://i.pravatar.cc/100?img=1',
    imageUrl: 'https://picsum.photos/600/400?random=3',
  },
];

export const FeedScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.type === 'paid') {
            return (
              <PaidPostCard
                authorName={item.authorName}
                authorAvatar={item.authorAvatar}
                imageUrl={item.imageUrl}
              />
            );
          }

          return (
            <PostCard
              authorName={item.authorName}
              authorAvatar={item.authorAvatar}
              imageUrl={item.imageUrl}
              title={item.title}
              previewText={item.previewText}
              likesCount={item.likesCount}
              commentsCount={item.commentsCount}
            />
          );
        }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: 12,
  },
});
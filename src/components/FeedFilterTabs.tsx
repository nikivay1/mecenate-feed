import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';

export type FeedFilter = 'all' | 'free' | 'paid';

type FeedFilterTabsProps = {
  activeFilter: FeedFilter;
  onChange: (filter: FeedFilter) => void;
};

const feedFilters: Array<{ label: string; value: FeedFilter }> = [
  { label: 'Все', value: 'all' },
  {
    label:
      'Бесплатные',
    value: 'free',
  },
  { label: 'Платные', value: 'paid' },
];

export const FeedFilterTabs = ({
  activeFilter,
  onChange,
}: FeedFilterTabsProps) => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      {feedFilters.map((filter) => {
        const isActive = filter.value === activeFilter;

        return (
          <Pressable
            key={filter.value}
            onPress={() => onChange(filter.value)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  container: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  textActive: {
    fontWeight: '700',
    color: colors.surface,
  },
});

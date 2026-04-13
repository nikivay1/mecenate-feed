import React from 'react';
import { AppProviders } from './src/app/providers/AppProviders';
import { FeedScreen } from './src/screens/FeedScreen';

export default function App() {
  return (
    <AppProviders>
      <FeedScreen />
    </AppProviders>
  );
}
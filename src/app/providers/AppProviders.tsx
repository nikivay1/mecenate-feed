import React, { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from '../../stores/StoreProvider';
import { rootStore } from '../../stores/rootStore';

export const AppProviders = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 30_000,
          },
        },
      })
  );

  return (
    <StoreProvider value={rootStore}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StoreProvider>
  );
};
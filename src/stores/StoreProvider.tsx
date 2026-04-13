import React, { createContext, PropsWithChildren, useContext } from 'react';
import type { RootStoreType } from './rootStore';

const StoreContext = createContext<RootStoreType | null>(null);

type StoreProviderProps = PropsWithChildren<{
  value: RootStoreType;
}>;

export const StoreProvider = ({ value, children }: StoreProviderProps) => {
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return store;
};
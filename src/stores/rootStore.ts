import { makeAutoObservable } from 'mobx';

class FeedUiStore {
  constructor() {
    makeAutoObservable(this);
  }
}

class RootStore {
  feedUiStore: FeedUiStore;

  constructor() {
    this.feedUiStore = new FeedUiStore();
    makeAutoObservable(this);
  }
}

export const rootStore = new RootStore();
export type RootStoreType = RootStore;
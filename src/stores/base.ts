import { RootStore } from '.';

export default abstract class BaseStore {
  store: RootStore;
  constructor(store: RootStore) {
    this.store = store;
  }
}

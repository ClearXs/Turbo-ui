import AppStore from './app';
import ErrorStore from './error';
import RouteStore from './route';
import UserStore from './user';

export interface RootStore {
  error: ErrorStore;
  user: UserStore;
  app: AppStore;
  route: RouteStore;
}

class RootStoreImpl implements RootStore {
  error: ErrorStore;
  user: UserStore;
  app: AppStore;
  route: RouteStore;

  constructor() {
    this.error = new ErrorStore(this);
    this.user = new UserStore(this);
    this.app = new AppStore(this);
    this.route = new RouteStore(this);
  }
}

export default new RootStoreImpl();

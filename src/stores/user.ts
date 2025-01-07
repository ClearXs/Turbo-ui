import { User } from '@/api/system/user';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base';
import { RootStore } from '.';

export default class UserStore extends BaseStore {
  currentUser?: User;

  constructor(store: RootStore) {
    super(store);

    makeObservable(this, {
      currentUser: observable,
      setCurrentUser: action,
    });
  }

  setCurrentUser(user?: User) {
    this.currentUser = user;
  }
}

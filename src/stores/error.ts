import { SystemError } from '@/error/interface';
import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base';
import { RootStore } from '.';

// 当系统运行过程中发生的错误通过该state进行设置（发布信号量至处理端进行处理）
export default class ErrorStore extends BaseStore {
  error?: SystemError;

  constructor(store: RootStore) {
    super(store);

    makeObservable(this, {
      error: observable,
      setError: action,
    });
  }

  setError(error?: SystemError) {
    this.error = error;
  }
}

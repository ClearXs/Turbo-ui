import { UserTab } from '@/components/motion-content/interface';
import { Theme } from '@/theme';
import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base';
import { RootStore } from '.';
import { Language } from '@/locales';

export default class AppStore extends BaseStore {
  language: Language = 'zh-cn';

  theme: Theme = 'light';

  // 选择顶部菜单的key
  selectTopKey?: string = 'home';

  // 选择侧边菜单的key
  selectSideKey?: string;

  // 小tab栏
  userTabs: UserTab[] = [];

  // 选中的小tab栏
  selectTabKey?: string;

  constructor(store: RootStore) {
    super(store);

    makeObservable(this, {
      language: observable,
      theme: observable,
      selectTabKey: observable,
      selectSideKey: observable,
      userTabs: observable,
      selectTopKey: observable,
      changeLanguage: action,
      changeTheme: action,
      setSelectSideKey: action,
      setSelectTabKey: action,
      setUserTabs: action,
      setSelectTopKey: action,
    });
  }

  changeLanguage(lang: Language) {
    this.language = lang;
  }

  changeTheme(theme: Theme) {
    this.theme = theme;
  }

  setSelectTopKey(topKey: string) {
    this.selectTopKey = topKey;
  }

  setSelectSideKey(sideKey: string) {
    this.selectSideKey = sideKey;
  }

  setUserTabs(userTabs: UserTab[]) {
    this.userTabs = userTabs;
  }

  setSelectTabKey(tabKey: string) {
    this.selectTabKey = tabKey;
  }
}

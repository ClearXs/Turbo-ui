import { TurboRoute } from '@/route/AppRouter';
import { newArray } from '@/util/utils';
import { UserTab } from './interface';

/**
 * 判断给定的route是否可以加入userTabs中，如果可以则创建新的数组加入并返回，否则返回null
 * @param userTabs 原userTabs
 * @param route  route
 * @param topMenuKey topMenuKey
 * @returns
 */
export const createContentTab = (
  userTabs: UserTab[],
  route: TurboRoute,
  topMenuKey: string,
) => {
  // 设置用户选择的tab
  const hasTabIndex = userTabs.findIndex((tab) => tab.itemKey === route.code);
  if (hasTabIndex < 0 && route.path !== '/') {
    // 排除 '/'路径的content tab添加
    const newTabs = newArray<UserTab>();
    userTabs.forEach((tab) => newTabs.push(tab));
    // 添加user tab
    newTabs.push({
      itemKey: route.code,
      path: route.path as string,
      icon: route.icon,
      tab: route.name,
      closable: route.clearable,
      topMenuKey,
    });
    return newTabs;
  }
  return undefined;
};

import {
  CurrentUserMenuTabsState,
  CurrentUserSelectTabState,
  CurrentUserSidebarMenusState,
  CurrentUserSidebarSelectTabState,
  UserTab,
} from '@/store/menu';
import { Dropdown, Notification, TabPane, Tabs } from '@douyinfe/semi-ui';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { directGetIcon } from '../Icon';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { TurboRoute } from '@/route/AppRouter';
import _ from 'lodash';

const ContentTabs = () => {
  const [userTabs, setCurrentUserTabs] = useRecoilState(
    CurrentUserMenuTabsState,
  );
  const [sidebarSelectTab, setSidebarSelectTab] = useRecoilState(
    CurrentUserSidebarSelectTabState,
  );
  const [topMenu, setTopMenu] = useRecoilState(CurrentUserSelectTabState);
  const navigate = useNavigate();
  const userRoutes = useLoaderData() as TurboRoute[];
  const setSidebarMenus = useSetRecoilState(CurrentUserSidebarMenusState);

  const closeTab = (tabKey: string) => {
    // 去除关闭的menu tab
    // 获取当前menu tab的下一项作为默认打开项
    const closeTabIndex = userTabs.findIndex((tab) => {
      return tab.itemKey === tabKey;
    });
    // 判断当前关闭的key是否为激活的key，如果不是则不重新设置激活key
    if (tabKey === sidebarSelectTab) {
      // 判断当前关闭是否为最后一个，如果是则取上一个，如果不是则取下一个
      const nextTab =
        userTabs[
          closeTabIndex === userTabs.length - 1
            ? closeTabIndex - 1
            : closeTabIndex + 1
        ];
      // home特殊处理
      if (nextTab.itemKey === 'home') {
        toHome();
        return;
      }

      setSidebarSelectTab(nextTab.itemKey as string);
      navigate(nextTab.path as string);
      onceMoreRenderSideMenu(nextTab);
    }
    const newTabs = [
      ...userTabs.slice(0, closeTabIndex),
      ...userTabs.slice(closeTabIndex + 1, userTabs.length),
    ];
    setCurrentUserTabs(newTabs);
  };

  const closeOtherTab = (tab: UserTab) => {
    // 保留home tab
    const homeTab = userTabs.find((tab) => tab.itemKey === 'home');
    const newUserTabs = [];
    if (homeTab && tab.itemKey !== homeTab.itemKey) {
      newUserTabs.push(homeTab);
    }
    newUserTabs.push(tab);
    // 判断当前是否是选中
    // 如果是，则不需要设置选中项
    // 如果不是，则需要设置选中项，以当前结点作为选中项并跳转
    if (sidebarSelectTab !== tab.itemKey) {
      setSidebarSelectTab(tab.itemKey as string);
      navigate(tab.path as string);
    }
    setCurrentUserTabs(newUserTabs);
  };

  const closeAllTab = () => {
    // 保留home tab
    const homeTab = userTabs.find((tab) => tab.itemKey === 'home');
    if (homeTab) {
      // 跳转到home
      setTopMenu(homeTab.itemKey as string);
      navigate(homeTab.path as string);
      setCurrentUserTabs([homeTab]);
    } else {
      setCurrentUserTabs([]);
    }
  };

  const tabClick = (activeKey: string) => {
    // home特殊处理
    if (activeKey === 'home') {
      toHome();
      return;
    }
    const tab = userTabs.find((tab) => tab.itemKey === activeKey);
    if (tab) {
      if (_.isEmpty(tab.path)) {
        Notification.error({
          position: 'top',
          content: `菜单'${tab.tab}'未配置路由!`,
        });
      } else {
        navigate(tab.path);
      }
      // 设置active
      setSidebarSelectTab(activeKey);

      onceMoreRenderSideMenu(tab);
    }
  };

  // 再次渲染 side menu
  const onceMoreRenderSideMenu = (tab: UserTab) => {
    // 避免重复渲染
    if (topMenu !== tab.topMenuKey) {
      setTopMenu(tab.topMenuKey);
      // 重新设置sidebar
      const topMenu = userRoutes.find((route) => route.code === tab.topMenuKey);
      topMenu &&
        setSidebarMenus({
          topMenuKey: tab.topMenuKey,
          sideMenus: topMenu.children as TurboRoute[],
        });
    }
  };

  const toHome = () => {
    navigate('/home');
    setTopMenu('home');
  };

  return (
    <Tabs
      className="w-[100%]"
      type="card"
      onTabClick={(activeKey) => tabClick(activeKey)}
      onTabClose={(tabKey) => closeTab(tabKey)}
      activeKey={sidebarSelectTab}
      renderTabBar={(props, Bar) => {
        return (
          <>
            <Bar {...props}></Bar>
          </>
        );
      }}
      collapsible
    >
      {userTabs.map((tab, index) => {
        return (
          <TabPane
            key={tab.itemKey}
            tab={
              <>
                <Dropdown
                  trigger="contextMenu"
                  position="bottom"
                  clickToHide
                  render={
                    <Dropdown.Menu>
                      {tab.itemKey !== 'home' && (
                        <Dropdown.Item
                          icon={directGetIcon('IconRefresh')}
                          onClick={() => {
                            navigate(tab.path);
                            // 设置active
                            setSidebarSelectTab(tab.itemKey as string);
                          }}
                        >
                          刷新
                        </Dropdown.Item>
                      )}

                      {tab.itemKey !== 'home' && (
                        <Dropdown.Item
                          icon={directGetIcon('IconClose')}
                          onClick={() => closeTab(tab.itemKey as string)}
                        >
                          关闭
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        icon={directGetIcon('IconMinusCircleStroked')}
                        onClick={() => closeOtherTab(tab)}
                      >
                        关闭其他
                      </Dropdown.Item>
                      <Dropdown.Item
                        icon={directGetIcon('IconClear')}
                        onClick={() => closeAllTab()}
                      >
                        关闭全部
                      </Dropdown.Item>
                      <Dropdown.Item icon={directGetIcon('IconStar')}>
                        收藏
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Text>{tab.tab}</Text>
                </Dropdown>
              </>
            }
            tabIndex={index}
            itemKey={tab.itemKey}
            icon={tab.icon}
            closable={tab.closable}
          />
        );
      })}
    </Tabs>
  );
};
export default ContentTabs;

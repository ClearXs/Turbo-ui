import { Dropdown, Notification, TabPane, Tabs } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';
import { tryGetIcon } from '../Icon/shared';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { AppContext } from '@/context';
import { findRoute } from '@/route/util';
import { createContentTab } from './util';
import { observer } from '@formily/reactive-react';
import { UserTab } from './interface';

const ContentTabs = observer(() => {
  const app = useContext(AppContext);
  const { userRoutes, userTabs, selectTopKey, selectTabKey, selectSideKey } =
    app;
  const navigate = useNavigate();

  const closeTab = (tabKey: string) => {
    // 去除关闭的menu tab
    // 获取当前menu tab的下一项作为默认打开项
    const closeTabIndex = userTabs.findIndex((tab) => {
      return tab.itemKey === tabKey;
    });
    const newUserTabs = [
      ...userTabs.slice(0, closeTabIndex),
      ...userTabs.slice(closeTabIndex + 1, userTabs.length),
    ];
    app.userTabs = newUserTabs;
    // 判断当前关闭的key是否为激活的key，如果不是则不重新设置激活key
    if (tabKey === selectSideKey) {
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
      app.selectSideKey = nextTab.itemKey;
      navigate(nextTab.path as string);
      onceMoreRenderSideMenu(nextTab);
    }
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
    if (selectSideKey !== tab.itemKey) {
      app.selectSideKey = tab.itemKey;
      navigate(tab.path as string);
    }
    app.userTabs = newUserTabs;
  };

  const closeAllTab = () => {
    // 保留home tab
    const homeTab = userTabs.find((tab) => tab.itemKey === 'home');
    if (homeTab) {
      // 跳转到home
      app.selectTopKey = homeTab.itemKey as string;
      navigate(homeTab.path as string);
      app.userTabs = [homeTab];
    } else {
      app.userTabs = [];
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
      app.selectTabKey = activeKey;
      app.selectSideKey = activeKey;
      onceMoreRenderSideMenu(tab);
    }
  };

  // 再次渲染 side menu
  const onceMoreRenderSideMenu = (tab: UserTab) => {
    // 避免重复渲染
    if (selectTopKey !== tab.topMenuKey) {
      app.selectTopKey = tab.topMenuKey;
    }
  };

  const toHome = () => {
    navigate('/home');
    app.selectTopKey = 'home';
  };

  useEffect(() => {
    const homeRoute = findRoute('/home', userRoutes);
    if (homeRoute) {
      const newTabs = createContentTab(userTabs, homeRoute, 'home');
      if (app.selectTabKey === undefined) {
        app.selectTabKey = 'home';
      }
      if (newTabs) {
        app.userTabs = newTabs;
      }
    }
  }, []);

  return (
    <Tabs
      className="w-[100%]"
      type="card"
      onTabClick={(activeKey) => tabClick(activeKey)}
      onTabClose={(tabKey) => closeTab(tabKey)}
      activeKey={selectTabKey}
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
              <Dropdown
                trigger="contextMenu"
                position="bottom"
                clickToHide
                render={
                  <Dropdown.Menu>
                    {tab.itemKey !== 'home' && (
                      <Dropdown.Item
                        icon={tryGetIcon('IconRefresh')}
                        onClick={() => {
                          navigate(tab.path);
                          // 设置active
                          app.selectSideKey = tab.itemKey as string;
                        }}
                      >
                        刷新
                      </Dropdown.Item>
                    )}

                    {tab.itemKey !== 'home' && (
                      <Dropdown.Item
                        icon={tryGetIcon('IconClose')}
                        onClick={() => closeTab(tab.itemKey as string)}
                      >
                        关闭
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      icon={tryGetIcon('IconMinusCircleStroked')}
                      onClick={() => closeOtherTab(tab)}
                    >
                      关闭其他
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={tryGetIcon('IconClear')}
                      onClick={() => closeAllTab()}
                    >
                      关闭全部
                    </Dropdown.Item>
                    <Dropdown.Item icon={tryGetIcon('IconStar')}>
                      收藏
                    </Dropdown.Item>
                  </Dropdown.Menu>
                }
              >
                <Text>{tab.tab}</Text>
              </Dropdown>
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
});

export default ContentTabs;

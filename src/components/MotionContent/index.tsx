import {
  CurrentUserSelectTabState,
  CurrentUserMenuTabsState,
} from '@/store/menu';
import { Layout, TabPane, Tabs } from '@douyinfe/semi-ui';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const MotionContent = React.memo(() => {
  const [userTabs, setCurrentUserTabs] = useRecoilState(
    CurrentUserMenuTabsState,
  );
  const [selectTab, setSelectTab] = useRecoilState(CurrentUserSelectTabState);
  const { Content } = Layout;
  const navigate = useNavigate();

  return (
    <>
      <Tabs
        type="card"
        onTabClick={(activeKey) => {
          const tab = userTabs.find((tab) => tab.itemKey === activeKey);
          // 跳转
          tab && navigate(tab.path);
          // 设置active
          setSelectTab(activeKey);
        }}
        onTabClose={(tabKey) => {
          // 去除关闭的menu tab
          // 获取当前menu tab的下一项作为默认打开项
          const closeTabIndex = userTabs.findIndex((tab) => {
            return tab.itemKey === tabKey;
          });
          // 判断当前关闭的key是否为激活的key，如果不是则不重新设置激活key
          if (tabKey === selectTab) {
            // 判断当前关闭是否为最后一个，如果是则取上一个，如果不是则取下一个
            const nextTab =
              userTabs[
                closeTabIndex === userTabs.length - 1
                  ? closeTabIndex - 1
                  : closeTabIndex + 1
              ];
            setSelectTab(nextTab.itemKey as string);
            navigate(nextTab.path as string);
          }
          const newTabs = [
            ...userTabs.slice(0, closeTabIndex),
            ...userTabs.slice(closeTabIndex + 1, userTabs.length),
          ];
          setCurrentUserTabs(newTabs);
        }}
        activeKey={selectTab}
      >
        {userTabs.map((tab, index) => {
          return (
            <TabPane
              key={tab.itemKey}
              tab={tab.tab}
              tabIndex={index}
              itemKey={tab.itemKey}
              icon={tab.icon}
              closable={tab.closable}
            />
          );
        })}
      </Tabs>

      <Content className="bg-slate-50 p-2 ">
        <div className="w-[100%] h-[100%] box-border border-[1px] border-solid border-[var(--semi-color-border)] m-0 p-2 rounded-[var(--semi-border-radius-medium)] overflow-hidden bg-[var(--semi-color-bg-0)]">
          <Outlet />
        </div>
      </Content>
    </>
  );
});

export default MotionContent;

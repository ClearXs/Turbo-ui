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
          // 跳转
          navigate(activeKey);
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
            const nextActiveKey =
              userTabs[
                closeTabIndex === userTabs.length - 1
                  ? closeTabIndex - 1
                  : closeTabIndex + 1
              ]?.itemKey;
            setSelectTab(nextActiveKey as string);
            navigate(nextActiveKey as string);
          }
          const newTabs = [
            ...userTabs.slice(0, closeTabIndex),
            ...userTabs.slice(closeTabIndex + 1, userTabs.length),
          ];
          setCurrentUserTabs(newTabs);
        }}
        activeKey={selectTab}
      >
        {userTabs.map((tab) => {
          return <TabPane {...tab} />;
        })}
      </Tabs>

      <Content className="ml-2">
        <Outlet />
      </Content>
    </>
  );
});

export default MotionContent;

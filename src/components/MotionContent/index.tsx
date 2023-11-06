import { CurrentUserSelectTabState, CurrentUserTabsState } from '@/store/menu';
import { newArray } from '@/util/utils';
import { IconHome } from '@douyinfe/semi-icons';
import { Layout, TabPane, Tabs } from '@douyinfe/semi-ui';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const MotionContent = () => {
  const [userTabs, setCurrentUserTabs] = useRecoilState(CurrentUserTabsState);
  const [selectTab, setSelectTab] = useRecoilState(CurrentUserSelectTabState);
  const { Content } = Layout;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUserTabs([
      {
        itemKey: '/home',
        tab: '首页',
        closable: false,
        icon: <IconHome />,
      },
    ]);
  }, []);

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
          let newTabs = newArray(...userTabs);
          newTabs = newTabs.filter((tab) => {
            return tab.itemKey !== tabKey;
          });
          setCurrentUserTabs(newTabs);
          // 设置最后一个为当前所选
          const lastTab = newTabs[newTabs.length - 1];
          navigate(lastTab.itemKey as string);
          setSelectTab(lastTab.itemKey as string);
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
};

export default MotionContent;

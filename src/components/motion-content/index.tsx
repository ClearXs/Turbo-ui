import { Layout } from '@douyinfe/semi-ui';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import ContentTabs from './ContentTabs';
import useStore from '@/hook/useStore';
import { observer } from 'mobx-react';

const MotionContent = () => {
  const { app, route } = useStore();

  const { selectTopKey } = app;

  return (
    <Layout className="flex h-[92%] w-[100%]">
      {selectTopKey !== 'home' && <Sidebar />}
      <div className="flex flex-col h-[100%] w-[100%] bg-[var(--semi-color-bg-0)]">
        {selectTopKey !== 'home' && <ContentTabs />}
        <Layout.Content>
          <div className="w-[100%] h-[100%] p-2 overflow-hidden">
            {/* 避免提前渲染 */}
            {route.routes.length > 0 && <Outlet />}
          </div>
        </Layout.Content>
      </div>
    </Layout>
  );
};

export default observer(MotionContent);

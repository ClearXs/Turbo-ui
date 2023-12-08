import { Divider, Layout } from '@douyinfe/semi-ui';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import ContentTabs from './ContentTabs';
import { CurrentUserSelectTabState } from '@/store/menu';
import { useRecoilValue } from 'recoil';

const MotionContent = React.memo(() => {
  const selectTab = useRecoilValue(CurrentUserSelectTabState);

  return (
    <>
      <Layout className="flex h-[92%] w-[100%]">
        {selectTab !== 'home' && <Sidebar />}
        <div
          className="flex flex-col bg-slate-50 h-[100%]"
          style={selectTab !== 'home' ? { width: '85%' } : { width: '100%' }}
        >
          {selectTab !== 'home' && <ContentTabs />}
          <Layout.Content className="p-1">
            <div className="w-[100%] h-[100%] box-border border-[1px] border-solid border-[var(--semi-color-border)] m-0 p-2 rounded-[var(--semi-border-radius-medium)] overflow-hidden bg-[var(--semi-color-bg-0)]">
              <Outlet />
            </div>
          </Layout.Content>
        </div>
      </Layout>
    </>
  );
});

export default MotionContent;

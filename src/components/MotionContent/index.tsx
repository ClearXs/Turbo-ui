import { Layout } from '@douyinfe/semi-ui';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import ContentTabs from './ContentTabs';
import { AppContext } from '@/context';
import { observer } from '@formily/reactive-react';

const MotionContent = observer(() => {
  const app = useContext(AppContext);
  const { selectTopKey } = app;
  return (
    <Layout className="flex h-[92%] w-[100%]">
      {selectTopKey !== 'home' && <Sidebar />}
      <div
        className="flex flex-col bg-slate-50 h-[100%]"
        style={selectTopKey !== 'home' ? { width: '85%' } : { width: '100%' }}
      >
        {selectTopKey !== 'home' && <ContentTabs />}
        <Layout.Content className="p-1">
          <div className="w-[100%] h-[100%] box-border border-[1px] border-solid border-[var(--semi-color-border)] m-0 p-2 rounded-[var(--semi-border-radius-medium)] overflow-hidden bg-[var(--semi-color-bg-0)]">
            <Outlet />
          </div>
        </Layout.Content>
      </div>
    </Layout>
  );
});

export default MotionContent;

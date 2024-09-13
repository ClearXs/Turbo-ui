import { Layout } from '@douyinfe/semi-ui';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import ContentTabs from './ContentTabs';
import { AppContext } from '@/context';
import { observer } from '@formily/reactive-react';
import { motion } from 'framer-motion';

const MotionContent = observer(() => {
  const app = useContext(AppContext);

  const { selectTopKey } = app;

  return (
    <Layout className="flex h-[92%] w-[100%]">
      {selectTopKey !== 'home' && <Sidebar />}
      <div className="flex flex-col h-[100%] w-[100%] bg-[var(--semi-color-bg-0)]">
        {selectTopKey !== 'home' && <ContentTabs />}
        <Layout.Content>
          <motion.div
            key={app.selectTabKey}
            initial={{ y: 20, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-[100%] h-[100%]"
          >
            <div className="w-[100%] h-[100%] p-2 overflow-hidden">
              <Outlet />
            </div>
          </motion.div>
        </Layout.Content>
      </div>
    </Layout>
  );
});

export default MotionContent;

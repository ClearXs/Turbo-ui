import { Layout } from '@douyinfe/semi-ui';
import './theme/default.css';
import MotionContent from './components/MotionContent';
import MotionHeader from './components/MotionHeader';

export default function App(): React.ReactNode {
  return (
    <Layout className="h-100vh w-100vw">
      <MotionHeader />
      <MotionContent />
    </Layout>
  );
}

import { Layout } from '@douyinfe/semi-ui';
import MotionContent from './components/MotionContent';
import MotionHeader from './components/MotionHeader';
import { useEffect } from 'react';
import { GlobalRegistry } from '@designable/core';
import './locales';

import { SUPPORT_LOCALES } from './components/MotionHeader/Locales';

export default function App(): React.ReactNode {
  useEffect(() => {
    const supportLocales = SUPPORT_LOCALES.map((locales) => locales.value);
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
  }, []);

  return (
    <Layout className="h-100vh w-100vw overflow-hidden">
      <MotionHeader />
      <MotionContent />
    </Layout>
  );
}

import { useLottie } from 'lottie-react';
import animation from '@/lottie/FormLoading.json';
import { DesignableProps } from '../Editor';
import { observer } from '@formily/reactive-react';
import { EditorProps } from '../interface';
import { useInitialize } from '../service/schema';
import { useEffect } from 'react';
import Copyright from '@/pages/Copyright';
import Declaration from '@/pages/Declaration';
import { Spin } from '@douyinfe/semi-ui';

export type LoadingPanelProps = {
  designableProps: DesignableProps;
  children: React.ReactNode;
  form: EditorProps['form'];
};

const LoadingPanel: React.FC<LoadingPanelProps> = observer(
  ({ designableProps, children, form }) => {
    const initialize = useInitialize();

    useEffect(() => {
      initialize(form, designableProps);
    }, [form]);

    const { loading, saveLoading } = designableProps;
    const { View } = useLottie({
      animationData: animation,
      style: { width: '30%', height: '30%' },
    });
    if (loading) {
      return (
        <div className="h-100vh w-100vw flex justify-center items-center bg-slate-50">
          <div className="flex flex-col justify-center items-center">
            {View}
            <Declaration />
          </div>
          <Copyright />
        </div>
      );
    } else if (saveLoading) {
      return <Spin spinning={saveLoading}>{children}</Spin>;
    }
    return children;
  },
);

export default LoadingPanel;

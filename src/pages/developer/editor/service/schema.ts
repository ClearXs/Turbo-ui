import useBoApi from '@/api/developer/bo';
import useFormApi, { Form } from '@/api/developer/form';
import useDicApi from '@/api/system/dic';
import { useDesigner } from '@designable/react';
import { Notification } from '@douyinfe/semi-ui';
import _ from 'lodash';
import { DesignableProps } from '../Editor';
import { useKernel } from '../kernel';

export const useInitialize = () => {
  const kernel = useKernel();
  const boApi = useBoApi();
  const dicApi = useDicApi();

  // 初始化boschema、form schema、dics数据
  return (form: Form, designableProps: DesignableProps) => {
    Promise.all([
      boApi.schema(form.boId),
      dicApi.tree(),
      Promise.resolve(form.schema),
    ])
      .then((combine) => {
        const bo = combine[0];
        if (bo.code === 200) {
          kernel.setBoTree(bo.data);
        }

        const dics = combine[1];
        if (dics.code === 200) {
          kernel.setDictionary(dics.data);
        }
        const formSchema = combine[2];
        if (!_.isEmpty(formSchema)) {
          kernel.setISchema(formSchema);
        }
        const dataView = kernel.createDefaultDataView();
        kernel.setDataView(dataView);
        designableProps.loading = false;
      })
      .catch((err) => {
        Notification.error({ content: err });
        designableProps.loading = false;
      });
  };
};

export const useSaveSchema = () => {
  const boApi = useBoApi();
  const formApi = useFormApi();
  const engine = useDesigner();

  return (form: Form) => {
    Promise.all([
      formApi.saveOrUpdate(form),
      boApi.saveSchema(engine.getBoSchema()),
    ]).catch((err) => {
      Notification.error({ content: err });
    });
  };
};

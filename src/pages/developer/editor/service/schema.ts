import useBoApi from '@/api/developer/bo';
import { Form } from '@/api/developer/form';
import useDicApi, { Dic } from '@/api/system/dic';
import { Dictionary } from '@designable/core/lib/models/Dictionary';
import { transformToTreeNode } from '@designable/formily-transformer';
import { useDesigner } from '@designable/react';
import { Notification } from '@douyinfe/semi-ui';
import _ from 'lodash';

export const useInitializeSchema = () => {
  const boApi = useBoApi();
  const dicApi = useDicApi();
  const engine = useDesigner();

  // 初始化boschema、form schema、dics数据
  return (form: Form) => {
    Promise.all([
      boApi.schema(form.boId),
      dicApi.tree(),
      Promise.resolve(form.schema),
    ])
      .then((combine) => {
        const bo = combine[0];
        if (bo.code === 200) {
          engine.setBoTree(bo.data);
        }

        const dics = combine[1];
        if (dics.code === 200) {
          const formatterDictionary = (dic: Dic): Dictionary => {
            return {
              id: dic.id,
              value: dic.code,
              key: dic.code,
              label: dic.name,
              children: dic.children.map(formatterDictionary),
            };
          };
          const dictionary = dics.data.map(formatterDictionary);
          engine.setDictionary(dictionary);
        }
        const formSchema = combine[2];
        if (!_.isEmpty(formSchema)) {
          engine.setCurrentTree(transformToTreeNode(JSON.parse(formSchema)));
        }
      })
      .catch((err) => {
        Notification.error({ content: err });
      });
  };
};

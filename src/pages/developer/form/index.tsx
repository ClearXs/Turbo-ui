import { Toast } from '@douyinfe/semi-ui';
import { useMemo, useRef, useState } from 'react';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import TreePanel from '@/components/Tree/TreePanel';
import { Form as FormEntity } from '@/api/developer/form';
import FormHelper from './helper';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/Binary';
import _ from 'lodash';
import FormEditor from '../editor/FormEditor';
import { tryGetIcon } from '@/components/Icon';
import useBoApi from '@/api/developer/bo';

const Form: React.FC = () => {
  const boApi = useBoApi();
  const [categoryId, setCategoryId] = useState<string>();
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const formEntityRef = useRef<FormEntity>();

  const editable = useMemo(() => {
    return (record: FormEntity) => {
      if (_.isEmpty(record.boId)) {
        Toast.error('请选择业务对象!');
        return;
      }
      boApi.check(record.boId).then((res) => {
        const { code, data } = res;
        if (code === 200 && data) {
          setShowEditor(true);
          formEntityRef.current = record;
        } else {
          Toast.error('业务对象不存在!');
        }
      });
    };
  }, []);

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'form' }}
            addDefaultValue={{ funcCode: 'form' }}
            useApi={CategoryHelper.getApi}
            onSelectChange={setCategoryId}
            depth={0}
            root="表单分类"
            expandAll
            first={false}
          />
        }
        RightComponent={
          <CategoryTableCrud<FormEntity>
            mode="cardPage"
            columns={FormHelper.getColumns()}
            useApi={FormHelper.getApi}
            params={{ categoryId: categoryId }}
            funcCode="form"
            operateBar={{
              append: [
                {
                  code: 'editForm',
                  name: '编辑表单',
                  type: 'primary',
                  icon: tryGetIcon('IconFormSetting'),
                  onClick(tableContext, formContext, value) {
                    editable(value);
                  },
                },
              ],
            }}
            card={{
              onClick(record) {
                editable(record);
              },
            }}
          />
        }
      />
      <FormEditor
        visible={showEditor}
        panels={['formDesign']}
        onCancel={() => setShowEditor(false)}
        formOrId={formEntityRef.current}
      />
    </>
  );
};

export default Form;

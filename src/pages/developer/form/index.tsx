import { Notification } from '@douyinfe/semi-ui';
import { useRef, useState } from 'react';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import TreePanel from '@/components/Tree/TreePanel';
import { Form } from '@/api/developer/form';
import FormHelper from './helper';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/Binary';
import _ from 'lodash';
import FormEditor from '../editor/FormEditor';

const Form: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>();

  const [showEditor, setShowEditor] = useState<boolean>(false);
  const formEntityRef = useRef<Form>();

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
          />
        }
        RightComponent={
          <CategoryTableCrud<Form>
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
                  onClick(tableContext, formContext, value) {
                    if (_.isEmpty(value.boId)) {
                      Notification.error({ content: '请选择业务对象!' });
                      return;
                    }
                    setShowEditor(true);
                    formEntityRef.current = value;
                  },
                },
              ],
            }}
            card={{
              onClick(record) {
                if (_.isEmpty(record.boId)) {
                  Notification.error({ content: '请选择业务对象!' });
                  return;
                }
                setShowEditor(true);
                formEntityRef.current = record;
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

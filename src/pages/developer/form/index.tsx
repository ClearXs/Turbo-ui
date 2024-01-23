import { Modal, Notification } from '@douyinfe/semi-ui';
import { useMemo, useRef, useState } from 'react';
import useCategoryApi, { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import TreePanel from '@/components/Tree/TreePanel';
import useFormApi, { Form } from '@/api/developer/form';
import FormHelper from './helper';
import Editor from '../editor';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/Binary';
import { Form as Formliy } from '@formily/core';
import _ from 'lodash';

const Form: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>();

  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const formRef = useRef<Formliy>();

  const formEntityRef = useRef<Form>();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'form' }}
            addDefaultValue={{ funcCode: 'form' }}
            useApi={useCategoryApi}
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
            useApi={useFormApi}
            params={{ categoryId: categoryId }}
            funcCode="form"
            operateBar={{
              append: [
                {
                  code: 'preview',
                  name: '预览',
                  type: 'primary',
                  onClick(tableContext, formContext, value) {
                    setShowPreview(true);
                  },
                },
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
      <Modal
        fullScreen
        footer={null}
        visible={showEditor}
        closeOnEsc={false}
        onCancel={() => setShowEditor(false)}
      >
        {formEntityRef.current && (
          <Editor
            form={formEntityRef.current}
            onClose={() => setShowEditor(false)}
          />
        )}
      </Modal>
      <Modal
        visible={showPreview}
        closeOnEsc
        onCancel={() => setShowPreview(false)}
        size="large"
        onOk={() => {
          formRef.current?.submit((values) => {
            Notification.info({ content: JSON.stringify(values) });
          });
        }}
      ></Modal>
    </>
  );
};

export default Form;

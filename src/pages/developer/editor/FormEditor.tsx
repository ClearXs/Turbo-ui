import useFormApi, { Form } from '@/api/developer/form';
import { Modal, Toast } from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import Editor from '.';
import { EditorProps } from './interface';
import { usePrefix } from '@clearx/designable-react';
import cls from 'classnames';
import useBoApi from '@/api/developer/bo';

export type ModalEditorProps = {
  visible: boolean;
  // 视图类型
  panels: EditorProps['panels'];
  onSave?: EditorProps['onSave'];
  onPublish?: EditorProps['onPublish'];
  onCancel: EditorProps['onClose'];
  formOrId: Form | string | undefined;
};

const FormEditor: React.FC<ModalEditorProps> = ({
  visible,
  formOrId,
  panels,
  onSave,
  onPublish,
  onCancel,
}) => {
  const prefix = usePrefix('form-editor');
  const boApi = useBoApi();
  const formApi = useFormApi();
  const [form, setForm] = useState<Form>();

  useEffect(() => {
    if (typeof formOrId === 'string') {
      formApi.details(formOrId).then((res) => {
        res.code === 200 && setForm(res.data);
      });
    } else if (formOrId) {
      setForm(formOrId);
    }
  }, [formOrId]);

  return (
    <div className={cls(prefix)}>
      <Modal
        fullScreen
        footer={null}
        visible={visible}
        closeOnEsc={false}
        closeIcon={null}
      >
        {form && (
          <Editor
            form={form}
            onSave={(kernel, designableProps) => {
              designableProps.saveLoading = true;
              // 表单表单数据
              const formSchema = kernel.toISchema();
              const boSchema = kernel.toBoSchema();
              form.schema = formSchema;
              Promise.all([
                boApi.saveSchema(boSchema),
                formApi.saveOrUpdate(form),
              ])
                .then((r) => {
                  const [r1, r2] = r;
                  if (r1.code !== 200 || r2.code !== 200) {
                    Toast.error('保存失败!');
                    return;
                  }
                  Toast.success('保存成功!');
                  onSave?.(kernel, designableProps);
                  designableProps.saveLoading = false;
                })
                .catch((err) => {
                  designableProps.saveLoading = false;
                  Toast.error(err);
                });
            }}
            onPublish={onPublish}
            onClose={onCancel}
            panels={panels}
          />
        )}
      </Modal>
    </div>
  );
};

export default FormEditor;

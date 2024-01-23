import { createSchemaField, observer } from '@formily/react';
import { FormilyFormProps } from './interface';
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  Rate,
  Slider,
} from '@formily/semi';
import { useMemo } from 'react';
import { createForm } from '@formily/core';
import React from 'react';
import { Icon, Color } from './components';
import { toSchema } from './schema';
import { Modal, Notification } from '@douyinfe/semi-ui';
import { FormContext } from '../interface';
import { Constant } from '@/constant';
import _ from 'lodash';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Rate,
    Slider,
    Icon,
    Color,
  },
});

const formTypeList: Record<string, Constant> = {
  add: {
    value: 'add',
    label: '添加',
  },
  edit: {
    value: 'edit',
    label: '编辑',
  },
  details: {
    value: 'details',
    label: '明细',
  },
};

const useFormType = (formContext: FormContext<any>) => {
  return formTypeList[formContext?.type || 'add'];
};

const useTitle = (formContext: FormContext<any>) => {
  const formType = useFormType(formContext);
  return formType.label;
};

const useIcon = (formContext: FormContext<any>) => {
  const formType = useFormType(formContext);
  return formType.icon;
};

const FormliyForm: React.FC<FormilyFormProps> = observer((props) => {
  const {
    formProps,
    formContext,
    effects,
    scope,
    components,
    ...formliyProps
  } = props;
  const { columns, decorator } = formContext;
  const api = formProps.useApi?.();
  const form = useMemo(() => {
    return createForm({
      initialValues: formContext?.getDefaultValues(),
      values: formContext.values,
      effects(form) {
        effects?.(form);
      },
    });
  }, [formContext.values]);

  const schema = useMemo(() => {
    return toSchema(columns, formContext, (column, index) =>
      decorator.schema(column, index),
    );
  }, [formContext.dataSet, formContext.type, formContext.visible]);

  const title = useTitle(formContext);
  const icon = useIcon(formContext);

  return (
    <Modal
      title={title}
      icon={icon}
      visible={formContext.visible}
      closeOnEsc={true}
      size={formProps.size || 'large'}
      okButtonProps={{ disabled: formContext.type === 'details' }}
      confirmLoading={formContext.loading || false}
      onOk={() => {
        // 构建需要校验的字段
        const { params, onOk, onError } = formProps;
        form
          .submit((data) => {
            formContext.loading = true;
            // 相同key优先级 默认值 > 表单值
            const values = Object.assign(data, params);
            if (api) {
              api
                .saveOrUpdate(values)
                .then((res) => {
                  if (res.code === 200 && res.data) {
                    Notification.success({
                      position: 'top',
                      content: res.message,
                    });
                    onOk?.(formContext);
                  } else {
                    Notification.error({
                      position: 'top',
                      content: res.message,
                    });
                    onError?.(new Error(res.message), formContext);
                  }
                  formContext.visible = false;
                  formContext.loading = false;
                })
                .catch((err) => {
                  formContext.loading = false;
                  onError?.(err, formContext);
                });
            } else {
              formProps.onOk?.(values);
            }
          })
          .catch((err) => {
            const { showValidateErrorNotification = false } = formProps;
            if (!showValidateErrorNotification) {
              return;
            }
            // 提示表单错误信息
            let formErrorMessage = '';
            if (err.name) {
              formErrorMessage = err.name;
            } else if (typeof err === 'object') {
              formErrorMessage = Object.keys(err)
                .map((eKey) => {
                  return err[eKey];
                })
                .join(',');
            }
            if (!_.isEmpty(formErrorMessage)) {
              Notification.error({
                content: formErrorMessage,
                position: 'top',
              });
            }
          });
      }}
      onCancel={() => {
        if (formProps.onCancel) {
          formProps.onCancel(formContext);
        } else {
          formContext.visible = false;
        }
      }}
    >
      <Form form={form} {...formliyProps}>
        <SchemaField
          schema={schema}
          components={components}
          scope={{ $context: formContext, ...scope }}
        />
      </Form>
    </Modal>
  );
});

export default FormliyForm;

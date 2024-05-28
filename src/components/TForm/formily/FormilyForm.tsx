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
  ArrayItems,
  ArrayBase,
} from '@formily/semi';
import { useMemo } from 'react';
import { Form as FormType, createForm } from '@formily/core';
import React from 'react';
import { Icon, Color } from './components';
import { toSchema } from './schema';
import { Button, ButtonGroup, Modal, Notification } from '@douyinfe/semi-ui';
import { FormContext, FormProps, ModalButton } from '../interface';
import { Constant } from '@/constant';
import _ from 'lodash';
import { tryGetIcon } from '@/components/Icon';
import { GeneralApi } from '@/api';
import { TFormContext } from '../context/form';
import { globalThisPolyfill } from '@formily/shared';
import CodeEditor from './components/CodeEditor';
import DEFAULT_SCOPES from './scope';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

export const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayItems,
    FormItem,
    ArrayBase,
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
    CodeEditor,
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

const useTitle = (formProps: FormProps<any>, formContext: FormContext<any>) => {
  const formType = useFormType(formContext);
  return formProps.title || formType.label;
};

const useIcon = (formContext: FormContext<any>) => {
  const formType = useFormType(formContext);
  return formType.icon;
};

const ModalButtonComponent: React.FC<{
  formProps: FormProps<any>;
  formContext: FormContext<any>;
  form: FormType<any>;
}> = observer(({ formProps, formContext, form }) => {
  const {
    showConfirm = true,
    showCancel = true,
    append = [],
  } = formProps.modal || {
    showConfirm: true,
    showCancel: true,
    append: [],
  };
  let api: GeneralApi<any>;
  const { event, useApi } = formProps;
  if (useApi) {
    if (typeof useApi === 'function') {
      api = useApi();
    } else {
      api = useApi;
    }
  }

  const modalButtons: ModalButton<any>[] = [];

  if (
    (typeof showCancel === 'function' && showCancel(formContext)) ||
    showCancel
  ) {
    modalButtons.push({
      code: 'cancel',
      name: '取消',
      type: 'tertiary',
      size: 'default',
      icon: tryGetIcon('IconCrossCircleStroked'),
      onClick: (formContext) => {
        if (formProps.onCancel) {
          formProps.onCancel(formContext);
        } else {
          formContext.visible = false;
        }
      },
    });
  }

  if (
    ((typeof showConfirm === 'function' && showConfirm(formContext)) ||
      showConfirm) &&
    formContext.type !== 'details'
  ) {
    modalButtons.push({
      code: 'confirm',
      name: '确定',
      type: 'primary',
      loading: true,
      size: 'default',
      icon: tryGetIcon('IconCheckCircleStroked'),
      onClick: (formContext) => {
        // 构建需要校验的字段
        const { params, onOk, onError } = formProps;
        form
          .submit((data) => {
            // 相同key优先级 默认值 > 表单值
            // if default value key is undefined but form value is not, choose form value
            const values = _.assignWith(
              data,
              params,
              (objectValue, sourceValue, key, object, source) => {
                if (!_.isEmpty(objectValue)) {
                  return objectValue;
                }
                return sourceValue;
              },
            );
            if (api) {
              formContext.loading = true;
              api
                .saveOrUpdate(values)
                .then((res) => {
                  if (res.code === 200 && res.data) {
                    Notification.success({
                      position: 'top',
                      content: res.message,
                    });
                    try {
                      // 回调事件
                      onOk?.(formContext);
                      event?.onSaveOrUpdateSuccess?.(values);
                    } catch (err) {
                      // simple print
                      console.error(err);
                    }
                    formContext.visible = false;
                  } else {
                    onError?.(new Error(res.message), formContext);
                  }
                })
                .catch((err) => {
                  onError?.(err, formContext);
                })
                .finally(() => {
                  formContext.loading = false;
                });
            } else {
              formProps.onOk?.(formContext);
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
      },
    });
  }

  append.forEach((button) => {
    if (typeof button === 'function') {
      const maybeButton = button(formContext);
      if (maybeButton) {
        modalButtons.push({ ...maybeButton });
      }
    } else {
      modalButtons.push({ ...button });
    }
  });

  return (
    <ButtonGroup className="float-right">
      {modalButtons.map((button) => {
        const {
          code,
          icon,
          type,
          size,
          loading = false,
          onClick,
          name,
        } = button;
        return (
          <Button
            key={code}
            icon={icon}
            type={type}
            size={size}
            loading={loading && formContext.loading}
            onClick={() => onClick?.(formContext)}
          >
            {name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
});

const FormliyForm: React.FC<FormilyFormProps> = observer((props) => {
  const {
    formProps,
    formContext,
    effects,
    scope = {},
    components,
    ...formliyProps
  } = props;

  const { columns, decorator } = formContext;

  const form = useMemo(() => {
    globalThisPolyfill['__DESIGNABLE_LAYOUT__'] = { prefixCls: 'dn-' };
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

  const title = useTitle(formProps, formContext);
  const icon = useIcon(formContext);

  const { slotBottom, modal } = formProps;

  const { abandon = false, size = 'large', closeOnEsc = true } = modal || {};

  const InternalFormily = (
    <TFormContext.Provider value={formContext}>
      <Form form={form} {...formliyProps}>
        <SchemaField
          schema={schema}
          components={components}
          scope={{ $context: formContext, ...scope, ...DEFAULT_SCOPES }}
        />
      </Form>
      {slotBottom}
    </TFormContext.Provider>
  );

  return abandon ? (
    <React.Fragment>{InternalFormily}</React.Fragment>
  ) : (
    <Modal
      title={title}
      icon={icon}
      visible={formContext.visible}
      closeOnEsc={closeOnEsc}
      size={size}
      onCancel={() => {
        if (formProps.onCancel) {
          formProps.onCancel(formContext);
        } else {
          formContext.visible = false;
        }
      }}
      footer={
        columns.length > 0 && (
          <ModalButtonComponent
            form={form}
            formContext={formContext}
            formProps={formProps}
          />
        )
      }
    >
      {InternalFormily}
    </Modal>
  );
});

export default FormliyForm;

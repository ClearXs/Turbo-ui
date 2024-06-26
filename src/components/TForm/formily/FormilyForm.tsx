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
import { createForm } from '@formily/core';
import React from 'react';
import { Icon, Color } from './components';
import { toSchema } from './schema';
import { Modal } from '@douyinfe/semi-ui';
import { FormContext, FormProps } from '../interface';
import { Constant } from '@/constant';
import _ from 'lodash';
import { IdEntity } from '@/api';
import { TFormContext } from '../context/form';
import { globalThisPolyfill } from '@formily/shared';
import CodeEditor from './components/CodeEditor';
import DEFAULT_SCOPES from './scope';
import FormilyModalButton from './FormilyModalButton';

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

const useFormType = <T extends IdEntity = IdEntity>(
  formContext: FormContext<T>,
) => {
  return formTypeList[formContext.type || 'add'];
};

const useTitle = <T extends IdEntity = IdEntity>(
  formProps: FormProps<T>,
  formContext: FormContext<T>,
) => {
  const formType = useFormType(formContext);
  return formProps.title || formType.label;
};

const useIcon = <T extends IdEntity = IdEntity>(
  formContext: FormContext<T>,
) => {
  const formType = useFormType(formContext);
  return formType.icon;
};

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
      initialValues: formContext.getDefaultValues(),
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
          <FormilyModalButton
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

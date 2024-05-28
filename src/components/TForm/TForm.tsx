import { GeneralApi, IdEntity } from '@/api';
import { FormContext, FormProps } from './interface';
import { Suspense, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { getFormColumnDecorator } from './form';
import useDicApi from '@/api/system/dic';
import _ from 'lodash';
import useRequest from '@/hook/request';
import FormliyForm from './formily/FormilyForm';
import { Form as CoreForm } from '@formily/core';
import { observable } from '@formily/reactive';
import { loadDataSet } from './util/column';

function TForm<T extends IdEntity>(props: FormProps<T>) {
  const dicApi = useDicApi();
  const request = useRequest();
  const formRef = useRef<CoreForm>();
  const formContext = useMemo(() => {
    const decorator = props.decorator || getFormColumnDecorator<T>(undefined);
    const { columns } = props;
    const formContext: FormContext<T> = {
      type: props.type || 'add',
      props,
      visible: props.immediateVisible || false,
      loading: false,
      decorator,
      dataSet: {},
      valid: formRef.current?.valid || false,
      validating: formRef.current?.validating || false,
      validate: (pattern) => {
        formRef.current?.validate(pattern);
      },
      submit: (onSubmit) => {
        return formRef.current?.submit(onSubmit);
      },
      reset: (pattern, option) => {
        return formRef.current?.reset(pattern, option);
      },
      getDefaultValues() {
        // 1.父级传递的params
        // 2.column上默认值
        const columnValues = columns
          .filter((column) => column.initValue !== undefined)
          .reduce(
            (pre, cur) => {
              pre[cur.field] = cur.initValue;
              return pre;
            },
            {} as Record<string, any>,
          );
        return Object.assign({}, props.params, columnValues);
      },
      getValue(field) {
        return formRef.current?.getValuesIn(field);
      },
      getValues() {
        return formRef.current?.values;
      },
      setValue(field, value) {
        formRef.current?.setValuesIn(field, value);
      },
      setValues(values) {
        formRef.current?.setValues(values);
      },
      open() {
        formContext.visible = true;
      },
      close() {
        formContext.visible = false;
      },
      columns: [],
    };

    const showColumns =
      columns.filter((column) => {
        let showForm;
        if (typeof column.form === 'function') {
          showForm = column.form(formContext);
        } else {
          showForm = column.form;
        }
        return column.type !== 'undefined' && showForm !== false;
      }) || [];
    formContext.columns = showColumns;
    // 使FormContext成为observable对象
    const observerFormContext = observable<FormContext<T>>(formContext);
    decorator.setFormContext(observerFormContext);
    // 加载表单数据集
    loadDataSet(observerFormContext, dicApi, request);
    return observerFormContext;
  }, []);

  // 设置api
  const relationApis: Map<string, GeneralApi<any>> = new Map();
  for (const column of formContext.columns) {
    const { relation } = column;
    if (relation) {
      relation.helper.getApi &&
        relationApis.set(column.field, relation.helper.getApi());
    }
  }
  formContext.decorator.setRelationApis(relationApis);

  props.getFormContext?.(formContext);

  return (
    <FormliyForm
      formProps={props}
      formContext={formContext}
      labelWidth={120}
      colon={false}
      labelAlign="right"
      wrapperAlign="left"
      feedbackLayout="loose"
      tooltipLayout="text"
      scope={props.scope}
      effects={(form) => (formRef.current = form)}
    />
  );
}

TForm.open = <T extends IdEntity>(props: FormProps<T>) => {
  // create a dom in adapter?
  const div = document.createElement('div');
  const container = createRoot(div);
  document.body.appendChild(div);

  const destroy = () => {
    container.unmount();
  };

  function open(params: Partial<T> = {}) {
    const newProps: FormProps<T> = { ...props, immediateVisible: true, params };
    render(newProps);
  }

  function close() {
    const newProps: FormProps<T> = { ...props, immediateVisible: false };
    render(newProps);
  }

  function render(props: FormProps<T>) {
    //@ts-ignore
    container.render(
      <Suspense>
        <TForm {...props} />
      </Suspense>,
    );
  }
  open();

  return { open, close, destroy };
};

export default TForm;

import { GeneralApi, IdEntity } from '@/api';
import { FormProps } from './interface';
import { Suspense, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import useDicApi from '@/api/system/dic';
import _ from 'lodash';
import useRequest from '@/hook/request';
import FormliyForm from './formily/FormilyForm';
import { loadDataSet } from './util/column';
import FormilyFormContextImpl from './formily/FormilyFormContext';
import { createForm } from '@formily/core';

function TForm<T extends IdEntity>(props: FormProps<T>) {
  const dicApi = useDicApi();
  const request = useRequest();
  const formContext = useMemo(() => {
    const coreForm = createForm();
    const formContext = new FormilyFormContextImpl<T>(props, coreForm);
    // 加载表单数据集
    loadDataSet(formContext, dicApi, request);
    return formContext;
  }, [props.params]);

  // 设置api
  const relationApis: Map<string, GeneralApi<T>> = new Map();
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

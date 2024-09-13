import { Entity } from '@/api';
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

function TForm<T extends Entity>(props: FormProps<T>) {
  const dicApi = useDicApi();
  const request = useRequest();

  const formContext = useMemo(() => {
    const coreForm = createForm();
    const formContext = new FormilyFormContextImpl<T>(props, coreForm);
    // 加载表单数据集
    loadDataSet(formContext, dicApi, request);
    return formContext;
  }, [props.params]);

  props.getFormContext?.(formContext);

  const {
    colon = false,
    labelWidth = 120,
    labelAlign = 'right',
    wrapperAlign = 'left',
    feedbackLayout = 'loose',
    tooltipLayout = 'text',
    size = 'default',
    layout = 'horizontal',
    direction = 'ltr',
    bordered = false,
    ...remainingProps
  } = props;

  return (
    <FormliyForm
      formContext={formContext}
      colon={colon}
      labelAlign={labelAlign}
      wrapperAlign={wrapperAlign}
      feedbackLayout={feedbackLayout}
      tooltipLayout={tooltipLayout}
      labelWidth={labelWidth}
      {...remainingProps}
    />
  );
}

TForm.open = <T extends Entity>(props: FormProps<T>) => {
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

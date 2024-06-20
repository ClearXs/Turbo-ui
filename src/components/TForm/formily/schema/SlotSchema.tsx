import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  GlobalSchemaColumnRegistry,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { observer } from '@formily/reactive-react';
import { FormSlotColumnProps, Handler, Mode } from '../../components/Slot';
import useFormContext from '../../hook/form';
import Modular from '@/components/Modular/Modular';
import React, { useRef } from 'react';
import App from '@/components/App';

const SlotSchema: SchemaColumn<FormSlotColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      title: column.label,
      name: column.initValue,
      type: 'object',
      required: column.require as boolean,
      'x-decorator': 'FormItem',
      'x-component': SlotSetter,
      'x-validator': [],
      'x-reactions': column.reaction,
      'x-component-props': {
        mode: column.mode || 'slider',
        shown: column.shown,
        component: column.component,
        modal: column.modal,
        slider: column.slider,
      },
    };
  },

  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'codeEditor',
    };
  },
};

type ISlotSetterProps = {
  mode: Mode;
  shown: FormSlotColumnProps<any>['shown'];
  component: FormSlotColumnProps<any>['component'];
  modal?: FormSlotColumnProps<any>['modal'];
  slider?: FormSlotColumnProps<any>['slider'];
};

const SlotSetter: React.FC<ISlotSetterProps> = observer(
  ({ mode, shown, component, modal, slider }) => {
    const formContext = useFormContext();
    const Shown = typeof shown === 'function' ? shown(formContext) : shown;
    const Component: React.ReactNode | undefined =
      typeof component === 'function' ? component(formContext) : component;
    const handlerRef = useRef<Handler>();

    const { modular, sliderSide } = App.useApp();

    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
          if (!Component) {
            Modular.error({ content: 'could find any component slot' });
            return;
          }

          if (mode === 'slider') {
            const sliderInstance = sliderSide.show({
              ...slider,
              autoClose: false,
              content: (
                <React.Fragment>
                  {React.cloneElement(Component, {
                    getHandler: (handler: Handler) =>
                      (handlerRef.current = handler),
                  })}
                </React.Fragment>
              ),
              size: slider?.size || 'large',
              closeOnEsc: slider?.closeOnEsc || false,
              onConfirm: () => {
                handlerRef.current?.onOk?.(sliderInstance);
              },
              onCancel: () => {
                handlerRef.current?.onCancel?.();
                sliderInstance.destroy();
              },
            });
          } else if (mode === 'modal') {
            const modularInstance = modular.show({
              ...modal,
              content: (
                <React.Fragment>
                  {React.cloneElement(Component, {
                    getHandler: (handler: Handler) =>
                      (handlerRef.current = handler),
                  })}
                </React.Fragment>
              ),
              size: slider?.size || 'large',
              closeOnEsc: slider?.closeOnEsc || false,
              onConfirm: () => {
                handlerRef.current?.onOk?.(modularInstance);
              },
              onCancel: () => {
                handlerRef.current?.onCancel?.();
                modularInstance.destroy();
              },
            });
          } else {
            Modular.error({ content: 'unknown slot mode' });
          }
        }}
      >
        {Shown}
      </div>
    );
  },
);

GlobalSchemaColumnRegistry.addSchemaColumn('slot', SlotSchema);

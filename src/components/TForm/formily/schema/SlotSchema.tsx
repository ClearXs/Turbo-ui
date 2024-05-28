import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  GlobalSchemaColumnRegistry,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { observer } from '@formily/reactive-react';
import {
  FormSlotColumnProps,
  Handler,
  SlotComponentProps,
} from '../../components/Slot';
import useFormContext from '../../hook/form';
import Modular from '@/components/Modular/Modular';
import React, { useRef } from 'react';
import SliderSide from '@/components/SliderSide';

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
        shown: column.shown,
        component: column.component,
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
  value?: any;
  shown: FormSlotColumnProps<any>['shown'];
  component: FormSlotColumnProps<any>['component'];
};

const SlotSetter: React.FC<ISlotSetterProps> = observer(
  ({ value, shown, component, ...props }) => {
    const formContext = useFormContext();
    const ShownSlot = typeof shown === 'function' ? shown(formContext) : shown;
    const ComponentSlot: React.ReactNode | undefined =
      typeof component === 'function' ? component(formContext) : component;
    const handlerRef = useRef<Handler>();
    return (
      <div
        onClick={() => {
          if (ComponentSlot) {
            const model = SliderSide.show({
              content: (
                <React.Fragment>
                  {React.cloneElement(ComponentSlot, {
                    getHandler: (handler: Handler) =>
                      (handlerRef.current = handler),
                  })}
                </React.Fragment>
              ),
              size: 'large',
              closeOnEsc: false,
              onConfirm: () => {
                handlerRef.current?.onOk?.();
              },
              onCancel: () => {
                handlerRef.current?.onCancel?.();
                model.destroy();
              },
            });
          } else {
            Modular.error({ content: 'could find any component slot' });
          }
        }}
      >
        {ShownSlot}
      </div>
    );
  },
);

GlobalSchemaColumnRegistry.addSchemaColumn('slot', SlotSchema);

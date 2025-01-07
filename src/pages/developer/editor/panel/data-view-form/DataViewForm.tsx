import React from 'react';
import {
  IconWidget,
  useOperation,
  usePrefix,
  useSelected,
  useSelectedNode,
  useWorkbench,
} from '@clearx/designable-react';
import { Form, createForm, isVoidField, onFieldReact } from '@formily/core';
import { useMemo } from 'react';
import cls from 'classnames';
import { Form as SemiForm } from '@clearx/formily-semi';
import { Empty } from '@douyinfe/semi-ui';
import { observer } from '@formily/react';
import schema from './schema';
import './locales';
import { GlobalRegistry, TreeNode } from '@clearx/designable-core';
import { SchemaField } from '@/components/tform/formily/FormilyForm';
import { useKernel } from '../../kernel';
import { observable } from '@formily/reactive';
import './styles.scss';
import { DataViewContext } from './context/dataView';

export type IDataFormProps = {
  className?: string;
  style?: React.CSSProperties;
  uploadAction?: string;
  components?: Record<string, React.FC<any>>;
  effects?: (form: Form) => void;
  scope?: any;
};

const DataForm: React.FC<IDataFormProps> = observer((props) => {
  const workbench = useWorkbench();
  const currentWorkspace =
    workbench?.activeWorkspace || workbench?.currentWorkspace;
  const currentWorkspaceId = currentWorkspace?.id;
  const operation = useOperation(currentWorkspaceId);
  const node = useSelectedNode(currentWorkspaceId);
  const selected = useSelected(currentWorkspaceId);
  const prefix = usePrefix('data-view-form');
  const isEmpty = !(
    node &&
    node.designerProps?.propsSchema &&
    selected.length === 1
  );
  const kernel = useKernel();

  const dataView = useMemo(() => {
    return observable({ ...kernel.dataView });
  }, [schema]);

  const form = useMemo(() => {
    return createForm({
      initialValues: node?.designerProps?.defaultProps,
      values: node?.props,
      effects(form) {
        useLocales(node);
        props.effects?.(form);
      },
    });
  }, [node, node?.props, schema, operation, isEmpty]);

  const render = () => {
    if (!isEmpty) {
      return (
        <div
          className={cls(prefix, props.className)}
          style={props.style}
          key={node.id}
        >
          <SemiForm
            form={form}
            colon={false}
            labelCol={8}
            labelAlign="left"
            wrapperAlign="right"
            feedbackLayout="loose"
            tooltipLayout="text"
          >
            <SchemaField
              schema={schema}
              components={props.components}
              scope={{ $node: node, ...props.scope }}
            />
          </SemiForm>
        </div>
      );
    }
    return (
      <div className={prefix + '-empty'}>
        <Empty />
      </div>
    );
  };

  return (
    <IconWidget.Provider tooltip>
      <DataViewContext.Provider value={dataView}>
        <div className={prefix + '-wrapper'}>
          <div className={prefix + '-content'}>{render()}</div>
        </div>
      </DataViewContext.Provider>
    </IconWidget.Provider>
  );
});

const useLocales = (node: TreeNode) => {
  onFieldReact('*', (field) => {
    const path = field.path.toString().replace(/\.[\d+]/g, '');
    const takeMessage = (prop?: string) => {
      const token = `Page.${path}${prop ? `.${prop}` : ''}`;
      return node.getMessage(token) || GlobalRegistry.getDesignerMessage(token);
    };
    const title = takeMessage('title') || takeMessage();
    const description = takeMessage('description');
    const tooltip = takeMessage('tooltip');
    const dataSource = takeMessage('dataSource');
    const placeholder = takeMessage('placeholder');
    if (title) {
      field.title = title;
    }
    if (description) {
      field.description = description;
    }
    if (tooltip) {
      field.decorator[1] = field.decorator[1] || [];
      field.decorator[1].tooltip = tooltip;
    }
    if (placeholder) {
      field.component[1] = field.component[1] || [];
      field.component[1].placeholder = placeholder;
    }
    if (!isVoidField(field)) {
      if (dataSource?.length) {
        field.dataSource = dataSource.slice();
      } else {
        field.dataSource = field.dataSource?.filter(Boolean);
      }
    }
  });
};

export default DataForm;

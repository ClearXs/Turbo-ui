import { ColumnProps, TablePagination } from '@douyinfe/semi-ui/lib/es/table';
import {
  TableColumnProps,
  TableContext,
  TableInputColumnProps,
  TableInputNumberColumnProps,
  TableRadioColumnProps,
  TableSelectColumnProps,
  TableTextAreaColumnProps,
  TableTreeSelectColumnProps,
} from './TableCrud';
import { Form, Tooltip } from '@douyinfe/semi-ui';
import { importIcon } from '../Icon';

export type ColumnType =
  | 'input'
  | 'number'
  | 'select'
  | 'treeSelect'
  | 'radio'
  | 'textarea'
  | 'icon'
  | 'undefined';

export interface TableApi<T extends Record<string, any>> {
  saveOrUpdate: (tableContext: TableContext<T>, entity: T) => void;
  remove: (tableContext: TableContext<T>, ids: string[]) => void;
  list: (tableContext: TableContext<T>) => void;
  page: (tableContext: TableContext<T>, pageable?: TablePagination) => void;
  pageOrList: (
    tableContext: TableContext<T>,
    pageable?: TablePagination,
  ) => void;
  details: (tableContext: TableContext<T>, id: string) => void;
}

export interface ColumnDecorator<T extends Record<string, any>> {
  /**
   * 通过把column渲染为Form组件
   * @param column table字段实体
   * @param type 区分column是搜索还是表单渲染
   */
  render: (
    column: TableColumnProps,
    type: 'search' | 'form',
  ) => React.ReactNode | undefined;

  /**
   * 增强 table column props 并转换为column
   * @param column table column props
   * @returns column props
   */
  wrap: (column: TableColumnProps<T>) => ColumnProps<T>;
}

export interface Field<
  T extends Record<string, any>,
  K extends TableColumnProps<T>,
> {
  /**
   * 通过把column渲染为Form组件
   * @param type 区分column是搜索还是表单渲染
   */
  render: (column: K, type: 'search' | 'form') => React.ReactNode | undefined;

  /**
   * 增强 table column props 并转换为column
   * @returns column props
   */
  wrap: (column: K) => ColumnProps<T>;
}

abstract class BaseField<
  T extends Record<string, any>,
  K extends TableColumnProps<T>,
> implements Field<T, K>
{
  private placeholderPrefix: Record<ColumnType, string> = {
    input: '请输入',
    number: '请输入',
    select: '请选择',
    treeSelect: '请选择',
    radio: '请选择',
    textarea: '请输入',
    icon: '请上传',
    undefined: '请输入',
  };

  protected getGeneralProps(column: K, type: 'search' | 'form') {
    const label = column.title?.toString();
    const field = column.dataIndex || '';
    const placeholder = `${this.placeholderPrefix[column.type]}${label}!`;
    const rules = [
      ...(column.rules || []),
      {
        required: column.require && type === 'form',
        message: `请输入${placeholder}!`,
      },
    ];

    return {
      key: field,
      label,
      field,
      rules,
      placeholder,
      extraText: column.extraText,
    };
  }
}

export class InputField<T extends Record<string, any>> extends BaseField<
  T,
  TableInputColumnProps<T>
> {
  render(
    column: TableInputColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Input {...props} />;
  }

  wrap(column: TableInputColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }
}

export class NumberField<T extends Record<string, any>> extends BaseField<
  T,
  TableInputNumberColumnProps<T>
> {
  render(
    column: TableInputNumberColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.InputNumber {...props} />;
  }

  wrap(column: TableInputNumberColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }
}

export class SelectField<T extends Record<string, any>> extends BaseField<
  T,
  TableSelectColumnProps<T>
> {
  render(
    column: TableSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Select {...props} optionList={column.optionList} />;
  }

  wrap(column: TableSelectColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number, options) => {
      const value = record[column.dataIndex];

      return (
        column.optionList?.filter((c) => c.value === value).pop()?.label ||
        value
      );
    };

    return { ...column, render: column.render || render };
  }
}

export class TreeSelectField<T extends Record<string, any>> extends BaseField<
  T,
  TableTreeSelectColumnProps<T>
> {
  render(
    column: TableTreeSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.TreeSelect {...props} />;
  }

  wrap(column: TableTreeSelectColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }
}

export class RadioField<T extends Record<string, any>> extends BaseField<
  T,
  TableRadioColumnProps<T>
> {
  render(
    column: TableRadioColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Radio {...props} />;
  }

  wrap(column: TableRadioColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }
}

export class TextAreaField<T extends Record<string, any>> extends BaseField<
  T,
  TableTextAreaColumnProps<T>
> {
  render(
    column: TableTextAreaColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.TextArea {...props} />;
  }

  wrap(column: TableTextAreaColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }
}

export class IconField<T extends Record<string, any>> extends BaseField<
  T,
  TableColumnProps<T>
> {
  render(
    column: TableColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.TextArea {...props} />;
  }

  wrap(column: TableTextAreaColumnProps<T>): ColumnProps<T> {
    return {
      ...column,
      render: (text: string, record: T, index: number, options) => {
        const iconName = record[column.dataIndex];
        const Icon = importIcon(iconName);
        return Icon ? (
          <Tooltip position="top" content={iconName}>
            <Icon />
          </Tooltip>
        ) : (
          { iconName }
        );
      },
    };
  }
}

export class UndefinedField<T extends Record<string, any>> extends BaseField<
  T,
  any
> {
  render(
    column: TableColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    return undefined;
  }

  wrap(column: TableColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }
}

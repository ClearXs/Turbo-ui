import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { Form, Tag, Tooltip } from '@douyinfe/semi-ui';
import { importIcon } from '../Icon';
import { IdEntity } from '@/api/interface';
import {
  TableColumnProps,
  TableContext,
  TableDateColumnProps,
  TableInputColumnProps,
  TableNumberColumnProps,
  TableRadioColumnProps,
  TableSelectColumnProps,
  TableTextAreaColumnProps,
  TableTreeSelectColumnProps,
} from './interface';
import { ColumnType, FormColumnProps, FormContext } from '../TForm/interface';
import {
  BaseFormField,
  FormColumnDecorator,
  FormColumnFactory,
  FormField,
} from '../TForm/form';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { ReactNode } from 'react';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { parse } from '@/util/date';

export interface TableColumnDecorator<T extends IdEntity>
  extends FormColumnDecorator<T> {
  /**
   * 增强 table column props 并转换为column
   * @param column table column props
   * @returns column props
   */
  wrap(column: TableColumnProps<T>): ColumnProps<T>;

  /**
   * 获取table context
   */
  getTableContext(): TableContext<T> | undefined;

  /**
   * 重新设置table context
   */
  setTableContext(tableContext: TableContext<T>): void;
}

export interface TableField<T extends IdEntity, K extends TableColumnProps<T>>
  extends FormField<T, K> {
  /**
   * 增强 table column props 并转换为column
   * @returns column props
   */
  wrap: (column: K) => ColumnProps<T>;
}

abstract class BaseTableField<T extends IdEntity, K extends FormColumnProps<T>>
  extends BaseFormField<T, K>
  implements TableField<T, K>
{
  constructor(protected decorator: TableColumnDecorator<T>) {
    super(decorator);
  }

  doRender(column: K, type: 'search' | 'form'): React.ReactNode | undefined {
    return FormColumnFactory.get(this.getType(), this.decorator).render(
      column,
      type,
    );
  }

  public wrap(column: K): ColumnProps<T> {
    // 表格通用属性实现
    return this.doWrap(column);
  }

  protected abstract doWrap(column: K): ColumnProps<T>;
}

export class InputTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableInputColumnProps<T>
> {
  doWrap(column: TableInputColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'input';
  }
}

export class NumberTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableNumberColumnProps<T>
> {
  doWrap(column: TableNumberColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'number';
  }
}

export class SelectTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableSelectColumnProps<T>
> {
  doWrap(column: TableSelectColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const value = record[column.field];
      let dic;
      if (column.dic) {
        const formContext = this.decorator.getFormContext();
        const dics = formContext?.dicValues[column.dic] || [];
        dic = dics.find((dic) => dic.value === value);
      } else {
        dic = column.optionList?.filter((c) => c.value === value).pop();
      }
      return dic ? (
        <Tag color={dic.tag} prefixIcon={dic.icon}>
          {dic.label}
        </Tag>
      ) : (
        value
      );
    };
    return { ...column, render: column.render || render };
  }

  public getType(): ColumnType {
    return 'select';
  }
}

export class TreeSelectTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableTreeSelectColumnProps<T>
> {
  doRender(
    column: TableTreeSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode | undefined {
    const props = this.getGeneralProps(column, type);
    let data = column.treeData;
    if (typeof column.treeData === 'function') {
      data = column.treeData(this.decorator.getTableContext());
    } else {
      data = column.treeData as TreeNodeData[];
    }
    return (
      <Form.TreeSelect
        {...props}
        treeData={data}
        filterTreeNode={column.filterTreeNode}
        multiple={column.multiple}
        showClear={column.showClear || true}
        showSearchClear={column.showSearchClear || true}
        expandAll={column.expandAll}
      />
    );
  }

  doWrap(column: TableTreeSelectColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'treeSelect';
  }
}

export class RadioTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableRadioColumnProps<T>
> {
  doWrap(column: TableRadioColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'radio';
  }
}

export class TextAreaTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableTextAreaColumnProps<T>
> {
  doWrap(column: TableTextAreaColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'textarea';
  }
}

export class IconTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableColumnProps<T>
> {
  doWrap(column: TableColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (
      text: string,
      record: T,
      index: number,
    ) => {
      const iconName = record[column.field];
      const Icon = importIcon(iconName);
      return Icon ? (
        <Tooltip position="top" content={iconName}>
          <Icon />
        </Tooltip>
      ) : (
        <Text>{iconName}</Text>
      );
    };
    return { ...column, render: column.render || render };
  }

  public getType(): ColumnType {
    return 'icon';
  }
}

export class ColorTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableColumnProps<T>
> {
  protected doWrap(column: TableColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const color = record[column.field];
      return (
        color && (
          <Tag
            color={color}
            shape="circle"
            type="solid"
            style={{ padding: '2px 10px' }}
          />
        )
      );
    };

    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'color';
  }
}

export class DateTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableDateColumnProps<T>
> {
  protected doWrap(column: TableDateColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      return parse(value);
    };

    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'date';
  }
}

export class UndefinedTableField<T extends IdEntity> extends BaseTableField<
  T,
  any
> {
  doWrap(column: TableColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'undefined';
  }
}

export class TableColumnFactory {
  public static get<T extends IdEntity, K extends FormColumnProps<T>>(
    type: ColumnType,
    decorator: TableColumnDecorator<T>,
  ): TableField<T, K> {
    switch (type) {
      case 'input':
        return new InputTableField<T>(decorator);
      case 'number':
        return new NumberTableField<T>(decorator);
      case 'select':
        return new SelectTableField<T>(decorator);
      case 'treeSelect':
        return new TreeSelectTableField<T>(decorator);
      case 'radio':
        return new RadioTableField<T>(decorator);
      case 'textarea':
        return new TextAreaTableField<T>(decorator);
      case 'icon':
        return new IconTableField<T>(decorator);
      case 'color':
        return new ColorTableField<T>(decorator);
      case 'date':
        return new DateTableField<T>(decorator);
      case 'undefined':
        return new UndefinedTableField<T>(decorator);
      default:
        return new UndefinedTableField<T>(decorator);
    }
  }
}

class TableColumnDecoratorImpl<T extends IdEntity>
  implements TableColumnDecorator<T>
{
  constructor(
    private tableContext?: TableContext<T>,
    private formContext?: FormContext<T>,
  ) {}

  render(column: FormColumnProps<T>, type: 'search' | 'form'): ReactNode {
    return TableColumnFactory.get(column.type, this).render(column, type);
  }
  wrap(column: TableColumnProps<T>): ColumnProps<T> {
    return TableColumnFactory.get(column.type, this).wrap(column);
  }

  getTableContext(): TableContext<T> | undefined {
    return this.tableContext;
  }
  setTableContext(tableContext: TableContext<T>): void {
    this.tableContext = tableContext;
  }
  getFormContext(): FormContext<T> | undefined {
    return this.formContext;
  }
  setFormContext(formContext: FormContext<T>): void {
    this.formContext = formContext;
  }
}

export function getTableDecorator<T extends IdEntity>(
  tableContext?: TableContext<T>,
  formContext?: FormContext<T>,
): TableColumnDecorator<T> {
  return new TableColumnDecoratorImpl<T>(tableContext, formContext);
}

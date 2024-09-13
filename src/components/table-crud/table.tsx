import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { GeneralApi, Entity } from '@/api';
import { TableColumnProps, TableContext } from './interface';
import { ColumnType, FormColumnProps, FormContext } from '../tform/interface';
import { FormColumnDecorator } from '../tform/form';
import { ReactNode } from 'react';
import {
  BaseTableField,
  CascadeTableField,
  CheckboxTableField,
  CodeEditorTableField,
  ColorTableField,
  DateRangeTableField,
  DateTableField,
  IconTableField,
  InputTableField,
  JsonArrayTableField,
  JsonObjectTableField,
  NumberTableField,
  OrgTableField,
  PasswordTableField,
  PostTableField,
  RadioTableField,
  RateTableField,
  RoleTableField,
  SelectGroupTableField,
  SelectTableField,
  SliderTableField,
  SlotTableField,
  SwitchTableField,
  TableField,
  TextareaTableField,
  TimeRangeTableField,
  TimeTableField,
  TransferTableField,
  TreeSelectTableField,
  UploadDragTableField,
  UploadTableField,
  UserTableField,
} from './components';
import { ISchema } from '@formily/json-schema';
import { BoAttrSchema } from '@designable/core';
import { GlobalSchemaColumnRegistry } from '../tform/formily/schema';
import { FormField } from '../tform/components';

export interface TableColumnDecorator<T extends Entity>
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
  getTableContext(): TableContext<T>;

  /**
   * 重新设置table context
   */
  setTableContext(tableContext: TableContext<T>): void;
}

export class UndefinedTableField<T extends Entity> extends BaseTableField<
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
  public static get<T extends Entity, K extends FormColumnProps<T>>(
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
      case 'selectGroup':
        return new SelectGroupTableField<T>(decorator);
      case 'treeSelect':
        return new TreeSelectTableField<T>(decorator);
      case 'cascade':
        return new CascadeTableField<T>(decorator);
      case 'radio':
        return new RadioTableField<T>(decorator);
      case 'textarea':
        return new TextareaTableField<T>(decorator);
      case 'icon':
        return new IconTableField<T>(decorator);
      case 'color':
        return new ColorTableField<T>(decorator);
      case 'date':
        return new DateTableField<T>(decorator);
      case 'checkbox':
        return new CheckboxTableField<T>(decorator);
      case 'switch':
        return new SwitchTableField<T>(decorator);
      case 'password':
        return new PasswordTableField<T>(decorator);
      case 'rate':
        return new RateTableField<T>(decorator);
      case 'slider':
        return new SliderTableField<T>(decorator);
      case 'transfer':
        return new TransferTableField<T>(decorator);
      case 'dateRange':
        return new DateRangeTableField<T>(decorator);
      case 'time':
        return new TimeTableField<T>(decorator);
      case 'timeRange':
        return new TimeRangeTableField<T>(decorator);
      case 'upload':
        return new UploadTableField<T>(decorator);
      case 'uploadDrag':
        return new UploadDragTableField<T>(decorator);
      case 'jsonObject':
        return new JsonObjectTableField<T>(decorator);
      case 'jsonArray':
        return new JsonArrayTableField<T>(decorator);
      case 'user':
        return new UserTableField<T>(decorator);
      case 'org':
        return new OrgTableField<T>(decorator);
      case 'post':
        return new PostTableField<T>(decorator);
      case 'role':
        return new RoleTableField<T>(decorator);
      case 'codeEditor':
        return new CodeEditorTableField<T>(decorator);
      case 'slot':
        return new SlotTableField<T>(decorator);
      default:
        return new UndefinedTableField<T>(decorator);
    }
  }
}

class TableColumnDecoratorImpl<T extends Entity>
  implements TableColumnDecorator<T>
{
  private relationApis: Map<string, GeneralApi<any>> = new Map();

  constructor(
    private tableContext?: TableContext<T>,
    private formContext?: FormContext<T>,
  ) {}

  setRelationApis(relationApis: Map<string, GeneralApi<any>>): void {
    this.relationApis = relationApis;
  }

  getRelationApis(): Map<string, GeneralApi<any>> {
    return this.relationApis;
  }

  schema(column: FormColumnProps<T>, index: number): ISchema {
    return TableColumnFactory.get(column.type, this).schema(column, index);
  }

  from(index: number, schema: BoAttrSchema): FormColumnProps<T> | undefined {
    if (schema.binding) {
      const component = schema['props']?.['x-component'];
      const columnType =
        component &&
        GlobalSchemaColumnRegistry.getColumnTypeByComponent(component);
      return (
        (columnType &&
          TableColumnFactory.get<T, FormColumnProps<T>>(columnType, this)?.from(
            index,
            schema,
          )) ||
        undefined
      );
    } else {
      return undefined;
    }
  }

  render(column: FormColumnProps<T>, type: 'search' | 'form'): ReactNode {
    return TableColumnFactory.get(column.type, this).render(column, type);
  }

  wrap(column: TableColumnProps<T>): ColumnProps<T> {
    return TableColumnFactory.get(column.type, this).wrap(column);
  }

  getTableContext(): TableContext<T> {
    return this.tableContext;
  }
  setTableContext(tableContext: TableContext<T>): void {
    this.tableContext = tableContext;
  }
  getFormContext(): FormContext<T> {
    return this.formContext;
  }

  setFormContext(formContext: FormContext<T>): void {
    this.formContext = formContext;
  }

  getDefaultSpan(column: FormColumnProps<T>): FormColumnProps<T>['span'] {
    return TableColumnFactory.get(column.type, this).getDefaultSpan();
  }

  getField<K extends FormColumnProps<T>>(
    column: FormColumnProps<T>,
  ): FormField<T, K> {
    return TableColumnFactory.get(column.type, this);
  }
}

export function getTableDecorator<T extends Entity>(
  tableContext?: TableContext<T>,
  formContext?: FormContext<T>,
): TableColumnDecorator<T> {
  return new TableColumnDecoratorImpl<T>(tableContext, formContext);
}

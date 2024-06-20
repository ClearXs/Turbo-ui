import { IdEntity } from '@/api';
import { TableColumnProps } from '../interface';
import { BaseFormField, FormField } from '@/components/TForm/components';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { TableColumnDecorator } from '../table';
import { FormColumnFactory } from '@/components/TForm';
import { ISchema } from '@formily/json-schema';

export interface TableField<T extends IdEntity, K extends TableColumnProps<T>>
  extends FormField<T, K> {
  /**
   * 增强 table column props 并转换为column
   * @returns column props
   */
  wrap: (column: K) => ColumnProps<T>;
}

export abstract class BaseTableField<
    T extends IdEntity,
    K extends TableColumnProps<T>,
  >
  extends BaseFormField<T, K>
  implements TableField<T, K>
{
  constructor(protected decorator: TableColumnDecorator<T>) {
    super(decorator);
  }

  public schema(column: K, index: number): ISchema {
    return FormColumnFactory.get(this.getType(), this.decorator).schema(
      column,
      index,
    );
  }

  doRender(column: K, type: 'search' | 'form'): React.ReactNode | undefined {
    return FormColumnFactory.get(this.getType(), this.decorator).render(
      column,
      type,
    );
  }

  public getDefaultSpan(): TableColumnProps<T>['span'] {
    return (
      FormColumnFactory.get(
        this.getType(),
        this.decorator,
      ).getDefaultSpan?.() || 6
    );
  }

  public wrap(column: K): ColumnProps<T> {
    // 表格通用属性实现
    return this.doWrap(column);
  }

  /**
   * subclass implementation
   *
   * @param column the specifies column
   */
  protected abstract doWrap(column: K): ColumnProps<T>;

  /**
   * overwrite column render
   *
   * @param column the column instance
   * @param self the sub column implementation
   * @returns render function
   */
  protected withColumnRender(
    column: K,
    self?: ColumnProps<T>['render'],
  ): ColumnProps<T>['render'] {
    const render: ColumnProps<T>['render'] = (text, record, index) => {
      return column.render?.(
        text,
        record,
        index,
        this.decorator.getTableContext(),
      );
    };
    return column.render === undefined ? self : render;
  }

  /**
   * decide row is editing
   *
   * @param entity the entity instance
   */
  public isEditing(column: TableColumnProps<T>, entity: T): boolean {
    const tableContext = this.decorator.getTableContext();
    const id = tableContext.helperApi.getId(entity);
    return (
      tableContext.inlineEditorApi.isEditing(id) &&
      (column.editable === undefined ? true : column.editable)
    );
  }
}

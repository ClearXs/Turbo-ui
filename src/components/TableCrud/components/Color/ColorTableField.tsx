import { IdEntity } from '@/api';
import { BaseTableField, TableColorColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { Tag } from '@douyinfe/semi-ui';
import { ColumnType } from '@/components/TForm/interface';

export class ColorTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableColorColumnProps<T>
> {
  protected doWrap(column: TableColorColumnProps<T>): ColumnProps<T> {
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

import { Entity } from '@/api';
import { BaseTableField, TableIconColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { tryGetIcon } from '@/components/icon/shared';
import { Tooltip, Typography } from '@douyinfe/semi-ui';
import { ColumnType } from '@/components/uni-form/interface';

export class IconTableField<T extends Entity> extends BaseTableField<
  T,
  TableIconColumnProps<T>
> {
  doWrap(column: TableIconColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (
      text: string,
      record: T,
      index: number,
    ) => {
      const iconName = record[column.field];
      const Icon = tryGetIcon(iconName);
      return Icon ? (
        <Tooltip position="top" content={iconName}>
          {Icon}
        </Tooltip>
      ) : (
        <Typography.Text>{iconName}</Typography.Text>
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'icon';
  }
}

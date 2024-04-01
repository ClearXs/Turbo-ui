import { IdEntity } from '@/api';
import { BaseTableField, TableIconColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { importIcon } from '@/components/Icon';
import { Tooltip, Typography } from '@douyinfe/semi-ui';
import { ColumnType } from '@/components/TForm/interface';

export class IconTableField<T extends IdEntity> extends BaseTableField<
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
      const Icon = importIcon(iconName);
      return Icon ? (
        <Tooltip position="top" content={iconName}>
          <Icon />
        </Tooltip>
      ) : (
        <Typography.Text>{iconName}</Typography.Text>
      );
    };
    return { ...column, render: column.render || render };
  }

  public getType(): ColumnType {
    return 'icon';
  }
}

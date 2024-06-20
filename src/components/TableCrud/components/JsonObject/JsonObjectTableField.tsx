import { IdEntity } from '@/api';
import { BaseTableField, TableJsonObjectColumnProps } from '..';
import { ColumnType } from '@/components/TForm/interface';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconJson } from '@/components/Icon/collection/IconJson';

export class JsonObjectTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableJsonObjectColumnProps<T>
> {
  doWrap(column: TableJsonObjectColumnProps<T>): ColumnProps<T> {
    const render = (value: any, record: T, index: number) => {
      return (
        <Tooltip content={value && JSON.stringify(value, null, '\t')}>
          <Button icon={<IconJson />} theme="borderless" />
        </Tooltip>
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'jsonObject';
  }
}

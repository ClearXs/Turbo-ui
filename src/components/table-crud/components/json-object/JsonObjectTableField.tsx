import { Entity } from '@/api';
import { BaseTableField, TableJsonObjectColumnProps } from '..';
import { ColumnType } from '@/components/tform/interface';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconJson } from '@/components/icon/collection/IconJson';
import { JsonValueHandler, ValueHandler } from '@/components/tform/components';

export class JsonObjectTableField<T extends Entity> extends BaseTableField<
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

  public getValueHandler(): ValueHandler {
    return new JsonValueHandler();
  }
}
